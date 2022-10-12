import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEndBatchMutation } from "../batches/batchApiSlice";
import Button from "@mui/material/Button";
import EndBatchModal from "./EndBatchModal";

function DashBoardPageExcerpt({ batch }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [doEndBatch, { isError, error, isLoading }] = useEndBatchMutation();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await doEndBatch({ id: batch?.id.toString() }).unwrap();
      setOpen(false);
    } catch (error) {
      console.log(error.data.message);
    }
  };
  return (
    <Grid item xs={6} md={12} flexDirection="row">
      <Card
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        // onClick={() => navigate(`/batch/${batch.id}`)}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography fontWeight="bold">{`Batch Number ${batch.batchNumber}`}</Typography>
          <Typography>
            {batch.batchTitle.length > 30
              ? `${batch.batchTitle.slice(0, 30)}...`
              : batch.batchTitle}
          </Typography>
          <Typography>{batch.animalType}</Typography>

          <Button
            onClick={() => navigate(`/batch/${batch.id}`)}
            variant="contained"
            size="small"
          >
            VIEW BATCH
          </Button>
          <Button
            onClick={handleOpen}
            variant="contained"
            size="small"
            color="error"
          >
            END BATCH
          </Button>
        </CardContent>
      </Card>
      <EndBatchModal
        open={open}
        handleClose={handleClose}
        isLoading={isLoading}
        isError={isError}
        errors={error?.data?.message}
        handleSubmit={handleSubmit}
      />
    </Grid>
  );
}

export default DashBoardPageExcerpt;
