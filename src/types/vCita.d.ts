
interface VCitaWidgetsConfig {
  business_id: string;
  widget_type: "Contact" | "Scheduling" | "Booking" | string;
  api_integration?: boolean;
  show_consent_checkbox?: boolean;
  invitation_texts?: {
    consent_checkbox_text?: string;
    [key: string]: any;
  };
  elementsIds?: {
    widget: string;
    [key: string]: string;
  };
  [key: string]: any;
}

interface VCitaWidgets {
  init(config: VCitaWidgetsConfig): void;
  [key: string]: any;
}

declare global {
  interface Window {
    vcita_widgets?: VCitaWidgets;
  }
}

export {};
