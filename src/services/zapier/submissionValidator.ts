
/**
 * Fast validation helper for Zapier payloads
 */
export const validateZapierPayload = (data: unknown): boolean => {
  // Simple type check - avoid deep validation for performance
  return !!data && typeof data === 'object';
};
