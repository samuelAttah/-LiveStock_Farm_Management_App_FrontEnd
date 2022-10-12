import { Box, Divider, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const SingleMortalityPageExcerpt = ({
  stateMortality,
  createdDate,
  batch,
  handleClick,
  handleDelete,
  isLoading,
}) => {
  return (
    <>
      <Typography color="gray" fontSize="20px">
        {`${stateMortality.numberDead} Dead`}
      </Typography>
      <Divider />
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        {" "}
        <label style={{ color: "gray" }}>Creation Date: </label>
        <Typography marginLeft="5px">
          {stateMortality ? createdDate.split("T")[0] : null}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Death Date: </label>
        <Typography marginLeft="5px">
          {stateMortality?.deathDate?.split("T")[0]}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Number Dead: </label>
        <Typography marginLeft="5px">{stateMortality.numberDead}</Typography>
      </Box>

      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Reason for Death: </label>
        <Typography marginLeft="5px" textAlign="left">
          {stateMortality?.deathReason}
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
            Edit Mortality
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
            startIcon={<DeleteIcon />}
            disabled={isLoading}
          >
            {isLoading ? "Deleting" : "Delete Mortality"}
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default SingleMortalityPageExcerpt;
