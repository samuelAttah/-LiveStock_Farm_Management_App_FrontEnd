import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AutoStoriesSharpIcon from "@mui/icons-material/AutoStoriesSharp";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { useGetUserDetailQuery } from "../../features/user/userApiSlice";

const Header = () => {
  //Get Access Token from state
  const accessToken = useSelector(selectCurrentToken);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [logout] = useSendLogoutMutation();

  const navigate = useNavigate();

  const {
    data: userDetails = {},
    // isError,
    // isLoading,
    // error,
  } = useGetUserDetailQuery("userList", {
    refetchOnMountOrArgChange: true,
  });

  const arrayOfUserDetails = Object.keys(userDetails)?.length
    ? userDetails?.ids.map((id) => {
        return userDetails?.entities[id];
      })
    : [];

  const singleUserDetail = arrayOfUserDetails?.[0];

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      toast.success("LogOut Success", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleHome = () => {
    navigate("/");
    setAnchorElNav(null);
  };

  const handleContact = () => {
    navigate("/contact");
    setAnchorElNav(null);
  };

  const handleAbout = () => {
    navigate("/about");
    setAnchorElNav(null);
  };

  const handleLogin = () => {
    navigate("/login");
    setAnchorElNav(null);
  };

  const handleSignup = () => {
    navigate("/register");
  };

  const handleProfile = () => {
    navigate("/dashboard/userdetails");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <AutoStoriesSharpIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            fontSize="large"
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Farm Diary
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleHome}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem onClick={handleAbout}>
                <Typography textAlign="center">About</Typography>
              </MenuItem>
              <MenuItem onClick={handleContact}>
                <Typography textAlign="center">Contact</Typography>
              </MenuItem>

              {accessToken ? (
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleLogin}>
                  <Typography textAlign="center">Log In</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <AutoStoriesSharpIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Farm Diary
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleHome}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
            <Button
              onClick={handleAbout}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About
            </Button>
            <Button
              onClick={handleContact}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Contact
            </Button>
            {accessToken ? (
              <Button
                onClick={handleLogout}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                LogOut
              </Button>
            ) : (
              <Button
                onClick={handleLogin}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Log In
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {accessToken ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {singleUserDetail?.profilePicture ? (
                      <Box
                        borderRadius={100}
                        sx={{ backgroundColor: "whitesmoke" }}
                        paddingX={1}
                        paddingY={0.5}
                      >
                        <img
                          src={singleUserDetail?.profilePicture}
                          alt="Profile_Picture"
                          height={25}
                          width={25}
                        />
                      </Box>
                    ) : (
                      <AccountCircleSharpIcon
                        fontSize="large"
                        color="secondary"
                      />
                    )}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleProfile}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleDashboard}>
                    <Typography textAlign="center"> Dashboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center"> Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                onClick={handleSignup}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                SIGN UP
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
