"use client";

import { Poppins } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clsx from "clsx";
import SessionProvider from "@/providers/SessionProvider";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Ace Gallagher</title>
        <meta
          name="description"
          content={"Landing page that shows statistics"}
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <body
        className={clsx(
          poppins.className,
          "bg-grey-light md:text-[13px] xl:text-[16px]"
        )}
      >
        <SessionProvider>{children}</SessionProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
