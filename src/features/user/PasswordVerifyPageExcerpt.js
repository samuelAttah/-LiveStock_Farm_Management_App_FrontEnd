import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";

const PasswordVerifyPageExcerpt = ({
  fetchError,
  handleSubmit,
  isLoading,
  canSave,
  password,
  handleChange,
}) => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingY: 15,
        }}
      >
        {fetchError ? (
          <Typography
            component="h6"
            variant="h6"
            sx={{ color: "red", fontSize: 15, fontFamily: "cursive" }}
          >
            {fetchError}
          </Typography>
        ) : null}
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h6" variant="h6">
          Enter Current Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            value={password}
            onChange={handleChange}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            // error={errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!canSave || isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PasswordVerifyPageExcerpt;
