import { Box, Divider, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const SingleFeedPageExcerpt = ({
  stateFeed,
  createdDate,
  cost,
  purchasedDate,
  batch,
  handleClick,
  handleDelete,
  isLoading,
}) => {
  return (
    <>
      <Typography color="gray" fontSize="20px">
        {stateFeed.feedName}
      </Typography>
      <Divider />
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        {" "}
        <label style={{ color: "gray" }}>Creation Date: </label>
        <Typography marginLeft="5px">
          {stateFeed ? createdDate.split("T")[0] : null}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Title: </label>
        <Typography marginLeft="5px">{stateFeed.feedName}</Typography>
      </Box>

      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Cost: </label>
        <Typography marginLeft="5px">{cost}</Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="left" my="8px">
        <label style={{ color: "gray" }}>Date Purchased: </label>
        <Typography marginLeft="5px">
          {stateFeed ? purchasedDate.split("T")[0] : null}
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
            Edit Feed
          </Button>
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            disabled={isLoading}
            onClick={handleDelete}
          >
            {isLoading ? "Deleting" : "Delete Feed"}
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default SingleFeedPageExcerpt;
