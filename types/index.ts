export interface Link {
  id: string;
  title: string;
  href: string;
  external?: boolean;
}

export interface NavigationLink {
  href: string;
  label: string;
  isScroll?: boolean;
}

export type ActiveId = string | null;

