import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { NumericFormat } from "react-number-format";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CreateMortalityPageExcerpt = ({
  formData,
  handleSubmit,
  handleChange,
  fetchError,
  canSave,
  deathDate,
  setDeathDate,
  isLoading,
}) => {
  const materialUITextFieldProps = {
    id: "filled-multiline-flexible",
    label: "Number of Animals Dead",
    multiline: false,
    maxRows: 1,
    variant: "outlined",
    fullWidth: true,
    name: "numberDead",
    placeholder: "0",
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h3" variant="h5" sx={{ mt: 2 }}>
        Create New Mortality
      </Typography>
      <hr />
      {fetchError ? (
        <Typography sx={{ color: "red", fontSize: "small" }}>
          {fetchError}
        </Typography>
      ) : null}
      <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <Typography sx={{ textAlign: "left", mb: "10px" }}>
          Number of Animals Dead:
        </Typography>
        <NumericFormat
          value={formData.numberDead}
          customInput={TextField}
          name="numberDead"
          onChange={handleChange}
          {...materialUITextFieldProps}
        />

        <Typography sx={{ textAlign: "left", mt: "10px" }}>
          Reason For Death(s):
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          value={formData.deathReason}
          onChange={handleChange}
          id="deathReason"
          variant="outlined"
          label="Death Reason"
          required
          multiline
          rows={4}
          placeholder="e.g illness that caused the death(s)"
          name="deathReason"
          inputProps={{ maxLength: 300 }}
        />

        <Typography sx={{ textAlign: "left", my: "15px" }}>
          Death Date:
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disableFuture
            label="Date Death(s) occured"
            openTo="year"
            views={["year", "month", "day"]}
            value={deathDate}
            onChange={(newValue) => {
              setDeathDate(newValue);
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
          {isLoading ? "Creating Mortality..." : "Create"}
        </Button>
      </Box>
    </Container>
  );
};

export default CreateMortalityPageExcerpt;
