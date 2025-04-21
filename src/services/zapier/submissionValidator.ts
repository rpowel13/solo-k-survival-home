
export const validateZapierPayload = (data: unknown): boolean => {
  if (!data || typeof data !== 'object') {
    console.error(`[${new Date().toISOString()}] Invalid data format for Zapier webhook:`, data);
    return false;
  }
  return true;
};
