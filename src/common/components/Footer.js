import * as React from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "absolute",
        bottom: 0,
        width: "95%",
        mt: "100px",
        paddingTop: "30px",
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        {`All Rights Belongs to 3files Technology `}
      </Typography>
      <Copyright />
    </Box>
  );
};

export default Footer;
