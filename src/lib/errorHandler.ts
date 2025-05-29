import { logger } from './logger';

interface ErrorContext {
  readonly componentName: string;
  readonly action?: string;
  readonly additionalInfo?: Record<string, unknown>;
}

export interface ParsedError {
  message: string;
  status?: number;
  originalError?: unknown;
}

async function tryParseJson(textPromise: Promise<string>): Promise<unknown> {
  try {
    const txt = await textPromise;
    return JSON.parse(txt);
  } catch {
    return undefined;
  }
}

export async function parseApiError(error: unknown, context: ErrorContext): Promise<ParsedError> {
  logger.error(`Error in ${context.componentName}`, context.additionalInfo, error as Error);

  const parsed: ParsedError = {
    message: 'An unexpected error occurred',
    originalError: error,
  };

  if (error instanceof Response) {
    parsed.status = error.status;
    parsed.message = `HTTP Error: ${error.status} ${error.statusText}`;
  } else if (error instanceof TypeError && error.message.includes('fetch')) {
    parsed.message = 'Network error. Please check your connection.';
  }

  if (typeof error === 'object' && error && 'response' in error) {
    const resp = (error as { response: Response }).response;
    const json = await tryParseJson(resp.text());
    if (json && typeof json === 'object' && 'error' in json) {
      parsed.message = (json as { error: string }).error;
    } else {
      parsed.message = await resp.text();
    }
  } else if (error instanceof Error && error.message) {
    parsed.message = error.message;
  }

  return parsed;
}

export function logError(
  err: ParsedError,
  context: ErrorContext,
  setErrorState?: (msg: string) => void,
): void {
  if (setErrorState) setErrorState(getUserFriendlyErrorMessage(err));
}

export function createErrorHandler(
  componentName: string,
  setErrorState?: (msg: string) => void,
) {
  return async (error: unknown, action?: string, additionalInfo?: Record<string, unknown>) => {
    const parsed = await parseApiError(error, { componentName, action, additionalInfo });
    logError(parsed, { componentName, action, additionalInfo }, setErrorState);
    return parsed;
  };
}

export function getUserFriendlyErrorMessage(error: ParsedError): string {
  const map: Record<number, string> = {
    400: 'Bad request. Please check your input.',
    401: 'Unauthorized. Please log in again.',
    403: 'You do not have permission to perform this action.',
    404: 'The requested resource was not found.',
    500: 'An internal server error occurred. Please try again later.',
    503: 'Service is temporarily unavailable. Please try again later.',
  };
  if (error.status && map[error.status]) return map[error.status];
  return error.message || 'An unexpected error occurred. Please try again.';
}
