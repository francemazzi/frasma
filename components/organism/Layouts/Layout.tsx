import { ReactElement } from "react";
import NavBar from "../../molecols/Navbar/Navbar";
import Footer from "../../molecols/footer/Footer";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
