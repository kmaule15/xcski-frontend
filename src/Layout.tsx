import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

const Layout = () => {
  return (
    <>
      <NavBar />
      <p></p>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
