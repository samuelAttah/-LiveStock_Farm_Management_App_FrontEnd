import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { NumericFormat } from "react-number-format";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const EditHousingPageExcerpt = ({
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
    label: "Property Price",
    multiline: false,
    maxRows: 1,
    variant: "outlined",
    fullWidth: true,
    name: "cost",
    placeholder: "0.00",
    required: true,
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h3" variant="h5" sx={{ mt: 2 }}>
        Update Housing/Property
      </Typography>
      <hr />
      {fetchError ? (
        <Typography sx={{ color: "red", fontSize: "small" }}>
          {fetchError}
        </Typography>
      ) : null}
      <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <Typography sx={{ textAlign: "left" }}>Property Type:</Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="type"
          label="Property Type"
          name="housingType"
          value={formData.housingType}
          onChange={handleChange}
          autoFocus
          inputProps={{ maxLength: 30 }}
        />

        <Typography sx={{ textAlign: "left", mb: "10px" }}>
          {`Property Cost/Price in ${stateBatch?.currency}:`}
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
            renderInput={(params) => (
              <TextField {...params} fullWidth required />
            )}
          />
        </LocalizationProvider>

        <Typography sx={{ textAlign: "left", mt: "10px" }}>
          Purchased Property Description:
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          value={formData.description}
          onChange={handleChange}
          id="description"
          variant="outlined"
          label="Property description"
          required
          multiline
          rows={4}
          name="description"
          inputProps={{ maxLength: 300 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!canSave || isLoading}
          sx={{ mt: 3, mb: 2 }}
        >
          {isLoading ? "Saving Property..." : "Save Property"}
        </Button>
      </Box>
    </Container>
  );
};

export default EditHousingPageExcerpt;
