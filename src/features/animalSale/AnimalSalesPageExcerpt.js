import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";

function AnimalSalesPageExcerpt({ animalSale, batchId }) {
  return (
    <Grid item xs={6} md={6} flexDirection="row">
      <CardActionArea sx={{ justifyContent: "space-between" }}>
        <Card
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>{`${animalSale?.numberSold} Sold`}</Typography>
            <Typography>{animalSale?.createdAt.split("T")[0]}</Typography>

            <Link to={`/batch/${batchId}/animalsales/${animalSale.id}`}>
              <Typography
                fontSize="15px"
                color="primary.main"
                fontWeight="bold"
              >
                VIEW SALES
              </Typography>
            </Link>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default AnimalSalesPageExcerpt;
