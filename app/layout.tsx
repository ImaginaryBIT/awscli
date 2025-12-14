import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AWS CLI Command Search - Interactive AWS Command Reference & Parameter Explorer",
  description: "Fast, interactive search tool for AWS CLI commands with fuzzy matching, autocomplete, and comprehensive parameter documentation. Search 80+ AWS services, 740+ commands, and 3200+ parameters instantly.",
  keywords: [
    "AWS CLI",
    "AWS command search",
    "AWS CLI reference",
    "AWS CLI commands",
    "AWS CLI parameters",
    "AWS CLI autocomplete",
    "AWS CLI documentation",
    "AWS command line interface",
    "AWS CLI tool",
    "AWS CLI helper",
    "EC2 commands",
    "S3 commands",
    "Lambda commands",
    "AWS service commands",
    "AWS CLI fuzzy search",
    "AWS parameter reference",
    "AWS CLI cheat sheet"
  ],
  authors: [{ name: "AWS CLI Search" }],
  creator: "AWS CLI Search",
  publisher: "AWS CLI Search",
  robots: "index, follow",
  openGraph: {
    title: "AWS CLI Command Search - Interactive Command Reference",
    description: "Search and explore 740+ AWS CLI commands across 80 services with intelligent fuzzy matching and comprehensive parameter documentation.",
    type: "website",
    locale: "en_US",
    siteName: "AWS CLI Command Search",
  },
  twitter: {
    card: "summary_large_image",
    title: "AWS CLI Command Search - Interactive AWS Command Reference",
    description: "Fast, interactive search for AWS CLI commands with autocomplete and parameter documentation. 80+ services, 740+ commands.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
