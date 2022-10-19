import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { toast } from "react-toastify";
import Main from "./Main";
import AppBar from "./AppBar";
import DrawerHeader from "./DrawerHeader";
import ExpandMore from "./ExpandMore";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { useGetBatchesQuery } from "../../features/batches/batchApiSlice";
import { useGetUserDetailQuery } from "../../features/user/userApiSlice";

const drawerWidth = 240;

export default function DashBoardLayout() {
  const [logout] = useSendLogoutMutation();

  const [expanded, setExpanded] = React.useState(false);
  const [settingsExpanded, setSettingsExpanded] = React.useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
      console.log(error?.data?.message ?? "Failed to Log out");
    }
  };

  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };

  const handleSettingsExpandClick = () => {
    setSettingsExpanded((prev) => !prev);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfile = () => {
    navigate("/dashboard/userdetails");
    setAnchorElUser(null);
  };

  const handleDashboard = () => {
    navigate("/dashboard");
    setAnchorElUser(null);
  };

  //RTK CUSTOM HOOKS
  const { data: batches = {}, isSuccess } = useGetBatchesQuery("batchesList", {
    refetchOnMountOrArgChange: true,
  });

  const fetchedBatches = Object.keys(batches)?.length
    ? batches?.ids.map((id) => {
        return batches?.entities[id];
      })
    : [];

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

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: "space-between", display: "flex" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Farm Diary
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
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
                  <AccountCircleSharpIcon fontSize="large" color="secondary" />
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
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleExpandClick}>
              <ListItemIcon>
                <WorkspacesIcon />
              </ListItemIcon>
              <ListItemText primary={"Batches"} />
            </ListItemButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </ListItem>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {isSuccess && fetchedBatches?.length > 10
              ? fetchedBatches
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 10)
                  .map((batch) => (
                    <ListItem key={batch.id} disablePadding>
                      <ListItemButton
                        onClick={() => navigate(`/batch/${batch.id}`)}
                      >
                        <ListItemText primary={batch.batchTitle} />
                      </ListItemButton>
                    </ListItem>
                  ))
              : isSuccess && fetchedBatches?.length <= 10
              ? fetchedBatches
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((batch) => (
                    <ListItem key={batch.id} disablePadding>
                      <ListItemButton
                        onClick={() => navigate(`/batch/${batch.id}`)}
                      >
                        <ListItemText primary={batch.batchTitle} />
                      </ListItemButton>
                    </ListItem>
                  ))
              : null}
          </Collapse>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/dashboard/userdetails")}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={handleSettingsExpandClick}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Settings"} />
            </ListItemButton>
            <ExpandMore
              expand={settingsExpanded}
              onClick={handleSettingsExpandClick}
              aria-expanded={settingsExpanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </ListItem>
          <Collapse in={settingsExpanded} timeout="auto" unmountOnExit>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/dashboard/verifycurrentpassword")}
              >
                <ListItemText primary={"Password Reset"} />
              </ListItemButton>
            </ListItem>
          </Collapse>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => navigate("/dashboard/documentation")}
            >
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary={"App Manual"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <PowerSettingsNewIcon />
              </ListItemIcon>
              <ListItemText primary={"Log Out"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
        <Box paddingBottom={15} />
        <Footer />
      </Main>
    </Box>
  );
}

// <Box sx={{ flexGrow: 0 }}>
// <Tooltip title="Log Out">
//   <IconButton
//     sx={{ p: 0, backgroundColor: "grey" }}
//     color="secondary"
//     onClick={handleLogout}
//   >
//     <LogoutSharpIcon fontSize="medium" />
//   </IconButton>
// </Tooltip>
// </Box>
