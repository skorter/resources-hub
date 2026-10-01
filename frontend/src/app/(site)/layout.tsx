import Header from "@/app/(site)/layout/Header/Header";
import Footer from "@/app/(site)/layout/Footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
