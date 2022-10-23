import { Box, Button, Divider, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const SIngleBatchPageExcerpt = ({
  stateBatch,
  createdDate,
  purchasedDate,
  costPerUnit,
  totalPurchaseCost,
  currency,
  handleSummary,
  handleClick,
  handleDelete,
  isLoading,
}) => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Typography color="gray" fontSize="20px" textAlign="left">
          {stateBatch?.batchTitle}
        </Typography>
        <Button size="small" variant="outlined" onClick={handleSummary}>
          Go To Summary
        </Button>
      </Box>
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
        <Typography marginLeft="5px">{currency}</Typography>
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
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        {" "}
        <label style={{ color: "gray" }}>Purchase Date: </label>
        <Typography marginLeft="5px">
          {stateBatch ? purchasedDate.split("T")[0] : null}
        </Typography>
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
