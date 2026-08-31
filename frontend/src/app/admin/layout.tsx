import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resource Hub | Admin Panel",
  description: "Control panel for managing Resource Hub content",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
