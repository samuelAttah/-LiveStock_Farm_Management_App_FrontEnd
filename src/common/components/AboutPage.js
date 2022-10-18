import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <Grid item xs={12} md={12} mt={10} padding={4}>
      <Typography component="h6" variant="h6" color="gray">
        About
      </Typography>
      <hr />
      <Typography component="p" textAlign={"justify"}>
        3files technology is the company that developed this Livestock Diary
        Application.
      </Typography>
      <Typography component="p" textAlign={"justify"} mt={3}>
        This Application was developed to help livestock farmers properly
        document expenditures and revenues on the farm. Farm animals are reared
        in groups or batches. A Batch refers to farm animals purchased or
        produced within a particular period. Usually, animals in a batch are
        just about the same age.
      </Typography>

      <Typography component="p" textAlign={"justify"} mt={3}>
        This Application documents expenses in a batch under four categories:
        Mortalities, Purchase of drugs/Health Care, Purchase of Feeds, Purchase
        of Properties (lands, buildings, etc.), and other miscellaneous
        expenses.
      </Typography>

      <Typography component="p" textAlign={"justify"} mt={3}>
        However, revenues are generated in a batch firstly, through the sales of
        farm animals. Secondly, through selling other items such as milk, eggs,
        etc., landed properties, buildings, or any other item from the farm
        during a batch.
      </Typography>

      <Typography component="p" textAlign={"justify"} mt={3}>
        A batch summary page highlights all expenditures and revenues, thus
        analyzing if the farmer is making profits or running losses.
      </Typography>

      <Typography
        component="p"
        textAlign={"justify"}
        mt={3}
        fontStyle="italic"
        fontWeight={"bold"}
      >
        This Application is the sole property of 3files technology. At 3files
        technology, we deliver quality production-ready B2B or B2C mobile and
        web applications to suit the needs of our clients and users.
      </Typography>

      <Typography
        component="p"
        textAlign={"justify"}
        mt={3}
        fontWeight={"bold"}
      >
        Kindly <Link to="/contact">Contact us</Link> for more info.
      </Typography>
    </Grid>
  );
};

export default AboutPage;
