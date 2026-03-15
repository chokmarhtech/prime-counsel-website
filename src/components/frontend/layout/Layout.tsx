import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FinalCTA from "./final-cta";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Layout;
