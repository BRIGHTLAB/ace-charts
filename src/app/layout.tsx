import { Poppins } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import ClientProvider from "@/providers/ClientProvider";
import type { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Ace Gallagher",
  description: "This website shows the data as charts for different types",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          poppins.className,
          "bg-grey-light md:text-[13px] xl:text-[16px]"
        )}
      >
        <ClientProvider>
          <div className="min-h-screen py-5 xl:py-10 relative">{children}</div>
        </ClientProvider>
      </body>
    </html>
  );
}
