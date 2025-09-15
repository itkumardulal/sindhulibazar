import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import DrawerAppBar from "../components/Navbar";
import Servicesbtn from "../components/homepagecom/Servicesbtn";

const Contact = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    alert("Message sent successfully");
  };

  return (
    <DrawerAppBar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          mt: 5,
          px: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            backgroundColor: "orange",
            padding: 2,
            width: "100%",
            textAlign: "center",
            fontWeight: "bold",
            color: "white",
          }}
        >
          CONTACT US
        </Typography>
      </Box>

      <Box
        sx={{
          height: { xs: "auto", sm: "auto", md: "50vh" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: 2, sm: 4, md: 6 },
          mt: 4,
        }}
      >
        <Paper
          elevation={5}
          sx={{
            width: { xs: "100%", sm: 400, md: 600, lg: 800 },
            padding: { xs: 3, sm: 4 },
            mt: { xs: 3, sm: 5 },
            mb: { xs: 3, sm: 5 },
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontFamily: "monospace",
              fontSize: 17,
              color: "red",
              fontWeight: 500,
              textAlign: "center",
              mb: 2,
            }}
          >
            CUSTOMER SERVICE: 9741667448 (Kumar Dulal)
          </Typography>

          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              type="number"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Your Message"
              variant="outlined"
              multiline
              rows={4}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{
                backgroundColor: "lightblue",
                color: "black",
                ":hover": {
                  backgroundColor: "blue",
                  color: "white",
                },
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>
    </DrawerAppBar>
  );
};

export default Contact;
