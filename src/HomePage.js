import React from "react";
import Typography from "@mui/material/Typography";

import CarouselComponent from "./common/components/CarouselComponent";

const HomePage = () => {
  return (
    <>
      <CarouselComponent />
      <Typography sx={{ color: "primary.main" }}>HomePage</Typography>
    </>
  );
};

export default HomePage;
