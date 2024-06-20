import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
