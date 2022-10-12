import Header from "./Header";
import Footer from "./Footer";
import Box from "@mui/material/Box";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Box paddingBottom={15} />
      <Footer />
    </>
  );
};

export default Layout;
