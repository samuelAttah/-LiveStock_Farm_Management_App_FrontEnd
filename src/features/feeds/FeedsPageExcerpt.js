import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";

function FeedsPageExcerpt({ feed, batchId }) {
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
            <Typography>
              {feed?.feedName?.length > 25
                ? `${feed.feedName.slice(0, 25)}...`
                : feed?.feedName}
            </Typography>
            <Typography>{feed.createdAt.split("T")[0]}</Typography>

            <Link to={`/batch/${batchId}/feeds/${feed.id}`}>
              <Typography
                fontSize="15px"
                color="primary.main"
                fontWeight="bold"
              >
                VIEW FEED
              </Typography>
            </Link>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default FeedsPageExcerpt;
