import { Box, Button, Divider, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const SIngleBatchPageExcerpt = ({
  stateBatch,
  createdDate,
  costPerUnit,
  totalPurchaseCost,
  handleClick,
  handleDelete,
  isLoading,
}) => {
  return (
    <>
      <Typography color="gray" fontSize="20px">
        {stateBatch?.batchTitle}
      </Typography>
      <Divider />
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        {" "}
        <label style={{ color: "gray" }}>Creation Date: </label>
        <Typography marginLeft="5px">
          {stateBatch ? createdDate.split("T")[0] : null}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Title: </label>
        <Typography marginLeft="5px">{stateBatch?.batchTitle}</Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Batch Number: </label>
        <Typography marginLeft="5px">{stateBatch?.batchNumber}</Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Animal Type: </label>
        <Typography marginLeft="5px">{stateBatch?.animalType}</Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Quantity Purchased: </label>
        <Typography marginLeft="5px">{stateBatch?.numberPurchased}</Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Currency: </label>
        <Typography marginLeft="5px">{stateBatch?.currency}</Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>
          {`Cost Per ${stateBatch?.animalType}:`}{" "}
        </label>
        <Typography marginLeft="5px">{costPerUnit}</Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>
          {`Total Cost of ${stateBatch?.animalType}s:`}{" "}
        </label>
        <Typography marginLeft="5px">{totalPurchaseCost}</Typography>
      </Box>
      {stateBatch?.isActive ? (
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
            Edit Batch
          </Button>
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting" : "Delete Batch"}
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default SIngleBatchPageExcerpt;
