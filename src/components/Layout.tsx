import Head from "next/head";
import Navigatebar from "./Navbar";
import { ReactNode } from "react";
//import Footer from "./Footer";
//
type LayoutProps = { children?: ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Local Info</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigatebar />
      <main>{children}</main>
    </>
  );
}
