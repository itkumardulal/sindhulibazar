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
const navItems = ["Home", "My Orders"];

function DrawerAppBar({ window, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const handleDropdownToggle = (dropdown) =>
    setOpenDropdown((prev) => (prev === dropdown ? "" : dropdown));

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
          {navItems.map((item) => {
            let emoji = "";
            let path = `/${item.replace(/\s+/g, "").toLowerCase()}`; // default path

            if (item === "Home") emoji = "🏠";
            else if (item === "My Orders") {
              emoji = "📝";
              path = "/myorders"; // specifically navigate to /allorders
            }

            return (
              <ListItem key={item} disablePadding sx={{ textAlign: "center" }}>
                <ListItemButton>
                  <span style={{ fontSize: 25, marginRight: 5 }}>{emoji}</span>
                  <Link
                    to={path}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={handleDrawerToggle}
                  >
                    <ListItemText primary={item} />
                  </Link>
                </ListItemButton>
              </ListItem>
            );
          })}

          {["stores", "services", "support"].map((category) => {
            const emojis = {
              stores: "🛒",
              services: "🔧",
              support: "💁‍♂️",
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
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            color: "#f15a02",
                          }}
                          onClick={handleDrawerToggle}
                        >
                          <ListItemText primary={text} />
                        </Link>
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>

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

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          background: "#ffffffff",
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              color: "#f15a02", // matches logo gradient start
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              width: { xs: "100%", sm: "25%" },
              position: "relative",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                color: "#f15a02",
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
                  maxWidth: "1200px",
                }}
              >
                SINDHULI BAZAR
              </Typography>
            </Link>
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              position: "relative",
              gap: 3, // spacing between nav items
              color: "#f15a02",
            }}
          >
            {/* Main nav items */}
            {navItems.map((item) => {
              let emoji = "";
              if (item === "Home") emoji = "🏠";
              else if (item === "My Orders") emoji = "📝";

              return (
                <ListItem
                  key={item}
                  sx={{ display: "inline-block", width: "auto" }}
                >
                  <ListItemButton
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#fff3e0",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Link
                      to={`/${item.replace(/\s+/g, "").toLowerCase()}`}
                      style={{
                        textDecoration: "none",
                        color: "#f15a02",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginRight: 5 }}>{emoji}</span>
                      <ListItemText primary={item} />
                    </Link>
                  </ListItemButton>
                </ListItem>
              );
            })}

            {/* Dropdown categories */}
            {["stores", "services", "support"].map((category) => (
              <ListItemButton
                key={category}
                onClick={() => handleDropdownToggle(category)}
                sx={{
                  display: "inline-block",
                  position: "relative",
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#fff3e0",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <ListItemText primary={capitalizeFirstLetter(category)} />
                <Box
                  sx={{
                    display: openDropdown === category ? "block" : "none",
                    position: "absolute",
                    top: "110%",
                    left: 0,
                    zIndex: 1200,
                    minWidth: "180px",
                    boxShadow: 4,
                    backgroundColor: "white",
                    borderRadius: 1,
                    transition: "all 0.3s ease",
                  }}
                >
                  <Paper elevation={3}>
                    <List>
                      {getDropdownItems(category).map(({ to, text }) => (
                        <ListItemButton
                          key={to}
                          sx={{
                            "&:hover": { backgroundColor: "#ffe0b2" },
                            px: 2,
                            py: 1,
                          }}
                        >
                          <Link
                            to={to}
                            style={{ textDecoration: "none", color: "#f15a02" }}
                          >
                            <ListItemText primary={text} />
                          </Link>
                        </ListItemButton>
                      ))}
                    </List>
                  </Paper>
                </Box>

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
          */}
        </Toolbar>
      </AppBar>

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

      {/* Fixed main content area with full width and no extra padding */}
      <Box component="main" sx={{ flexGrow: 1, width: "100%", p: 0 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

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
