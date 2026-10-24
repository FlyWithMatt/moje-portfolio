export type Language = 'pl' | 'en';

export interface VideoItem {
  id: string;
  videoSrc: string;
  category: 'resort' | 'city' | 'dining' | 'lifestyle';
  title: {
    pl: string;
    en: string;
  };
  categoryLabel: {
    pl: string;
    en: string;
  };
  description: {
    pl: string;
    en: string;
  };
  specs: {
    pl: string;
    en: string;
  };
  highlightQuote: {
    pl: string;
    en: string;
  };
  duration: string;
  format: string;
}

export interface InquiryFormData {
  name: string;
  hotelName: string;
  email: string;
  website: string;
  packageType: string;
  message: string;
}
