import { Box, Paper, Typography, colors, Grid } from "@mui/material";
import React, { useState } from "react";
import DrawerAppBar from "../components/Navbar";

const About = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    alert("Message sent successfully");
  };

  const paperStyle = {
    height: "50vh",
    position: "relative",
    backgroundImage: `url(${process.env.PUBLIC_URL}/sindhuli.jpg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const paperStyle2 = {
    height: "50vh",
    position: "relative",
    backgroundImage: `url(${process.env.PUBLIC_URL}/startup.jpg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const paperStyle3 = {
    height: "50vh",
    position: "relative",
    backgroundImage: `url(${process.env.PUBLIC_URL}/delivery2.jpg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  };

  return (
    <DrawerAppBar>
      <Box sx={{ flexGrow: 1, mt: 5 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            backgroundColor: "orange",
            p: 2,
            mb: 2,
            maxWidth: 800,
            mx: "auto",
          }}
        >
          About Us
        </Typography>

        {/* Use Grid for better responsiveness */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Paper elevation={5} sx={paperStyle}>
              <div style={{ position: "relative" }}>
                <div style={overlayStyle}></div>
                <Box sx={{ position: "relative", p: { xs: 2, sm: 3 } }}>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "dark",
                      fontWeight: "bold",
                      textDecoration: "underline",
                    }}
                  >
                    Welcome to Sindhulibazar.com!
                  </Typography>
                  <Typography
                    sx={{ backgroundColor: "white", opacity: 0.7, mt: 2, p: 2 }}
                  >
                    At Sindhulibazar.com, we introduce an innovative solution to
                    meet your essential needs. We offer 24-hour delivery for
                    drinks and  food, Daytime delivery for groceries adn Herbal products ensuring
                    convenience and reliability.
                  </Typography>
                </Box>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Paper elevation={5} sx={paperStyle2}>
              <div style={{ position: "relative" }}>
                <div style={overlayStyle}></div>
                <Box sx={{ position: "relative", p: { xs: 2, sm: 3 } }}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", textDecoration: "underline" }}
                  >
                    Our Sindhuli Startup
                  </Typography>
                  <Typography
                    sx={{ backgroundColor: "white", opacity: 0.7, mt: 2, p: 2 }}
                  >
                    SindhuliBazar.com, founded by Nepal Leadership Technology,
                    offers high-quality products and services, from liquor and
                    groceries to vehicle rentals,second hand shop, food delivery
                    and emergency medicine supplies. And more are to come on the
                    way in updates.
                  </Typography>
                </Box>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Paper elevation={5} sx={paperStyle3}>
              <div style={{ position: "relative" }}>
                <div style={overlayStyle}></div>
                <Box sx={{ position: "relative", p: { xs: 2, sm: 3 } }}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", textDecoration: "underline" }}
                  >
                    Quality Products Delivered at Your Doorstep
                  </Typography>
                  <Typography
                    sx={{ backgroundColor: "white", opacity: 0.7, mt: 2, p: 2 }}
                  >
                    We provide a wide range of products: premium liquor, fresh
                    groceries, quick food delivery, and vehicle rentals within
                    sindhulimadhi. All are just a click away on
                    SindhuliBazar.com.
                  </Typography>
                </Box>
              </div>
            </Paper>
          </Grid>
        </Grid>

        {/* Customer Service Info */}
        <Box
          sx={{ textAlign: "center", backgroundColor: "orange", mt: 5, p: 2 }}
        >
          <Typography variant="h6" sx={{ color: "black" }}>
            CUSTOMER SERVICE: 9741667448 (Kumar Dulal)
          </Typography>
        </Box>
      </Box>
    </DrawerAppBar>
  );
};

export default About;
