import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Makeshift — Independent Australian Art Marketplace",
    template: "%s — Makeshift",
  },
  description:
    "A curated online marketplace for independent Australian artists and creators. Melbourne-based, community-led. By artists, for artists.",
  openGraph: {
    title: "Makeshift — Independent Australian Art Marketplace",
    description:
      "A curated online marketplace for independent Australian artists and creators. Melbourne-based, community-led.",
    url: "https://makeshift-au.com",
    siteName: "Makeshift",
    images: [
      {
        url: "https://makeshift-au.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Makeshift — Independent Australian Art Marketplace",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Makeshift — Independent Australian Art Marketplace",
    description:
      "A curated online marketplace for independent Australian artists and creators. Melbourne-based, community-led.",
    images: ["https://makeshift-au.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Outfit:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
