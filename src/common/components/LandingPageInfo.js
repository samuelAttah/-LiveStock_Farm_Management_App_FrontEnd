import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

const LandingPageInfo = () => {
  return (
    <Grid item xs={12} md={12} mt={1} padding={4}>
      <Typography
        component="h6"
        variant="h5"
        fontFamily="cursive"
        fontWeight="bold"
      >
        Why Livestock Farm Diary
      </Typography>

      <Typography component="p" textAlign={"justify"} mt={3}>
        Livestock farming consumes a lot of time and energy. This often leaves
        the farmer with little time to take proper inventory of the farm
        animals. For this reason, the Livestock Diary Application was designed
        and developed to aid farmers to keep a proper record of farm animals.
      </Typography>
      <Typography component="p" textAlign={"justify"} mt={3}>
        This application builds on the premise that farm animals are usually
        reared in flocks, herds, batches, etc. Animals of the same batch are
        usually of the same age and require similar care. With the help of this
        application, the livestock farmer can keep records of all expenditures
        such as expenses incurred from the purchase of feeds, drugs/healthcare,
        landed properties, and miscellaneous expenses as well. The farmer can
        also record revenues generated from a batch such as from the sales of
        animals from a batch, or sales of other farm items. This application
        also helps the farmer keep a record of mortalities or dead animals from
        a batch.
      </Typography>

      <Typography component="p" textAlign={"justify"} mt={3}>
        What is more fascinating is that this application informs the Livestock
        farmer if he/she is running losses or making profits.
      </Typography>

      <Typography
        component="p"
        textAlign={"justify"}
        mt={3}
        fontWeight={"bold"}
      >
        You can enjoy all this for free once you Sign Up{" "}
        <Link to="/register"> here</Link>
      </Typography>
    </Grid>
  );
};

export default LandingPageInfo;
