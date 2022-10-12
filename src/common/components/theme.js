// import { green } from "@mui/material/colors";
import grey from "@mui/material/colors/grey";
import createTheme from "@mui/material/styles/createTheme";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32",
    },
    secondary: {
      main: grey[50],
    },
  },
});

export default theme;
