import { Box, Paper, Typography, colors } from "@mui/material";
import React, { useState, useEffect } from "react";
import DrawerAppBar from "../components/Navbar";

// WhatsAppMessageLink

const About = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    alert("Message sent successfull");
  };

  const paperStyle = {
    height: "50vh",
    position: "relative",
    backgroundImage: `url(${process.env.PUBLIC_URL}/sindhuli.jpg)`,
    backgroundSize: "cover",
  };

  const paperStyle2 = {
    height: "50vh",
    position: "relative",
    backgroundImage: `url(${process.env.PUBLIC_URL}/startup.jpg)`,
    backgroundSize: "cover",
  };

  const paperStyle3 = {
    height: "50vh",
    position: "relative",
    backgroundImage: `url(${process.env.PUBLIC_URL}/delivery2.jpg)`,
    backgroundSize: "cover",
  };

  const overlayStyle = {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Adjust the opacity of the overlay
    height: "50vh", // Set the height of the overlay to 50% of the parent (Paper) component
  };
  return (
    <DrawerAppBar>
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 2,
            widows: "100%",
            flexDirection: "column",
            alignContent: "center",
          }}
          mt={5}
        >
          <text
            style={{
              width: "90%",
              fontSize: 22,
              backgroundColor: "orange",
              padding: 10,
              maxWidth: 800,
              marginTop: 10,
              height: 60,
            }}
          >
            About Us
          </text>
          <text
            style={{
              width: "90%",
              fontSize: 25,
              padding: 10,
              maxWidth: 800,
              fontWeight: "normal",
              marginTop: 10,
            }}
          >
            <Paper elevation={5} sx={paperStyle}>
              <div style={{ position: "relative" }}>
                <div style={overlayStyle}></div>
                <div>
                  <Typography
                    fontSize={{ sm: 20, lg: 35 }}
                    sx={{
                      fontWeight: "bold",
                      pt: 5,
                      color: "dark",
                      textDecoration: "underline",
                    }}
                  >
                    Welcome to Sindhulibazar.com!
                  </Typography>
                  <br />
                  <Typography
                    fontSize={{ xs: 10, sm: 20 }}
                    p={{ sm: 1, md: 5 }}
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                      backgroundColor: "white",
                      padding: 2,
                      opacity: "40%",
                    }}
                  >
                    At sindhulibazar.com, we are proud to introduce an
                    innovative solution to meet all your essential needs. We
                    understand that convenience and reliability are crucial when
                    it comes to purchasing your favorite drinks, groceries,
                    food, and vehicle rentals. That is why we have  embarked on this
                    exciting journey to bring everything right to your doorstep,
                    all with the added promise of 24-hour delivery.
                  </Typography>
                </div>
              </div>
            </Paper>

            <br />

            <Paper elevation={5} sx={paperStyle2}>
              <div style={{ position: "relative" }}>
                <div style={overlayStyle}></div>
                <div>
                  <Typography
                    fontSize={{ sm: 20, lg: 35 }}
                    sx={{
                      fontWeight: "bold",
                      pt: 7,
                      padding: 2,
                      textDecoration: "underline",
                    }}
                  >
                    Our Sindhuli Startup
                  </Typography>
                  <br />
                  <Typography
                    fontSize={{ xs: 10, sm: 20 }}
                    p={{ sm: 1, md: 5 }}
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                      backgroundColor: "white",
                      padding: 2,
                      opacity: "40%",
                    }}
                  >
                    SindhuliBazar.com, founded by Nepal Leadership Technology,
                    aims to create an accessible platform offering essential
                    services for the Sindhuli community. We provide high-quality
                    products and services, including liquors, groceries, food
                    delivery, vehicle rentals, and emergency medicine supplies,
                    all rooted in local culture.
                    <br />
                    As locals, we understand the unique lifestyle of Sindhuli
                    and strive to enhance daily life by delivering reliable
                    solutions that integrate seamlessly into the community. Our
                    platform serves as a bridge between tradition and modernity,
                    supporting health and convenience while honoring our
                    cultural heritage.
                    <br />
                    Looking ahead, we plan to expand our offerings to include
                    emergency medicine services, Chakmake Pathao Express,
                    Sindhuli Patho Express, a second-hand shop, and real estate
                    services to further meet the evolving needs of our
                    community.
                  </Typography>
                </div>
              </div>
            </Paper>

            <br />

            <Paper elevation={5} sx={paperStyle3}>
              <div style={{ position: "relative" }}>
                <div style={overlayStyle}></div>
                <div>
                  <Typography
                    fontSize={{ sm: 20, lg: 35 }}
                    sx={{
                      fontWeight: "bold",
                      pt: 5,
                      textDecoration: "underline",
                      padding: 2,
                    }}
                  >
                    Quality Products Delivered at Your Doorstep
                  </Typography>
                  <br />
                  <Typography
                    fontSize={{ xs: 10, sm: 20 }}
                    p={{ sm: 1, md: 5 }}
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                      backgroundColor: "white",
                      padding: 1,
                      opacity: "40%",
                    }}
                  >
                    At SindhuliBazar.com, we pride ourselves on providing a
                    comprehensive range of services to meet your essential
                    needs:
                    <br />
                    Liquor: Enjoy a diverse selection of premium spirits and
                    popular brands with our 24-hour delivery service, bringing
                    your favorite beverages right to your doorstep.
                    <br />
                    Groceries: Access fresh and quality grocery products
                    conveniently online, with a focus on supporting local
                    suppliers.
                    <br />
                    Food Delivery: Satisfy your cravings with our food delivery
                    service, offering a variety of cuisines from local
                    restaurants delivered quickly to your home.
                    <br />
                    Vehicle Rentals: Our vehicle rental service provides
                    convenient transportation solutions for personal trips,
                    events, or business needs.
                    <br />
                    Join us on this exciting journey as we raise a glass to
                    convenience and quality in Sindhuli. With SindhuliBazar.com,
                    you can count on us for all your liquor, grocery, food
                    delivery, and vehicle rental needs!
                  </Typography>
                </div>
              </div>
            </Paper>
          </text>
          {/* add text here */}
        </Box>
      </div>

      <Box
        width={{ sm: 50, md: 100, lg: 500, xl: 1000 }}
        sx={{ background: "orange", p: 1, margin: "auto" }}
      >
        <Typography
          fontSize={{ xs: 10, sm: 17 }}
          style={{ color: "black", margin: 10 }}
        >
          CUSTOMER SERVICE: 9741667448 (Kumar Dulal)
        </Typography>
      </Box>
    </DrawerAppBar>
  );
};

export default About;
