import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Layout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
export default Layout;
