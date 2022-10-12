import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

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
}) => {
  return (
    <Container component="main" maxWidth="xs" sx={{ alignItems: "center" }}>
      <Box
        sx={{
          marginTop: 8,
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
        <Avatar sx={{ m: 1, bgcolor: "primary.main", left: 170 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
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
            error={!validPassword}
          />
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
            disabled={!canSave}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? "Signing Up" : "Sign Up"}
          </Button>
          <Grid container>
            <Grid item>
              <Link href="login" variant="body2">
                {"Already have an Account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterComponent;
