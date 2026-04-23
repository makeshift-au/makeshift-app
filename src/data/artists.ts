export type Artist = {
  slug: string;
  name: string;
  discipline: string;
  location: string;
  tagline: string;
  bio: string;
  instagram: string;
  bg: string;
  featured: boolean;
  commissions: boolean;
  priceRange: string;
  listings: number;
  orders30d: number;
  gmv30d: number;
  avatarUrl?: string;
  heroUrl?: string;
};

export type Listing = {
  id: string;
  artistSlug: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  material: string;
  dimensions: string;
  leadTime: string;
  status: string;
};

export const categories = [
  { slug: "fashion", label: "Fashion", bg: "bg-sand", count: 1 },
  { slug: "music", label: "Music", bg: "bg-navy", count: 0 },
  { slug: "visual-art", label: "Visual Art", bg: "bg-rust", count: 0 },
  { slug: "ceramics", label: "Ceramics", bg: "bg-terra", count: 0 },
  { slug: "tattoo", label: "Tattoo", bg: "bg-char", count: 0 },
  { slug: "jewellery", label: "Jewellery", bg: "bg-gold", count: 0 },
  { slug: "graphic", label: "Graphic", bg: "bg-acid", count: 0 },
  { slug: "photography", label: "Photography", bg: "bg-ink", count: 0 },
] as const;

export type Category = (typeof categories)[number];

export const artists: Artist[] = [
  {
    slug: "maccs-customs",
    name: "Maccs Customs",
    discipline: "fashion",
    location: "Fitzroy",
    tagline: "Hand-painted shirts. One of one.",
    bio: "Custom hand-painted button-ups and denim. Every piece is a one-off — screen printed and painted by hand in Fitzroy. Reptile motifs, bold colour, shirts you'll actually want to wear out.",
    instagram: "@maccscustoms",
    bg: "bg-acid",
    featured: true,
    commissions: true,
    priceRange: "$180",
    listings: 2,
    orders30d: 9,
    gmv30d: 3200,
    avatarUrl: "/images/maccs-customs/profile.jpg",
    heroUrl: "/images/maccs-customs/profile.jpg",
  },
];

export const listings: Listing[] = [
  {
    id: "snake-shirt",
    artistSlug: "maccs-customs",
    title: "Serpent Oxford",
    description: "Hand-printed navy serpent on a light blue oxford button-up. Coiling snake design with scaled detail running down the front panel. One of one.",
    price: 180,
    imageUrl: "/images/maccs-customs/snake-shirt.jpg",
    material: "100% cotton oxford, screen printed",
    dimensions: "One size — made to measure",
    leadTime: "1–2 weeks",
    status: "live",
  },
  {
    id: "croc-shirt",
    artistSlug: "maccs-customs",
    title: "Croc Pinstripe",
    description: "Red crocodile illustration screen printed on a blue pinstripe button-up. Three-panel reptile motif with yellow eye detail. One of one.",
    price: 180,
    imageUrl: "/images/maccs-customs/croc-shirt.jpg",
    material: "Cotton pinstripe, screen printed",
    dimensions: "One size — made to measure",
    leadTime: "1–2 weeks",
    status: "live",
  },
];

export function getArtistsByCategory(categorySlug: string): Artist[] {
  return artists.filter((a) => a.discipline === categorySlug);
}

export function getArtist(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}

export function getFeaturedArtists(): Artist[] {
  return artists.filter((a) => a.featured);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getListingsByArtist(artistSlug: string): Listing[] {
  return listings.filter((l) => l.artistSlug === artistSlug && l.status === "live");
}

export function getListing(id: string): Listing | undefined {
  return listings.find((l) => l.id === id);
}
