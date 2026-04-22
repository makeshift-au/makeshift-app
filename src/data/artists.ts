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
};

export const categories = [
  { slug: "fashion", label: "Fashion", bg: "bg-sand", count: 6 },
  { slug: "music", label: "Music", bg: "bg-navy", count: 4 },
  { slug: "visual-art", label: "Visual Art", bg: "bg-rust", count: 9 },
  { slug: "ceramics", label: "Ceramics", bg: "bg-terra", count: 8 },
  { slug: "tattoo", label: "Tattoo", bg: "bg-char", count: 6 },
  { slug: "jewellery", label: "Jewellery", bg: "bg-gold", count: 5 },
  { slug: "graphic", label: "Graphic", bg: "bg-acid", count: 7 },
  { slug: "photography", label: "Photography", bg: "bg-ink", count: 2 },
] as const;

export type Category = (typeof categories)[number];

export const artists: Artist[] = [
  // FASHION
  { slug: "maccs-customs", name: "Maccs Customs", discipline: "fashion", location: "Fitzroy", tagline: "Custom leather & denim. Worn-in, not worn-out.", bio: "Hand-cut, hand-stitched custom pieces from reclaimed leather and selvedge denim. Every jacket tells a story.", instagram: "@maccscustoms", bg: "bg-acid", featured: true, commissions: true, priceRange: "$280–$680", listings: 12, orders30d: 9, gmv30d: 3200 },
  { slug: "thread-wild", name: "Thread Wild", discipline: "fashion", location: "Collingwood", tagline: "Botanical-dyed linen. Slow fashion, literally.", bio: "Plant-dyed textiles and garments made entirely from natural fibres.", instagram: "@threadwild", bg: "bg-olive", featured: false, commissions: true, priceRange: "$120–$380", listings: 8, orders30d: 4, gmv30d: 840 },
  { slug: "kit-hale", name: "Kit Hale", discipline: "fashion", location: "Brunswick", tagline: "Gender-fluid streetwear cut to measure.", bio: "Made-to-measure streetwear that doesn't ask what you're wearing it for.", instagram: "@kithale", bg: "bg-char", featured: false, commissions: true, priceRange: "$90–$260", listings: 6, orders30d: 3, gmv30d: 520 },
  { slug: "reworked-mel", name: "Reworked Mel", discipline: "fashion", location: "Footscray", tagline: "Vintage finds rebuilt for now.", bio: "Deconstructed vintage silhouettes rebuilt with modern cuts and hardware.", instagram: "@reworkedmel", bg: "bg-sand", featured: false, commissions: false, priceRange: "$60–$220", listings: 14, orders30d: 6, gmv30d: 680 },
  { slug: "voss-leather", name: "Voss Leather", discipline: "fashion", location: "Northcote", tagline: "Minimalist leather goods. Melbourne made.", bio: "Wallets, belts, bags — all hand-cut from locally sourced leather.", instagram: "@vossleather", bg: "bg-terra", featured: false, commissions: true, priceRange: "$45–$320", listings: 10, orders30d: 5, gmv30d: 620 },
  { slug: "aleks-porter", name: "Aleks Porter", discipline: "fashion", location: "Richmond", tagline: "Reconstructed workwear with a feminine edge.", bio: "Industrial fabrics and workwear silhouettes cut for everyone.", instagram: "@aleks.porter", bg: "bg-rust", featured: false, commissions: false, priceRange: "$80–$340", listings: 7, orders30d: 2, gmv30d: 380 },

  // MUSIC
  { slug: "juno-reese", name: "Juno Reese", discipline: "music", location: "Northcote", tagline: "Lo-fi soul on tape. Limited pressings.", bio: "Cassette-only releases, hand-dubbed and numbered. Somewhere between D'Angelo and a field recording.", instagram: "@junoreesemusic", bg: "bg-navy", featured: true, commissions: false, priceRange: "$15–$45", listings: 5, orders30d: 12, gmv30d: 940 },
  { slug: "pale-wire", name: "Pale Wire", discipline: "music", location: "Footscray", tagline: "Post-punk zines and 7-inch splits.", bio: "DIY punk splits, risograph zines, and gig posters from the Footscray scene.", instagram: "@palewire", bg: "bg-char", featured: false, commissions: false, priceRange: "$8–$25", listings: 4, orders30d: 8, gmv30d: 320 },
  { slug: "moss-circuit", name: "Moss Circuit", discipline: "music", location: "Brunswick", tagline: "Ambient electronics. Handmade modular patches.", bio: "Generative ambient on handmade cassettes, plus custom Eurorack modules.", instagram: "@mosscircuit", bg: "bg-mint", featured: false, commissions: true, priceRange: "$20–$180", listings: 3, orders30d: 2, gmv30d: 260 },
  { slug: "teeth-and-tongue", name: "Teeth & Tongue", discipline: "music", location: "Thornbury", tagline: "Art-pop vinyl. Handpainted sleeves.", bio: "Each LP sleeve is a one-of-one painting. Music inside is pretty good too.", instagram: "@teethandtongue", bg: "bg-blush", featured: false, commissions: false, priceRange: "$35–$65", listings: 2, orders30d: 3, gmv30d: 180 },

  // VISUAL ART
  { slug: "kaz-nakamura", name: "Kaz Nakamura", discipline: "visual-art", location: "Brunswick", tagline: "Large-scale oils. Unsettling beauty.", bio: "Figurative oil paintings that sit somewhere between devotion and dread.", instagram: "@kaznmk", bg: "bg-rust", featured: true, commissions: true, priceRange: "$400–$4,800", listings: 9, orders30d: 4, gmv30d: 1380 },
  { slug: "darya-kowal", name: "Darya Kowal", discipline: "visual-art", location: "Brunswick", tagline: "Textured abstracts in earth and ochre.", bio: "Mixed media on canvas — sand, pigment, wax, and a lot of patience.", instagram: "@darya.kowal", bg: "bg-terra", featured: false, commissions: true, priceRange: "$300–$2,200", listings: 11, orders30d: 2, gmv30d: 620 },
  { slug: "ash-verdant", name: "Ash Verdant", discipline: "visual-art", location: "Collingwood", tagline: "Neon landscapes. Spray paint on found wood.", bio: "Reclaimed timber panels sprayed with electric colour palettes.", instagram: "@ashverdant", bg: "bg-acid", featured: false, commissions: false, priceRange: "$180–$1,400", listings: 7, orders30d: 3, gmv30d: 580 },
  { slug: "lila-mora", name: "Lila Mora", discipline: "visual-art", location: "Fitzroy", tagline: "Ink illustrations. Mythology meets Melbourne.", bio: "Pen and ink drawings that remix Greek myths through a Fitzroy lens.", instagram: "@lilamora.ink", bg: "bg-ink", featured: false, commissions: true, priceRange: "$60–$800", listings: 12, orders30d: 5, gmv30d: 720 },
  { slug: "rex-hollowtree", name: "Rex Hollowtree", discipline: "visual-art", location: "Footscray", tagline: "Charcoal portraits. Eyes that follow you.", bio: "Large format charcoal on paper. Commissions open. Eyes extra.", instagram: "@rexhollowtree", bg: "bg-char", featured: false, commissions: true, priceRange: "$250–$1,800", listings: 6, orders30d: 2, gmv30d: 440 },
  { slug: "mira-santos", name: "Mira Santos", discipline: "visual-art", location: "Preston", tagline: "Textile art meets painting. Stitched canvases.", bio: "Embroidered paintings on raw linen — thread replaces brushstrokes.", instagram: "@mira.santos.art", bg: "bg-blush", featured: false, commissions: true, priceRange: "$200–$1,600", listings: 5, orders30d: 1, gmv30d: 320 },
  { slug: "tommy-vex", name: "Tommy Vex", discipline: "visual-art", location: "Richmond", tagline: "Pop-art collage. Cut, paste, repeat.", bio: "Magazine cutout collages blown up to wall-size prints.", instagram: "@tommyvex", bg: "bg-sand", featured: false, commissions: false, priceRange: "$40–$320", listings: 8, orders30d: 4, gmv30d: 280 },
  { slug: "elke-jan", name: "Elke Jan", discipline: "visual-art", location: "Abbotsford", tagline: "Watercolour botanicals. Precise and patient.", bio: "Botanical watercolours with scientific accuracy and artistic soul.", instagram: "@elke.jan", bg: "bg-olive", featured: false, commissions: true, priceRange: "$80–$600", listings: 9, orders30d: 3, gmv30d: 360 },
  { slug: "zeph-torr", name: "Zeph Torr", discipline: "visual-art", location: "Coburg", tagline: "Digital glitch art printed on aluminium.", bio: "Glitch aesthetics output on brushed aluminium panels.", instagram: "@zephtorr", bg: "bg-navy", featured: false, commissions: false, priceRange: "$120–$900", listings: 4, orders30d: 1, gmv30d: 180 },

  // CERAMICS
  { slug: "rory-fern", name: "Rory Fern", discipline: "ceramics", location: "Coburg", tagline: "Wheel-thrown stoneware. Kitchen to gallery.", bio: "Functional ceramics — mugs, bowls, vases — with a matte speckled glaze that looks like it grew there.", instagram: "@roryfernceramics", bg: "bg-terra", featured: true, commissions: true, priceRange: "$35–$280", listings: 22, orders30d: 11, gmv30d: 2120 },
  { slug: "serra-ng", name: "Serra Ng", discipline: "ceramics", location: "Coburg", tagline: "Hand-carved vessels. Brutalist softness.", bio: "Slab-built ceramics with carved surface textures inspired by Brutalist architecture.", instagram: "@serrang.clay", bg: "bg-rust", featured: false, commissions: true, priceRange: "$60–$420", listings: 16, orders30d: 8, gmv30d: 1280 },
  { slug: "clay-haus", name: "Clay Haus", discipline: "ceramics", location: "Thornbury", tagline: "Porcelain lighting. Glow different.", bio: "Translucent porcelain pendant lights and table lamps, thrown and hand-pierced.", instagram: "@clay.haus", bg: "bg-gold", featured: false, commissions: true, priceRange: "$140–$600", listings: 8, orders30d: 3, gmv30d: 680 },
  { slug: "mudstone-mel", name: "Mudstone Mel", discipline: "ceramics", location: "Northcote", tagline: "Raku-fired chaos. Every piece a surprise.", bio: "Raku firing means every piece comes out different. That's the point.", instagram: "@mudstonemel", bg: "bg-char", featured: false, commissions: false, priceRange: "$45–$380", listings: 12, orders30d: 4, gmv30d: 520 },
  { slug: "kin-pottery", name: "Kin Pottery", discipline: "ceramics", location: "Fitzroy", tagline: "Collaborative ceramics. Two hands, one wheel.", bio: "A duo making functional ware with mismatched glazes and a shared wheel.", instagram: "@kin.pottery", bg: "bg-olive", featured: false, commissions: true, priceRange: "$30–$180", listings: 18, orders30d: 6, gmv30d: 440 },
  { slug: "vera-stoneware", name: "Vera Stoneware", discipline: "ceramics", location: "Brunswick", tagline: "Black clay. Matte everything.", bio: "All-black stoneware — vases, cups, plates — with raw unglazed surfaces.", instagram: "@verastoneware", bg: "bg-ink", featured: false, commissions: false, priceRange: "$40–$260", listings: 10, orders30d: 5, gmv30d: 380 },
  { slug: "wild-kiln", name: "Wild Kiln", discipline: "ceramics", location: "Healesville", tagline: "Wood-fired. Slow. Regional.", bio: "Wood-fired stoneware from a hand-built kiln in the Yarra Valley.", instagram: "@wild.kiln", bg: "bg-terra", featured: false, commissions: false, priceRange: "$55–$320", listings: 6, orders30d: 2, gmv30d: 220 },
  { slug: "yael-brecht", name: "Yael Brecht", discipline: "ceramics", location: "Footscray", tagline: "Sculptural ceramics. Function optional.", bio: "Ceramic sculptures that might also be vases. Or might not.", instagram: "@yaelbrecht", bg: "bg-blush", featured: false, commissions: true, priceRange: "$80–$500", listings: 5, orders30d: 1, gmv30d: 160 },

  // TATTOO
  { slug: "ivy-reaper", name: "Ivy Reaper", discipline: "tattoo", location: "Fitzroy", tagline: "Botanical blackwork. Thorns and all.", bio: "Detailed botanical blackwork — vines, thorns, wildflowers — on skin and paper.", instagram: "@ivyreaper", bg: "bg-char", featured: true, commissions: true, priceRange: "$200–$800", listings: 6, orders30d: 5, gmv30d: 1150 },
  { slug: "ghost-hand", name: "Ghost Hand", discipline: "tattoo", location: "Collingwood", tagline: "Fine-line portraits. One needle.", bio: "Single-needle fine-line work — portraits, text, micro-realism.", instagram: "@ghosthandtattoo", bg: "bg-ink", featured: false, commissions: true, priceRange: "$150–$600", listings: 4, orders30d: 4, gmv30d: 820 },
  { slug: "sun-ritual", name: "Sun Ritual", discipline: "tattoo", location: "Brunswick", tagline: "Hand-poke only. Sacred geometry.", bio: "Hand-poked sacred geometry and ornamental patterns. No machines.", instagram: "@sunritual", bg: "bg-gold", featured: false, commissions: true, priceRange: "$180–$500", listings: 3, orders30d: 3, gmv30d: 640 },
  { slug: "hex-ink", name: "Hex Ink", discipline: "tattoo", location: "Preston", tagline: "Neo-traditional colour. Bold forever.", bio: "Thick lines, saturated colour, neo-traditional style that ages well.", instagram: "@hexink.melb", bg: "bg-rust", featured: false, commissions: true, priceRange: "$250–$1,200", listings: 5, orders30d: 2, gmv30d: 480 },
  { slug: "cam-whitlam", name: "Cam Whitlam", discipline: "tattoo", location: "Preston", tagline: "Illustrative blackwork. Dark fairy tales.", bio: "Illustrative pieces inspired by folklore, fairy tales, and nightmares.", instagram: "@cam.whitlam", bg: "bg-navy", featured: false, commissions: true, priceRange: "$200–$900", listings: 4, orders30d: 0, gmv30d: 0 },
  { slug: "sol-lines", name: "Sol Lines", discipline: "tattoo", location: "Northcote", tagline: "Minimal linework. Less is permanent.", bio: "Clean single-line tattoos — animals, faces, shapes — in one continuous stroke.", instagram: "@sol.lines", bg: "bg-sand", featured: false, commissions: true, priceRange: "$120–$400", listings: 3, orders30d: 2, gmv30d: 320 },

  // JEWELLERY
  { slug: "nora-veldt", name: "Nora Veldt", discipline: "jewellery", location: "Collingwood", tagline: "Recycled silver. Raw edges.", bio: "Rings, chains, and ear cuffs cast from recycled silver with deliberately rough textures.", instagram: "@noraveldt", bg: "bg-gold", featured: true, commissions: true, priceRange: "$60–$440", listings: 8, orders30d: 7, gmv30d: 1890 },
  { slug: "halo-smith", name: "Halo Smith", discipline: "jewellery", location: "Fitzroy", tagline: "Signet rings. Modern heirlooms.", bio: "Custom signet rings engraved by hand — initials, symbols, coordinates.", instagram: "@halosmith.rings", bg: "bg-char", featured: false, commissions: true, priceRange: "$180–$600", listings: 5, orders30d: 3, gmv30d: 640 },
  { slug: "rust-and-bone", name: "Rust & Bone", discipline: "jewellery", location: "Northcote", tagline: "Oxidised brass. Industrial elegance.", bio: "Brass and copper pieces with deliberate patina and industrial detailing.", instagram: "@rustandbone.au", bg: "bg-rust", featured: false, commissions: false, priceRange: "$30–$180", listings: 12, orders30d: 6, gmv30d: 420 },
  { slug: "eden-wire", name: "Eden Wire", discipline: "jewellery", location: "Brunswick", tagline: "Wire-wrapped crystals. Wearable geology.", bio: "Gold and silver wire wrapping around raw crystals and found stones.", instagram: "@eden.wire", bg: "bg-mint", featured: false, commissions: true, priceRange: "$40–$220", listings: 10, orders30d: 4, gmv30d: 320 },
  { slug: "marlo-co", name: "Marlo & Co", discipline: "jewellery", location: "Richmond", tagline: "Resin and pressed flowers. Wearable gardens.", bio: "Pressed native flowers set in crystal-clear resin — earrings, pendants, rings.", instagram: "@marlo.co.jewels", bg: "bg-blush", featured: false, commissions: false, priceRange: "$25–$120", listings: 14, orders30d: 8, gmv30d: 380 },

  // GRAPHIC
  { slug: "drool-studio", name: "Drool Studio", discipline: "graphic", location: "Brunswick", tagline: "Risograph prints. Acid palette. Limited runs.", bio: "Two-colour riso prints on recycled stock. Editions of 50 or less.", instagram: "@droolstudio", bg: "bg-acid", featured: true, commissions: true, priceRange: "$25–$180", listings: 18, orders30d: 14, gmv30d: 2840 },
  { slug: "theo-park", name: "Theo Park", discipline: "graphic", location: "Footscray", tagline: "Poster design. Gig flyers to gallery walls.", bio: "Screen-printed posters for bands, bars, and galleries across Melbourne.", instagram: "@theopark.studio", bg: "bg-blue", featured: true, commissions: true, priceRange: "$20–$120", listings: 14, orders30d: 6, gmv30d: 1420 },
  { slug: "void-type", name: "Void Type", discipline: "graphic", location: "Fitzroy", tagline: "Experimental typography. Letters as art.", bio: "Custom typefaces and typographic art prints — letters you want to stare at.", instagram: "@void.type", bg: "bg-char", featured: false, commissions: true, priceRange: "$30–$200", listings: 8, orders30d: 4, gmv30d: 480 },
  { slug: "neon-ghost", name: "Neon Ghost", discipline: "graphic", location: "Collingwood", tagline: "Zines and sticker packs. Cheap thrills.", bio: "Photocopied zines, sticker sheets, and button packs. All under $20.", instagram: "@neonghost.press", bg: "bg-blush", featured: false, commissions: false, priceRange: "$5–$18", listings: 20, orders30d: 22, gmv30d: 280 },
  { slug: "lux-output", name: "Lux Output", discipline: "graphic", location: "Richmond", tagline: "Data visualisation as art prints.", bio: "Beautiful prints generated from real datasets — transit, weather, music.", instagram: "@luxoutput", bg: "bg-navy", featured: false, commissions: true, priceRange: "$40–$160", listings: 6, orders30d: 3, gmv30d: 320 },
  { slug: "folk-press", name: "Folk Press", discipline: "graphic", location: "Thornbury", tagline: "Lino-cut prints. Old school, new subjects.", bio: "Hand-cut lino blocks printed on Japanese paper. Edition of 25.", instagram: "@folkpress.melb", bg: "bg-olive", featured: false, commissions: false, priceRange: "$35–$120", listings: 8, orders30d: 4, gmv30d: 260 },
  { slug: "pixel-ritual", name: "Pixel Ritual", discipline: "graphic", location: "Abbotsford", tagline: "Retro pixel art. 8-bit nostalgia.", bio: "Pixel art prints and patches inspired by 80s/90s game aesthetics.", instagram: "@pixelritual", bg: "bg-mint", featured: false, commissions: true, priceRange: "$15–$80", listings: 10, orders30d: 6, gmv30d: 180 },

  // PHOTOGRAPHY
  { slug: "rue-hallows", name: "Rue Hallows", discipline: "photography", location: "Abbotsford", tagline: "35mm street photography. Melbourne after dark.", bio: "Grainy 35mm film shots of Melbourne's nighttime — laneways, neon, rain.", instagram: "@ruehallows.photo", bg: "bg-ink", featured: false, commissions: false, priceRange: "$60–$400", listings: 20, orders30d: 3, gmv30d: 720 },
  { slug: "fern-glass", name: "Fern Glass", discipline: "photography", location: "Daylesford", tagline: "Large-format landscapes. Regional Victoria.", bio: "4x5 large format film landscapes of regional Victoria — slow, deliberate, enormous.", instagram: "@fern.glass", bg: "bg-olive", featured: false, commissions: false, priceRange: "$120–$800", listings: 8, orders30d: 1, gmv30d: 280 },
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
