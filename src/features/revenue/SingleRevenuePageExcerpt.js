import { Box, Divider, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const SingleRevenuePageExcerpt = ({
  stateRevenue,
  createdDate,
  costPerUnit,
  totalCost,
  dateSold,
  handleClick,
  handleDelete,
  batch,
  isLoading,
}) => {
  return (
    <>
      <Typography color="gray" fontSize="20px">
        {stateRevenue?.itemSold?.length > 30
          ? `${stateRevenue?.itemSold}...`
          : stateRevenue?.itemSold}
      </Typography>
      <Divider />
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        {" "}
        <label style={{ color: "gray" }}>Creation Date: </label>
        <Typography marginLeft="5px">{createdDate.split("T")[0]}</Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Item Sold: </label>
        <Typography marginLeft="5px">{stateRevenue?.itemSold}</Typography>
      </Box>

      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Number Sold: </label>
        <Typography marginLeft="5px">{stateRevenue?.numberSold}</Typography>
      </Box>

      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Cost per Item: </label>
        <Typography marginLeft="5px">{costPerUnit}</Typography>
      </Box>

      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Total Cost: </label>
        <Typography marginLeft="5px">{totalCost}</Typography>
      </Box>

      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Date Sold: </label>
        <Typography marginLeft="5px">
          {dateSold.split("T")[0] ?? null}
        </Typography>
      </Box>
      {batch?.isActive ? (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="left"
          my="8px"
          mb="20px"
        >
          <Button
            onClick={handleClick}
            variant="contained"
            sx={{ mr: "15px" }}
            startIcon={<EditIcon />}
          >
            Edit Revenue
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            disabled={isLoading}
          >
            {isLoading ? "Deleting" : "Delete Revenue"}
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default SingleRevenuePageExcerpt;
