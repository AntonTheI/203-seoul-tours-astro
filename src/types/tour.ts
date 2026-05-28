import type { Seo } from "./seo";

export interface TourStop {
  icon?: string;
  title: string;
  subtitle?: string;
  content?: string;
  image?: { url: string; alt: string };
}

export interface Tour {
  _id: string;
  seo?: Seo;
  title: string;
  slug: { current: string };
  cardDescription?: string;
  tags?: string[];
  heroImage: { url: string; alt: string };
  introTitle?: string;
  introImage?: { url: string; alt: string };
  introContent?: any[];
  practicalInfo?: {
    duration?: string;
    walkingLevel?: string;
    meetingPoint?: string;
    startTime?: string;
    bestTiming?: string;
  };
  stops?: TourStop[];
  whyILike?: string;
  personalNote?: string;
}
