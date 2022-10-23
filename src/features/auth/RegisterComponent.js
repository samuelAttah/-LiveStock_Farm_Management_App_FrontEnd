import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const RegisterComponent = ({
  handleSubmit,
  formData,
  handleChange,
  errors = {},
  fetchError,
  isLoading,
  canSave,
  validEmail,
  validPassword,
  validUsername,
  showPassword,
  handleShowPassword,
}) => {
  return (
    <Container component="main" maxWidth="xs" sx={{ alignItems: "center" }}>
      <Box
        sx={{
          marginTop: 8,
          paddingTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
          Sign Up
        </Typography>
      </Box>
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
          error={!validUsername}
        />
        {errors?.username ? (
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "red", fontSize: 15, fontFamily: "cursive" }}
          >
            {errors?.username}
          </Typography>
        ) : null}
        {!validUsername ? (
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "red", fontSize: 15, fontFamily: "cursive" }}
          >
            {" "}
            {`[3-20 letters]`}
          </Typography>
        ) : null}
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          error={!validEmail}
        />
        {errors?.email ? (
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "red", fontSize: 15, fontFamily: "cursive" }}
          >
            {errors?.email}
          </Typography>
        ) : null}
        {!validEmail ? (
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "red", fontSize: 15, fontFamily: "cursive" }}
          >
            {" "}
            {`[incl. a-z@.domain]`}
          </Typography>
        ) : null}

        <FormControl variant="outlined" fullWidth sx={{ mt: 1 }}>
          <InputLabel
            htmlFor="password"
            color={errors.password || !validPassword ? "error" : "primary"}
          >
            Password
          </InputLabel>
          <OutlinedInput
            required
            fullWidth
            name="password"
            value={formData.password}
            onChange={handleChange}
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            error={!validPassword}
          />
        </FormControl>
        {errors?.password ? (
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "red", fontSize: 15, fontFamily: "cursive" }}
          >
            {errors?.password}
          </Typography>
        ) : null}
        {!validPassword ? (
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "red", fontSize: 15, fontFamily: "cursive" }}
          >
            {" "}
            {`[8-25 chars incl. !@#$%]`}
          </Typography>
        ) : null}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!canSave || !validEmail || !validPassword || !validUsername}
          sx={{ mt: 3, mb: 2 }}
        >
          {isLoading ? "Signing Up" : "Sign Up"}
        </Button>
        <Grid container>
          <Grid item xs={12} md={12}>
            <Link href="login" variant="body2">
              {"Already have an Account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default RegisterComponent;
