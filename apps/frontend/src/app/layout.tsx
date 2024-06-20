import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { StoreProvider } from "./StoreProvider";
import CookieController from "@/components/general/cookie-controller";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import InitialStateLoad from "@/components/general/initial-state-load";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "TutorSeekers",
  description: "TutorSeekers is a platform for educational purposes.",
  icons: {
    icon: "/images/general/logo.png",
  },
};

// className={`${poppins.variable} text-base select-none flex h-screen flex-col bg-gradient-to-r from-blue-dark from-0% via-blue-normal via-25% to-blue-dark to-90% pt-8 text-white-800`}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${poppins.variable} text-base select-none flex h-screen flex-col bg-blue-normal text-white-800`}
        >
          <CookieController>
            <InitialStateLoad />
            <Header />
            {children}
            <Footer />
          </CookieController>
        </body>
      </html>
    </StoreProvider>
  );
}
