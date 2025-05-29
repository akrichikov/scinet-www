enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL',
}

interface LogEntry {
  readonly timestamp: string;
  readonly level: LogLevel;
  readonly message: string;
  readonly context?: Record<string, unknown>;
  readonly error?: Error | null;
}

class Logger {
  private static instance: Logger | null = null;
  private readonly logHistory: LogEntry[] = [];
  private readonly maxLogEntries = 100;
  private currentLogLevel: LogLevel = LogLevel.INFO;

  private constructor() {}

  public static getInstance(): Logger {
    if (!this.instance) this.instance = new Logger();
    return this.instance;
  }

  private shouldLog(level: LogLevel): boolean {
    const order: readonly LogLevel[] = [
      LogLevel.DEBUG,
      LogLevel.INFO,
      LogLevel.WARN,
      LogLevel.ERROR,
      LogLevel.CRITICAL,
    ];
    return order.indexOf(level) >= order.indexOf(this.currentLogLevel);
  }

  private add(entry: LogEntry): void {
    if (this.logHistory.length >= this.maxLogEntries) this.logHistory.shift();
    this.logHistory.push(entry);
    if (this.shouldLog(entry.level)) this.consoleLog(entry);
  }

  private consoleLog({ level, message, context, error }: LogEntry): void {
    const style: Record<LogLevel, string> = {
      [LogLevel.DEBUG]: 'color: gray',
      [LogLevel.INFO]: 'color: blue',
      [LogLevel.WARN]: 'color: orange',
      [LogLevel.ERROR]: 'color: red',
      [LogLevel.CRITICAL]: 'color: red; font-weight:bold',
    };
    console.groupCollapsed(`%c[${level}] ${message}`, style[level]);
    if (context) console.debug('Context:', context);
    if (error) console.error('Error:', error);
    console.groupEnd();
  }

  public setLogLevel(level: LogLevel): void {
    this.currentLogLevel = level;
  }

  public debug(msg: string, ctx?: Record<string, unknown>): void {
    this.add({ timestamp: new Date().toISOString(), level: LogLevel.DEBUG, message: msg, context: ctx });
  }

  public info(msg: string, ctx?: Record<string, unknown>): void {
    this.add({ timestamp: new Date().toISOString(), level: LogLevel.INFO, message: msg, context: ctx });
  }

  public warn(msg: string, ctx?: Record<string, unknown>, err?: Error): void {
    this.add({
      timestamp: new Date().toISOString(),
      level: LogLevel.WARN,
      message: msg,
      context: ctx,
      error: err,
    });
  }

  public error(msg: string, ctx?: Record<string, unknown>, err?: Error): void {
    this.add({
      timestamp: new Date().toISOString(),
      level: LogLevel.ERROR,
      message: msg,
      context: ctx,
      error: err,
    });
  }

  public critical(msg: string, ctx?: Record<string, unknown>, err?: Error): void {
    this.add({
      timestamp: new Date().toISOString(),
      level: LogLevel.CRITICAL,
      message: msg,
      context: ctx,
      error: err,
    });
  }

  public getLogHistory(): LogEntry[] {
    return [...this.logHistory];
  }

  public clearLogHistory(): void {
    this.logHistory.length = 0;
  }

  public exportLogs(): string {
    return JSON.stringify(this.logHistory, null, 2);
  }
}

export const logger = Logger.getInstance();

export function measurePerformance<T>(fn: () => T, label: string): T {
  const start = performance.now();
  const result = fn();
  logger.debug(`Performance: ${label}`, { executionTime: performance.now() - start });
  return result;
}

export function TrackPerformance() {
  return (_: unknown, __: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const original = descriptor.value as (...args: unknown[]) => unknown;
    descriptor.value = function (...args: unknown[]) {
      return measurePerformance(() => original.apply(this, args), descriptor.value.name);
    };
    return descriptor;
  };
}
