export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  dark: string;
  light: string;
  backgroundImage: string;
  mobileBackgroundImage: string;
  layoutClass: string;
}

export interface FamilyMember {
  role: string;
  name: string;
}

export interface Family {
  title: string;
  members: FamilyMember[];
  address: string[];
}

export interface EventDetail {
  icon: string;
  title: string;
  details: string[];
}

export interface TimelineItem {
  time: string;
  event: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface RSVPFormData {
  email: string;
  attending: string;
  guests: number;
  message: string;
}

export interface GalleryResponse {
  urlPattern: string;
  variableName: string;
  mobileHero: string;
  hero: string;
  pattern: string;
  gallary: string[];
}