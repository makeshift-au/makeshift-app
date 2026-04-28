export type Artist = {
  id?: string;
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
  { slug: "fashion", label: "Fashion", bg: "bg-sand", count: 1, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80" },
  { slug: "music", label: "Music", bg: "bg-navy", count: 0, image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=80" },
  { slug: "visual-art", label: "Visual Art", bg: "bg-rust", count: 0, image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80" },
  { slug: "ceramics", label: "Ceramics", bg: "bg-terra", count: 0, image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80" },
  { slug: "tattoo", label: "Tattoo", bg: "bg-char", count: 0, image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600&q=80" },
  { slug: "jewellery", label: "Jewellery", bg: "bg-gold", count: 0, image: "https://images.unsplash.com/photo-1515562141589-67f0d569b6f4?w=600&q=80" },
  { slug: "graphic", label: "Graphic Design", bg: "bg-acid", count: 0, image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80" },
  { slug: "photography", label: "Photography", bg: "bg-ink", count: 0, image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&q=80" },
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
