import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WashBay Balussery | Premium Car Wash & Detailing in Kozhikode",
  description: "WashBay is Balussery's trusted car wash and vehicle care center. Professional exterior wash, foam wash, interior cleaning, wax polish, and detailing services in Kozhikode.",
  keywords: "car wash Balussery, car wash Kozhikode, foam wash, interior cleaning, vehicle detailing, bike wash, wax polish, WashBay",
  authors: [{ name: "WashBay Balussery" }],
  openGraph: {
    title: "WashBay Balussery | Premium Car Wash & Detailing",
    description: "Professional car wash and detailing services in Balussery, Kozhikode. Serving Koorachundu, Naduvannur, Ulliyeri, Atholi and surrounding areas.",
    url: "https://washbay-frontend-git-main-ayana-2004s-projects.vercel.app",
    siteName: "WashBay Balussery",
    images: [{ url: "/images/carwashh.png", width: 1200, height: 630, alt: "WashBay Car Wash Balussery" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WashBay Balussery | Premium Car Wash",
    description: "Professional car wash and detailing in Balussery, Kozhikode.",
    images: ["/images/carwashh.png"],
  },
  icons: {
    icon: "/images/washbaylogo-removebg-preview.png",
    apple: "/images/washbaylogo-removebg-preview.png",
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
        <link rel="icon" href="/images/washbaylogo-removebg-preview.png" />
        <link rel="apple-touch-icon" href="/images/washbaylogo-removebg-preview.png" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}