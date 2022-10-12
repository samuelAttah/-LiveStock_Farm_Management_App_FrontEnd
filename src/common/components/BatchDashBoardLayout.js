import { useState, useEffect } from "react";
import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Tooltip from "@mui/material/Tooltip";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import { toast } from "react-toastify";
import AppBar from "./AppBar";
import DrawerHeader from "./DrawerHeader";
import Main from "./Main";

import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { useGetBatchesQuery } from "../../features/batches/batchApiSlice";
import BatchNavComponent from "./BatchNavComponent";

const drawerWidth = 240;

export default function PersistentDrawerLeft() {
  const { batchId } = useParams();

  const [batch, setBatch] = useState({});
  const [stateError, setStateError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { fetchedBatch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      fetchedBatch: data?.entities[batchId],
    }),
  });

  useEffect(() => {
    setLoading(true);
    if (fetchedBatch) {
      setBatch(fetchedBatch);
      setStateError(false);

      setLoading(false);
      console.log("dasboardbatch", fetchedBatch);
    } else {
      setStateError(true);
      setLoading(false);
    }
    return () => setStateError(false);
  }, [fetchedBatch]);

  const [logout] = useSendLogoutMutation();

  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

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
      console.log(error);
    }
  };

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
            <Tooltip title="Log Out">
              <IconButton
                sx={{ p: 0, backgroundColor: "grey" }}
                color="secondary"
                onClick={handleLogout}
              >
                <LogoutSharpIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
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
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {batch && !stateError ? <Outlet /> : null}
        {!loading && stateError ? <p>Batch Does not exist</p> : null}
        {batch && !stateError ? <BatchNavComponent batch={batch} /> : null}
        <Box paddingBottom={15} />
        <Footer />
      </Main>
    </Box>
  );
}

export function useBatch() {
  return useOutletContext();
}
