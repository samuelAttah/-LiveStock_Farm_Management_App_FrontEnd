import { Box, Divider, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const SingleHousingPageExcerpt = ({
  stateHousing,
  createdDate,
  cost,
  datePurchased,
  batch,
  handleClick,
  handleDelete,
  isLoading,
}) => {
  return (
    <>
      <Typography color="gray" fontSize="20px">
        {stateHousing.housingType?.length > 30
          ? `${stateHousing.housingType.slice(0, 30)}...`
          : stateHousing.housingType}
      </Typography>
      <Divider />
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        {" "}
        <label style={{ color: "gray" }}>Creation Date: </label>
        <Typography marginLeft="5px">{createdDate}</Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        {" "}
        <label style={{ color: "gray" }}>Date Purchased: </label>
        <Typography marginLeft="5px">{datePurchased}</Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Title: </label>
        <Typography marginLeft="5px">
          {stateHousing?.housingType ?? null}
        </Typography>
      </Box>

      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Cost: </label>
        <Typography marginLeft="5px">{cost}</Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Description: </label>
        <Typography marginLeft="5px" textAlign="left">
          {stateHousing?.description ?? null}
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
            Edit Property
          </Button>
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting" : "Delete Property"}
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default SingleHousingPageExcerpt;
