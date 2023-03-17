import Navigatebar from "./Navbar";
//import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Navigatebar />
      <main>{children}</main>
    </>
  );
}
