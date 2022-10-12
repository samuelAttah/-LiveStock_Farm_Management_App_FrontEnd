import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import { useDeleteBatchMutation } from "../batches/batchApiSlice";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import grey from "@mui/material/colors/grey";

function DashBoardPageExcerptInActive({ batch }) {
  const navigate = useNavigate();

  const [doDelete, { isLoading }] = useDeleteBatchMutation();

  const handleDelete = async () => {
    try {
      await doDelete({ id: batch?.id }).unwrap();
      toast.success("Deleted Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (error) {
      console.log(error?.data.message);
      toast.error("Failed to Delete", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <Grid item xs={6} md={12} flexDirection="row">
      <Card
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: grey[600],
        }}
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

          <Button
            onClick={() => navigate(`/batch/${batch.id}`)}
            variant="contained"
            size="small"
          >
            VIEW BATCH
          </Button>
          <Tooltip title="Delete Batch">
            <IconButton
              sx={{
                p: 0,
                backgroundColor: "white",
                ":hover": { backgroundColor: "white" },
              }}
              color="secondary"
              onClick={handleDelete}
              disabled={isLoading}
            >
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
          </Tooltip>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default DashBoardPageExcerptInActive;
