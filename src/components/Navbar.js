import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import InstallAppBtn from "./InstallAppBtn";

const drawerWidth = 240;
const navItems = ["Home"];

function DrawerAppBar({ window, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");

  // Toggle the mobile drawer
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Toggle the dropdown menu
  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown((prevDropdown) =>
      prevDropdown === dropdown ? "" : dropdown
    );
  };

  // Drawer content for mobile view
  const drawer = (
    <Box
      sx={{
        textAlign: "center",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          my: 2.7,
          color: "#4CAF50",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            style={{ height: 50, width: 50, marginRight: "2px" }}
            src="https://i.imgur.com/d2BvVn5.png"
            alt="logo"
          />
          <Typography
            variant="h6"
            sx={{ fontSize: 15, color: "darkorange", fontWeight: 1000 }}
          >
            SINDHULI BAZAR
          </Typography>
        </div>
      </Typography>

      <Divider />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <List>
          {navItems.map((item) => (
            <ListItem key={item} disablePadding sx={{ textAlign: "center" }}>
              <ListItemButton>
                <span style={{ fontSize: 25, marginRight: 5 }}> 🏠</span>

                <Link
                  to={`/${item.toLowerCase()}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={handleDrawerToggle}
                >
                  <ListItemText primary={item} />
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
          {["stores", "services", "support"].map((category) => {
            // Define an emoji for each category
            const emojis = {
              stores: "🛒", // Shopping cart emoji for stores
              services: "🔧", // Wrench emoji for services
              support: "💁‍♂️", // Person tipping hand emoji for support
            };

            return (
              <React.Fragment key={category}>
                <ListItemButton onClick={() => handleDropdownToggle(category)}>
                  <ListItemText
                    primary={`${emojis[category]} ${capitalizeFirstLetter(
                      category
                    )}`}
                  />
                  {openDropdown === category ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={openDropdown === category}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {getDropdownItems(category).map(({ to, text }) => (
                      <ListItemButton key={to} sx={{ pl: 4 }}>
                        <Link
                          to={to}
                          style={{ textDecoration: "none", color: "inherit" }}
                          onClick={handleDrawerToggle}
                        >
                          <ListItemText primary={text} />
                        </Link>
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
                {/* Center InstallAppBtn right after support dropdown */}
                {category === "support" && (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", my: 2 }}
                  >
                    <InstallAppBtn drawerMode />
                  </Box>
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Box>
  );

  // Container for the drawer on mobile view
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "orange",
          // #FBA518
          // #E52020
          // #F9CB45
          // #d6da04f6
          background: "#e99308ff",
        }}
      >
        <Toolbar>
          {/* Menu icon for mobile view */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo and title centered in both desktop and mobile view */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center", // Center in both mobile and desktop view
              alignItems: "center",
              textAlign: "center",
              width: { xs: "100%", sm: "25%" }, // Take full width in mobile view
              position: "relative",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                style={{ height: 55, width: 55, marginRight: "1px" }}
                src="https://i.imgur.com/d2BvVn5.png"
                alt="logo"
              />
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: 20,
                  textTransform: "uppercase",
                  letterSpacing: 0.7,
                  background: "linear-gradient(90deg, #FFD700, #f15a02ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "1px 1px 2px rgba(155, 17, 17, 0.5)",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                SINDHULI BAZAR
              </Typography>
            </Link>
            {/* InstallAppBtn beside title, only on desktop/tablet */}
          </Typography>

          {/* Desktop view menu items */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexGrow: 1,
              alignItems: "center",
              position: "relative",
              width: "50%",
            }}
          >
            {navItems.map((item) => (
              <ListItem key={item} sx={{ display: "inline-block", width: 100 }}>
                <ListItemButton>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemText primary={item} />
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
            {["stores", "services", "support"].map((category) => (
              <ListItemButton
                key={category}
                onClick={() => handleDropdownToggle(category)}
                sx={{ display: "inline-block", position: "relative" }}
              >
                <ListItemText primary={capitalizeFirstLetter(category)} />
                {/* Dropdown menu for categories */}
                <Box
                  sx={{
                    display: openDropdown === category ? "block" : "none",
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    zIndex: 1200,
                    minWidth: "160px",
                    boxShadow: 3,
                    backgroundColor: "white",
                    borderRadius: 1,
                    mt: 1,
                  }}
                >
                  <Paper elevation={3}>
                    <List>
                      {getDropdownItems(category).map(({ to, text }) => (
                        <ListItemButton key={to}>
                          <Link
                            to={to}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <ListItemText primary={text} />
                          </Link>
                        </ListItemButton>
                      ))}
                    </List>
                  </Paper>
                </Box>
                {/* Arrow indicators for dropdown */}
                {openDropdown === category ? (
                  <ExpandLess
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                ) : (
                  <ExpandMore
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                )}
              </ListItemButton>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

// Capitalize the first letter of a string
const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

// Get dropdown items based on the category
const getDropdownItems = (category) => {
  const items = {
    support: [
      { to: "/about", text: "About Us" },
      { to: "/contact", text: "Contact Us" },
    ],
    stores: [
      { to: "/GroceryStore", text: "Grocery Store" },
      { to: "/LiquorStore", text: "Liquor Store" },
      { to: "/FoodStore", text: "Food Store" },
    ],
    services: [
      { to: "/VehicleStore", text: "Vehicle Renting" },
      { to: "/HerbalStore", text: "Herbal Store" },
      { to: "/SecondHandStore", text: "Second Hand Shop" },
    ],
  };
  return items[category] || [];
};

DrawerAppBar.propTypes = {
  window: PropTypes.func,
  children: PropTypes.node,
};

export default DrawerAppBar;
