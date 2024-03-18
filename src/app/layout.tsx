"use client";

import { Poppins } from "next/font/google";
import "./globals.css";
import Head from "next/head";

import clsx from "clsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const metadata: Metadata = {
  title: "Ace Gallagher",
  description: "This website shows the data as charts for different types",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body
        className={clsx(
          poppins.className,
          "bg-grey-light md:text-[13px] xl:text-[16px]"
        )}
      >
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen py-5 xl:py-10 relative">{children}</div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
