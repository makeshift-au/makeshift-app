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
  { slug: "fashion", label: "Fashion", bg: "bg-sand", count: 7 },
  { slug: "music", label: "Music", bg: "bg-navy", count: 5 },
  { slug: "visual-art", label: "Visual Art", bg: "bg-rust", count: 6 },
  { slug: "ceramics", label: "Ceramics", bg: "bg-terra", count: 6 },
  { slug: "tattoo", label: "Tattoo", bg: "bg-char", count: 6 },
  { slug: "jewellery", label: "Jewellery", bg: "bg-gold", count: 5 },
  { slug: "graphic", label: "Graphic", bg: "bg-acid", count: 6 },
  { slug: "photography", label: "Photography", bg: "bg-ink", count: 6 },
] as const;

export type Category = (typeof categories)[number];

// Helper to generate placeholder artists
function makePlaceholder(
  n: number,
  discipline: string,
  location: string,
  bg: string,
  extras?: Partial<Artist>,
): Artist {
  return {
    slug: `artist-${n}`,
    name: `Artist ${n}`,
    discipline,
    location,
    tagline: "Placeholder artist profile",
    bio: "This is a placeholder artist profile. Real artist coming soon.",
    instagram: "",
    bg,
    featured: false,
    commissions: false,
    priceRange: "$50–$500",
    listings: 0,
    orders30d: 0,
    gmv30d: 0,
    ...extras,
  };
}

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
  // Featured placeholders (show in hero grid)
  makePlaceholder(2, "fashion", "Brunswick", "bg-sand", { featured: true, commissions: true }),
  makePlaceholder(3, "tattoo", "Fitzroy", "bg-char", { featured: true, commissions: true }),
  makePlaceholder(4, "music", "Northcote", "bg-navy", { featured: true }),
  makePlaceholder(5, "visual-art", "Brunswick", "bg-rust", { featured: true, commissions: true }),
  makePlaceholder(6, "ceramics", "Collingwood", "bg-terra", { featured: true }),
  makePlaceholder(7, "jewellery", "Fitzroy", "bg-gold", { featured: true }),
  makePlaceholder(8, "graphic", "Richmond", "bg-acid", { featured: true }),
  // Non-featured placeholders across disciplines
  makePlaceholder(9, "fashion", "Collingwood", "bg-sand"),
  makePlaceholder(10, "fashion", "Richmond", "bg-sand"),
  makePlaceholder(11, "fashion", "Northcote", "bg-sand"),
  makePlaceholder(12, "fashion", "Prahran", "bg-sand"),
  makePlaceholder(13, "fashion", "St Kilda", "bg-sand"),
  makePlaceholder(14, "music", "Fitzroy", "bg-navy"),
  makePlaceholder(15, "music", "Brunswick", "bg-navy"),
  makePlaceholder(16, "music", "Collingwood", "bg-navy"),
  makePlaceholder(17, "music", "Northcote", "bg-navy"),
  makePlaceholder(18, "visual-art", "Fitzroy", "bg-rust"),
  makePlaceholder(19, "visual-art", "Collingwood", "bg-rust"),
  makePlaceholder(20, "visual-art", "Richmond", "bg-rust"),
  makePlaceholder(21, "visual-art", "Northcote", "bg-rust"),
  makePlaceholder(22, "visual-art", "Brunswick", "bg-rust"),
  makePlaceholder(23, "ceramics", "Fitzroy", "bg-terra"),
  makePlaceholder(24, "ceramics", "Collingwood", "bg-terra"),
  makePlaceholder(25, "ceramics", "Brunswick", "bg-terra"),
  makePlaceholder(26, "ceramics", "Northcote", "bg-terra"),
  makePlaceholder(27, "ceramics", "Richmond", "bg-terra"),
  makePlaceholder(28, "tattoo", "Brunswick", "bg-char"),
  makePlaceholder(29, "tattoo", "Collingwood", "bg-char"),
  makePlaceholder(30, "tattoo", "Richmond", "bg-char"),
  makePlaceholder(31, "tattoo", "Northcote", "bg-char"),
  makePlaceholder(32, "tattoo", "St Kilda", "bg-char"),
  makePlaceholder(33, "jewellery", "Brunswick", "bg-gold"),
  makePlaceholder(34, "jewellery", "Collingwood", "bg-gold"),
  makePlaceholder(35, "jewellery", "Richmond", "bg-gold"),
  makePlaceholder(36, "jewellery", "Northcote", "bg-gold"),
  makePlaceholder(37, "graphic", "Fitzroy", "bg-acid"),
  makePlaceholder(38, "graphic", "Collingwood", "bg-acid"),
  makePlaceholder(39, "graphic", "Brunswick", "bg-acid"),
  makePlaceholder(40, "graphic", "Richmond", "bg-acid"),
  makePlaceholder(41, "graphic", "Northcote", "bg-acid"),
  makePlaceholder(42, "photography", "Fitzroy", "bg-ink"),
  makePlaceholder(43, "photography", "Brunswick", "bg-ink"),
  makePlaceholder(44, "photography", "Collingwood", "bg-ink"),
  makePlaceholder(45, "photography", "Richmond", "bg-ink"),
  makePlaceholder(46, "photography", "Northcote", "bg-ink"),
  makePlaceholder(47, "photography", "St Kilda", "bg-ink"),
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
