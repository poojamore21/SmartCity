import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";
import apiRequest from "../lib/apiRequest";

const pages = [
  "Home",
  "Administrator",
  "Users",
  "Registration",
  "View Info",
  "Logout",
  "Add Places",
  "Place Details",
  "Student",
  "Businessman",
  "Jobs",
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    updateUser(null);
    navigate("/");

    const response = apiRequest.post("/auth/logout", {
      email: currentUser.email,
    });
  };

  const renderUserAvatar = () => {
    if (currentUser && currentUser.name) {
      const firstLetter = currentUser.name.charAt(0).toUpperCase();
      return <Avatar>{firstLetter}</Avatar>;
    }
    return null;
  };

  const renderButton = (to, label) => (
    <Button
      key={label}
      onClick={handleCloseNavMenu}
      component={Link}
      to={to}
      sx={{
        my: 2,
        color: "white",
        display: "block",
        backgroundColor:
          location.pathname === to ? "rgba(255, 255, 255, 0.2)" : "transparent",
        border: location.pathname === to ? "1px solid white" : "none",
        borderRadius: "4px",
      }}
    >
      {label}
    </Button>
  );

  const mainNavItems = () => {
    if (currentUser) {
      if (currentUser.role === "ADMIN") {
        return (
          <>
            {/* {renderButton("/", "Home")} */}
            {renderButton("/admin/createplace", "Add Places")}
            {renderButton("/admin/updatecaurosel", "caurosel")}
            {renderButton("/admin/placedetails", "Place Details")}
            {renderButton("/admin/addstudent", "Student")}
            {renderButton("/admin/addbussiness", "Businessman")}
            {renderButton("/admin/allusers", "Manage Users")}
            {renderButton("/admin/jobs", "Jobs")}
            <Button
              onClick={handleLogout}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Logout
            </Button>
            <Box m={2} mr={2}>
              {renderUserAvatar()}
            </Box>
          </>
        );
      } else {
        if (currentUser.role === "TOURIST") {
          return (
            <>
              {/* {renderButton("/", "Home")} */}
              {renderButton("/tourist/viewinfo", "View Info")}
              <Button
                onClick={handleLogout}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Logout
              </Button>
              <Box m={2} mr={2}>
                {renderUserAvatar()}
              </Box>
            </>
          );
        } else if (currentUser.role === "STUDENT") {
          return (
            <>
              {/* {renderButton("/", "Home")} */}
              {renderButton("/student/sviewinfo", "View Info")}
              <Button
                onClick={handleLogout}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Logout
              </Button>
              <Box m={2} mr={2}>
                {renderUserAvatar()}
              </Box>
            </>
          );
        } else if (currentUser.role === "JOB_SEEKERS") {
          return (
            <>
              {/* {renderButton("/", "Home")} */}
              {renderButton("/jobseeker/jviewinfo", "View Info")}
              <Button
                onClick={handleLogout}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Logout
              </Button>
              <Box m={2} mr={2}>
                {renderUserAvatar()}
              </Box>
            </>
          );
        } else if (currentUser.role === "BUSINESSMAN") {
          return (
            <>
              {/* {renderButton("/", "Home")} */}
              {renderButton("/bussinessman/bviewinfo", "View Info")}
              <Button
                onClick={handleLogout}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Logout
              </Button>
              <Box m={2} mr={2}>
                {renderUserAvatar()}
              </Box>
            </>
          );
        }
      }
    } else {
      return pages.slice(0, 4).map((page) => {
        const to =
          page === "Home"
            ? "/"
            : page === "Users"
            ? "/users"
            : page === "Administrator"
            ? "/administrator"
            : `/${page.toLowerCase().replace(" ", "")}`;
        return renderButton(to, page);
      });
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            {mainNavItems()}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
