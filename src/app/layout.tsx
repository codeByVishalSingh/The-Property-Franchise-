import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Property Franchise | Commercial Real Estate Franchise Network",
  description:
    "An interactive cinematic commercial property franchise network. Explore prime office towers, corporate campuses, logistics hubs, and global franchise territories.",
  icons: {
    icon: "/tpf_logo.jpg",
    apple: "/tpf_logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#2285A8] text-white selection:bg-[#38BDF8] selection:text-[#082230]">{children}</body>
    </html>
  );
}
