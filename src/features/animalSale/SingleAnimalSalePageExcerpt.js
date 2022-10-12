import { Box, Divider, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const SingleAnimalSalePageExcerpt = ({
  stateAnimalSale,
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
        {`${batch?.animalType}s Sold`}
      </Typography>
      <Divider />
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        {" "}
        <label style={{ color: "gray" }}>Creation Date: </label>
        <Typography marginLeft="5px">{createdDate.split("T")[0]}</Typography>
      </Box>

      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>
          {`Number of ${batch?.animalType} sold: `}{" "}
        </label>
        <Typography marginLeft="5px">{stateAnimalSale?.numberSold}</Typography>
      </Box>

      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>
          {`Cost per ${batch?.animalType}:`}{" "}
        </label>
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
            Edit Animal Sale
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            disabled={isLoading}
          >
            {isLoading ? "Deleting" : "Delete Sale"}
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default SingleAnimalSalePageExcerpt;
