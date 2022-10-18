import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailIcon from "@mui/icons-material/Mail";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import { Link } from "@mui/material";

const ContactPage = () => {
  return (
    <Grid item xs={12} md={12} mt={10} padding={4}>
      <Typography component="h6" variant="h6" color="gray">
        Contact Us
      </Typography>
      <hr />
      <Typography component="p" textAlign={"justify"}>
        3files technology is the company that developed this Livestock Diary
        Application.
      </Typography>
      <Typography
        component="p"
        textAlign={"justify"}
        mt={2}
        fontWeight={"bold"}
      >
        You can Contact us via:
      </Typography>
      <Box display={"flex"} flexDirection="row" alignItems="center">
        <IconButton>
          <InstagramIcon />
        </IconButton>
        <Typography>
          {" "}
          <Link href="https://www.instagram.com/official_elmagnifico/">
            Instagram
          </Link>
        </Typography>
      </Box>
      <Box display={"flex"} flexDirection="row" alignItems="center">
        <IconButton>
          <LinkedInIcon />
        </IconButton>
        <Typography>
          {" "}
          <Link href="https://www.linkedin.com/in/samuel-attah-56a49a141/">
            LinkedIn
          </Link>
        </Typography>
      </Box>
      <Box display={"flex"} flexDirection="row" alignItems="center">
        <IconButton>
          <MailIcon />
        </IconButton>
        <Typography>sammy.attah16@gmail.com</Typography>
      </Box>
      <Box display={"flex"} flexDirection="row" alignItems="center">
        <IconButton>
          <ContactPhoneIcon />
        </IconButton>
        <Typography>+2347066102608</Typography>
      </Box>
    </Grid>
  );
};

export default ContactPage;
