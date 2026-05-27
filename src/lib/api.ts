import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const WP_API = "http://localhost/tour-guide-site/?rest_route=/wp/v2/tours";
export interface Tour {
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf: {
    duration: string;
    walking_level: string;
    meeting_point: string;
    start_time: string;
    best_timing: string;
    hero_image: string;
    intro_title: string;
    intro_subtitle: string;
    intro_content: string;
    personal_note: string;
    card_description: string;
    why_i_like: string;
    tag: TourTag;
    [key: string]: string;
  };
}

export enum TourTag {
  popular = "popular",
  scenery = "scenery",
  food = "food",
  culture = "culture",
  history = "history",
  none = "none",
}

export async function getAllTours(): Promise<Tour[]> {
  try {
    const response = await fetch(WP_API);
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }
    const tours: Tour[] = await response.json();
    return tours;
  } catch (error) {
    console.error("Failed to fetch tours:", error);
    return [];
  }
}

export async function getOtherTours(currentSlug: string): Promise<Tour[]> {
  const tours = await getAllTours();
  return tours.filter((tour) => tour.slug !== currentSlug);
}

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2024-01-01",
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any, width?: number) {
  let img = builder.image(source).format("webp");
  if (width) img = img.width(width);
  return img.url();
}
