export const ZAPIER_WEBHOOK_STORAGE_PREFIX = "zapier_";

export const SOLO_401K_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/22537237/2xmfiad/";
export const SOLO_401K_SECONDARY_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/22537237/2xx9p46/";
export const FIRST_RESPONDER_401K_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/22537237/2xmfiad/";
export const FIRST_RESPONDER_SECONDARY_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/22537237/2xiw4ay/";

export type WebhookType = 
  | 'crm' 
  | 'consultation' 
  | 'solo401k' 
  | 'llc' 
  | 'first_responder'
  | 'first_responder_401k'
  | 'first_responder_llc'
  | 'alternative_investments'
  | 'prequalification';

// Define primary webhook types and their fallbacks
export const WEBHOOK_FALLBACKS: Record<WebhookType, WebhookType[]> = {
  'crm': ['consultation', 'solo401k', 'llc', 'first_responder'],
  'consultation': ['crm', 'solo401k', 'llc', 'first_responder'],
  'solo401k': ['crm', 'consultation', 'first_responder_401k'],
  'llc': ['crm', 'consultation', 'first_responder_llc'],
  'first_responder': ['crm', 'consultation', 'first_responder_401k', 'first_responder_llc'],
  'first_responder_401k': ['first_responder', 'solo401k', 'crm'],
  'first_responder_llc': ['first_responder', 'llc', 'crm'],
  'alternative_investments': ['crm', 'consultation'],
  'prequalification': ['crm', 'consultation']
};
