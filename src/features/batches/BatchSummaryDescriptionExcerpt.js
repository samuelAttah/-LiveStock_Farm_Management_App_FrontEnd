import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import grey from "@mui/material/colors/grey";

const BatchSummaryDescriptionExcerpt = ({
  batch,
  totalDeadAnimals,
  costPerUnit,
  totalPurchaseCost,
  createdDate,
  purchasedDate,
}) => {
  return (
    <>
      <Typography color={grey[800]} component="h6" variant="h6" mb={2}>
        General Description
      </Typography>

      <Grid container spacing={1} mb={1}>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="row">
            <Typography fontWeight="bold" textAlign="left">
              Batch Title:{" "}
            </Typography>
            <Typography ml={1} textAlign="left">
              {batch?.batchTitle}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="row">
            <Typography fontWeight="bold" textAlign="left">
              {" "}
              Animal Type:{" "}
            </Typography>
            <Typography ml={1} textAlign="left">
              {batch?.animalType}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1} mb={1}>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="row">
            <Typography fontWeight="bold" textAlign="left">
              Initial Number of Animals :{" "}
            </Typography>
            <Typography ml={1} textAlign="left">
              {batch?.numberPurchased}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="row">
            <Typography fontWeight="bold" textAlign="left">
              {" "}
              Number of Dead Animals:{" "}
            </Typography>
            <Typography ml={1} textAlign="left">
              {totalDeadAnimals}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1} mb={1}>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="row">
            <Typography fontWeight="bold" textAlign="left">
              Cost Per Animal:
            </Typography>
            <Typography ml={1} textAlign="left">
              {costPerUnit}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="row">
            <Typography fontWeight="bold" textAlign="left">
              {" "}
              Total Purchase Cost:{" "}
            </Typography>
            <Typography ml={1} textAlign="left">
              {totalPurchaseCost}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1} mb={1}>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="row">
            <Typography fontWeight="bold" textAlign="left">
              Date of Purchase:
            </Typography>
            <Typography ml={1} textAlign="left">
              {purchasedDate.split("T")[0]}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="row">
            <Typography fontWeight="bold" textAlign="left">
              {" "}
              Batch Creation Date:{" "}
            </Typography>
            <Typography ml={1} textAlign="left">
              {createdDate.split("T")[0]}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default BatchSummaryDescriptionExcerpt;
