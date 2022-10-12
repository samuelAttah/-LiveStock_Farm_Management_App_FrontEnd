import { Box, Divider, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const SingleDrugPageExcerpt = ({
  stateDrug,
  createdDate,
  cost,
  datePurchased,
  handleClick,
  handleDelete,
  isLoading,
  batch,
}) => {
  return (
    <>
      <Typography color="gray" fontSize="20px">
        {stateDrug.drugName}
      </Typography>
      <Divider />
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        {" "}
        <label style={{ color: "gray" }}>Creation Date: </label>
        <Typography marginLeft="5px">
          {stateDrug ? createdDate.split("T")[0] : null}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Date Purchased: </label>
        <Typography marginLeft="5px">
          {stateDrug ? datePurchased.split("T")[0] : null}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Title: </label>
        <Typography marginLeft="5px">{stateDrug.drugName}</Typography>
      </Box>

      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Cost: </label>
        <Typography marginLeft="5px">{cost}</Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Reason for Purchase: </label>
        <Typography marginLeft="5px" textAlign="left">
          {stateDrug?.purchaseReason}
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
            Edit Drug
          </Button>
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting" : "Delete Drug"}
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default SingleDrugPageExcerpt;
