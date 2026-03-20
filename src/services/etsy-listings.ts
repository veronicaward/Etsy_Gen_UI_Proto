export interface Listing {
  id: string;
  title: string;
  shop: string;
  price: number;
  imageUrl: string;
  url: string;
  numFavorers: number;
}

export interface SearchListingsInput {
  query?: string;
  maxPrice?: number;
  limit?: number;
}

const MOCK_LISTINGS: Listing[] = [
  {
    id: "1001",
    title: "Handmade Ceramic Mug with Handle, Stoneware Coffee Cup",
    shop: "ClayAndCo",
    price: 28.0,
    imageUrl: "/lamp.png",
    url: "#",
    numFavorers: 3412,
  },
  {
    id: "1002",
    title: "Personalized Linen Tote Bag, Custom Wedding Gift",
    shop: "AiryLiving",
    price: 22.5,
    imageUrl: "/airy-living.png",
    url: "#",
    numFavorers: 8741,
  },
  {
    id: "1003",
    title: "Silver Leaf Earrings, Handcrafted Sterling Silver Jewelry",
    shop: "BoldInBlue",
    price: 34.0,
    imageUrl: "/bold-in-blue.png",
    url: "#",
    numFavorers: 5209,
  },
  {
    id: "1004",
    title: "Pressed Flower Art Print, Botanical Wall Decor",
    shop: "GardenWhimsy",
    price: 18.0,
    imageUrl: "/garden-whimsy.png",
    url: "#",
    numFavorers: 2167,
  },
  {
    id: "1005",
    title: "Hand-Bound Journal, Leather Cover Notebook",
    shop: "ArtOfHosting",
    price: 42.0,
    imageUrl: "/art-of-hosting.png",
    url: "#",
    numFavorers: 6893,
  },
  {
    id: "1006",
    title: "Macramé Wall Hanging, Boho Home Decor",
    shop: "AiryLiving",
    price: 55.0,
    imageUrl: "/airy-living.png",
    url: "#",
    numFavorers: 4321,
  },
  {
    id: "1007",
    title: "Beeswax Candle Set, Natural Honey Scented",
    shop: "GardenWhimsy",
    price: 24.0,
    imageUrl: "/garden-whimsy.png",
    url: "#",
    numFavorers: 1892,
  },
  {
    id: "1008",
    title: "Gold Dainty Necklace, Minimalist Layering Chain",
    shop: "BoldInBlue",
    price: 29.0,
    imageUrl: "/bold-in-blue.png",
    url: "#",
    numFavorers: 11043,
  },
  {
    id: "1009",
    title: "Personalized Cutting Board, Housewarming Gift",
    shop: "ArtOfHosting",
    price: 48.0,
    imageUrl: "/art-of-hosting.png",
    url: "#",
    numFavorers: 7654,
  },
  {
    id: "1010",
    title: "Vintage-Style Desk Lamp, Industrial Edison Bulb",
    shop: "ClayAndCo",
    price: 65.0,
    imageUrl: "/lamp.png",
    url: "#",
    numFavorers: 3201,
  },
  {
    id: "1011",
    title: "Handmade Soap Gift Set, Lavender and Oat",
    shop: "GardenWhimsy",
    price: 32.0,
    imageUrl: "/garden-whimsy.png",
    url: "#",
    numFavorers: 9812,
  },
  {
    id: "1012",
    title: "Ceramic Planter Pot, Minimalist Succulent Home",
    shop: "ClayAndCo",
    price: 21.0,
    imageUrl: "/lamp.png",
    url: "#",
    numFavorers: 4567,
  },
];

function mockSearch(query: string, maxPrice: number | undefined, limit: number): Listing[] {
  const keywords = query.toLowerCase().split(/\s+/).filter(Boolean);
  let results = keywords.length === 0
    ? MOCK_LISTINGS
    : MOCK_LISTINGS.filter((l) =>
        keywords.some(
          (kw) =>
            l.title.toLowerCase().includes(kw) ||
            l.shop.toLowerCase().includes(kw),
        ),
      );

  if (maxPrice !== undefined) {
    results = results.filter((l) => l.price <= maxPrice);
  }

  // If no keyword matches, return all (better than empty results in demo)
  if (results.length === 0) results = MOCK_LISTINGS;

  return results.slice(0, limit);
}

/**
 * Searches real Etsy listings via our server-side API proxy.
 * Falls back to mock data if the API key is not yet approved.
 */
export async function searchListings({
  query = "",
  maxPrice,
  limit = 6,
}: SearchListingsInput): Promise<Listing[]> {
  const params = new URLSearchParams({
    keywords: query,
    limit: String(limit),
  });

  let response: Response;
  try {
    response = await fetch(`/api/etsy-search?${params}`);
  } catch {
    return mockSearch(query, maxPrice, limit);
  }

  if (!response.ok) {
    // Fall back to mock data (e.g. API key pending approval)
    return mockSearch(query, maxPrice, limit);
  }

  const data = await response.json();

  const listings: Listing[] = (data.results ?? []).map(
    (listing: {
      listing_id: number;
      title: string;
      shop?: { shop_name?: string };
      price: { amount: number; divisor: number };
      images?: { url_570xN: string }[];
      url: string;
      num_favorers: number;
    }) => ({
      id: String(listing.listing_id),
      title: listing.title,
      shop: listing.shop?.shop_name ?? "Etsy Shop",
      price: Math.round((listing.price.amount / listing.price.divisor) * 100) / 100,
      imageUrl: listing.images?.[0]?.url_570xN ?? "",
      url: listing.url,
      numFavorers: listing.num_favorers,
    }),
  );

  const filtered = maxPrice ? listings.filter((l) => l.price <= maxPrice) : listings;
  return filtered;
}
