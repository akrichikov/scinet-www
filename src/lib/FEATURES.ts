export const FEATURES = Object.freeze({
  CREATE_FILE_NOTE: true,
  CREATE_SOA: true,
  IMPORT_DATA: true,
  VIEW_DATA: true,
  VIEW_KNOWLEDGE: true,
  CHAT_WITH_DATA: true,
  DOCUMENT_CONTROL_PANEL_UPLOAD_FILES: false
} as const);

export type FeatureKey = keyof typeof FEATURES;

export const isFeatureEnabled = (featureKey: FeatureKey): boolean =>
  FEATURES[featureKey];


/**
 * Example usage:
 * 
 * // Check if a feature is enabled
 * if (isFeatureEnabled('CREATE_FILE_NOTE')) {
 *   // Feature is enabled, proceed with feature-specific logic
 *   console.log('File note generation is enabled');
 * }
 * 
 * // In a component to conditionally render based on feature flag
 * {isFeatureEnabled('IMPORT_DATA') && <ImportDataButton />}
 * 
 * // With the useCallback hook
 * const canCreateFileNote = useCallback(() => {
 *   return isFeatureEnabled('CREATE_FILE_NOTE');
 * }, []);
 */
