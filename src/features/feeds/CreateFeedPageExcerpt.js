import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { NumericFormat } from "react-number-format";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CreateFeedPageExcerpt = ({
  formData,
  handleSubmit,
  handleChange,
  fetchError,
  canSave,
  datePurchased,
  setDatePurchased,
  stateBatch,
  isLoading,
}) => {
  const materialUITextFieldProps = {
    id: "filled-multiline-flexible",
    label: "Feed Price",
    multiline: false,
    maxRows: 1,
    variant: "outlined",
    fullWidth: true,
    name: "cost",
    placeholder: "0.00",
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h3" variant="h5" sx={{ mt: 2 }}>
        Create New Feed
      </Typography>
      <hr />
      {fetchError ? (
        <Typography sx={{ color: "red", fontSize: "small" }}>
          {fetchError}
        </Typography>
      ) : null}
      <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <Typography sx={{ textAlign: "left" }}>Feed Name:</Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Feed Name"
          name="feedName"
          value={formData.feedName}
          onChange={handleChange}
          autoFocus
          inputProps={{ maxLength: 30 }}
          // error={errors.username}
        />

        <Typography sx={{ textAlign: "left", mb: "10px" }}>
          {`Feed Cost/Price in ${stateBatch.currency}`}
        </Typography>
        <NumericFormat
          value={formData.cost}
          customInput={TextField}
          name="cost"
          onChange={handleChange}
          {...materialUITextFieldProps}
        />

        <Typography sx={{ textAlign: "left", my: "15px" }}>
          Date of Purchase:
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disableFuture
            label="Date of Purchase"
            openTo="year"
            views={["year", "month", "day"]}
            value={datePurchased}
            onChange={(newValue) => {
              setDatePurchased(newValue);
            }}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!canSave || isLoading}
          sx={{ mt: 3, mb: 2 }}
        >
          {isLoading ? "Creating Feed..." : "Create"}
        </Button>
      </Box>
    </Container>
  );
};

export default CreateFeedPageExcerpt;
