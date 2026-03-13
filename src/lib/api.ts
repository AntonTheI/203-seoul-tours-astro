const WP_API = "http://localhost/tour-guide-site/?rest_route=/wp/v2/tours";

interface Tour {
  slug: string;
  title: { rendered: string };
  acf: {
    [key: string]: string;
  };
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
