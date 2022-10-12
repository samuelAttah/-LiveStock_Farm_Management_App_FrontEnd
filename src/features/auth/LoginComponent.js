import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const LoginComponent = ({
  handleSubmit,
  formData,
  handleChange,
  errors = {},
  fetchError,
  isLoading,
  canSave,
  togglePersist,
  persist,
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
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="username"
            autoFocus
            error={errors.username}
          />
          {errors?.username ? (
            <Typography component="h1" variant="h5">
              {" "}
              {errors?.username}
            </Typography>
          ) : null}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            value={formData.password}
            onChange={handleChange}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={errors.password}
          />
          {errors?.password ? (
            <Typography component="h1" variant="h5">
              {" "}
              {errors?.password}
            </Typography>
          ) : null}
          <FormControlLabel
            control={
              <Checkbox
                checked={persist}
                color="primary"
                onChange={togglePersist}
              />
            }
            label="Keep Me Logged In"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!canSave}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? "Signing In" : "Sign In"}
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginComponent;
