import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { Tour } from "@/types/tour";

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

export async function getAllTours(): Promise<Tour[]> {
  const tours = await client.fetch(`*[_type=="tour"] | order(title asc)`);

  return tours.map((tour: any) => ({
    ...tour,
    heroImage: {
      url: urlFor(tour.heroImage, 1800),
      alt: tour.heroImage?.alt,
    },
    introImage: tour.introImage
      ? { url: urlFor(tour.introImage, 1200), alt: tour.introImage?.alt }
      : undefined,
    stops: tour.stops?.map((stop: any) => ({
      ...stop,
      image: stop.image
        ? { url: urlFor(stop.image, 1200), alt: stop.image.alt }
        : undefined,
    })),
  }));
}

export async function getOtherTours(currentSlug: string): Promise<Tour[]> {
  const tours = await getAllTours();

  return tours.filter((tour) => tour.slug.current !== currentSlug);
}

export async function getAboutPage() {
  const page = await client.fetch(`*[_type == "aboutPage"][0]`);
  if (!page) return null;

  return {
    ...page,
    heroImage: page.heroImage
      ? { url: urlFor(page.heroImage, 800), alt: page.heroImage?.alt }
      : null,
    seoulImage: page.seoulImage
      ? { url: urlFor(page.seoulImage, 1200), alt: page.seoulImage?.alt }
      : null,
    mainImage: page.mainImage
      ? { url: urlFor(page.mainImage, 1200), alt: page.mainImage?.alt }
      : null,
    workshopImage: page.workshopImage
      ? { url: urlFor(page.workshopImage, 1200), alt: page.workshopImage?.alt }
      : null,
  };
}

export async function getTailoredWalks() {
  const page = await client.fetch(`*[_type == "tailoredWalks"][0]`);
  if (!page) return null;
  return page;
}

export async function getKlmPage() {
  const page = await client.fetch(`*[_type == "klmPage"][0]`);
  if (!page) return null;

  return {
    ...page,
    magazinePhoto: page.magazinePhoto
      ? { url: urlFor(page.magazinePhoto, 1200), alt: page.magazinePhoto?.alt }
      : null,
    groupPhotos: (page.groupPhotos ?? []).map((photo: any) => ({
      url: urlFor(photo, 1200),
      alt: photo?.alt,
    })),
  };
}
