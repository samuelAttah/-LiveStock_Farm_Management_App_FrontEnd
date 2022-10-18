import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";
import orange from "@mui/material/colors/orange";
import green from "@mui/material/colors/green";
import red from "@mui/material/colors/red";
import { Box } from "@mui/material";

const BatchNavComponent = ({ batch }) => {
  const activeStyle = { color: orange[700] };
  const expensesActiveStyle = { color: "black" };
  return (
    <Box paddingBottom={15}>
      <Grid
        container
        flexDirection="row"
        position="absolute"
        bottom={130}
        // columnSpacing={1}
      >
        <Grid
          item
          xs={2.2}
          md={1.5}
          sx={{
            backgroundColor: red[300],
            borderRadius: "100px",
          }}
        >
          <NavLink
            to={`/batch/${batch.id}/feeds`}
            style={({ isActive }) => (isActive ? expensesActiveStyle : null)}
          >
            Feeding
          </NavLink>
        </Grid>

        <Grid
          item
          xs={2.2}
          md={1.5}
          sx={{ backgroundColor: red[300], borderRadius: "100px" }}
        >
          <NavLink
            to={`/batch/${batch.id}/mortalities`}
            style={({ isActive }) => (isActive ? expensesActiveStyle : null)}
          >
            Mortalities
          </NavLink>
        </Grid>
        <Grid
          item
          xs={2.2}
          md={1.5}
          sx={{ backgroundColor: red[300], borderRadius: "100px" }}
        >
          <NavLink
            to={`/batch/${batch.id}/housings`}
            style={({ isActive }) => (isActive ? expensesActiveStyle : null)}
          >
            Housings
          </NavLink>
        </Grid>
        <Grid
          item
          xs={2.2}
          md={1.5}
          sx={{ backgroundColor: red[300], borderRadius: "100px" }}
        >
          <NavLink
            to={`/batch/${batch.id}/drugs`}
            style={({ isActive }) => (isActive ? expensesActiveStyle : null)}
          >
            Drugs
          </NavLink>
        </Grid>
        <Grid
          item
          xs={2.2}
          md={1.5}
          sx={{ backgroundColor: red[300], borderRadius: "100px" }}
        >
          <NavLink
            to={`/batch/${batch.id}/otherexpenses`}
            style={({ isActive }) => (isActive ? expensesActiveStyle : null)}
          >
            Other Expenses
          </NavLink>
        </Grid>
        <Grid
          item
          xs={2.2}
          md={1.5}
          sx={{ backgroundColor: green[200], borderRadius: "100px" }}
        >
          <NavLink
            to={`/batch/${batch.id}/animalsales`}
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Animal Sales
          </NavLink>
        </Grid>
        <Grid
          item
          xs={2.2}
          md={1.5}
          sx={{ backgroundColor: green[200], borderRadius: "100px" }}
        >
          <NavLink
            to={`/batch/${batch.id}/revenues`}
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Other Revenues
          </NavLink>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BatchNavComponent;
