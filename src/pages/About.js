import { Box, Paper, Typography, colors } from '@mui/material'
import React, { useState, useEffect } from 'react'
import DrawerAppBar from '../components/Navbar'

// WhatsAppMessageLink

const About = () => {
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    alert('Message sent successfull')
  }

  const paperStyle = {

    height: '50vh',
    position: 'relative',
    backgroundImage: `url(${process.env.PUBLIC_URL}/sindhuli.jpg)`,
    backgroundSize: 'cover',
  }

  const paperStyle2 = {
    height: '50vh',
    position: 'relative',
    backgroundImage: `url(${process.env.PUBLIC_URL}/startup.jpg)`,
    backgroundSize: 'cover',
  }

  const paperStyle3 = {
    height: '50vh',
    position: 'relative',
    backgroundImage: `url(${process.env.PUBLIC_URL}/delivery2.jpg)`,
    backgroundSize: 'cover',
  }

  const overlayStyle = {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Adjust the opacity of the overlay
    height: '50vh', // Set the height of the overlay to 50% of the parent (Paper) component
  }
  return (
    <DrawerAppBar>
      <div>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 2,
            widows: '100%',
            flexDirection: 'column',
            alignContent: 'center',
          }}
          mt={5}
        >
          <text
            style={{
              width: '90%',
              fontSize: 22,
              backgroundColor: 'orange',
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
              width: '90%',
              fontSize: 25,
              padding: 10,
              maxWidth: 800,
              fontWeight: 'normal',
              marginTop: 10,
            }}
          >
            <Paper elevation={5} sx={paperStyle}>
              <div style={{ position: 'relative' }}>
                <div style={overlayStyle}></div>
                <div>
                  <Typography
                    fontSize={{ sm: 20, lg: 35 }}
                    sx={{
                      fontWeight: 'bold',
                      pt: 5,
                      color: 'dark',
                      textDecoration:"underline"
                    }}
                  >
                    Welcome to Sindhuli Liquor Express!
                  </Typography>
                  <br />
                  <Typography
                    fontSize={{ xs: 10, sm: 20 }}
                    p={{ sm: 1, md: 5 }}
                    sx={{
                      fontWeight: 'bold',
                      color: 'black',
                      backgroundColor:"white",
                      padding:2,
                      opacity:"40%"
                    }}
                  >
                    At Sindhuli Liquor Express, we are proud to introduce an
                    innovative solution to meet your liquor needs. We understand
                    that convenience and reliability are essential when it comes
                    to purchasing your favorite drinks. That's why we've
                    embarked on this exciting journey to bring the liquor store
                    right to your doorstep, with the added promise of 24-hour
                    delivery service.
                  </Typography>
                </div>
              </div>
            </Paper>

            <br />

            <Paper elevation={5} sx={paperStyle2}>
              <div style={{ position: 'relative' }}>
                <div style={overlayStyle}></div>
                <div>
                  <Typography
                    fontSize={{ sm: 20, lg: 35 }}
                    sx={{
                      fontWeight: 'bold',
                      pt: 7,
                      padding:2,
                      textDecoration:"underline"
                   
                    }}
                  >
                    Our Sindhuli Startup
                  </Typography>
                  <br />
                  <Typography
                    fontSize={{ xs: 10, sm: 20 }}
                    p={{ sm: 1, md: 5 }}
                    sx={{
                      fontWeight: 'bold',
                      color: 'black',
                      backgroundColor:"white",
                      padding:2,
                      opacity:"40%"
                    }}
                  >
                    Founded by a dynamic group of entrepreneurs - Kumar Dulal,
                    BishowNath Thapa and Sameer Dhakal, Sindhuli
                    Liquor Express is a testament to our shared vision of making
                    quality liquors easily accessible to the vibrant community
                    of Sindhuli. As locals, we are deeply committed to the
                    people and culture of this region. Our startup reflects our
                    dedication to providing a reliable and efficient service
                    that aligns with the unique lifestyle of Sindhuli.
                  </Typography>
                </div>
              </div>
            </Paper>

            <br />

            <Paper elevation={5} sx={paperStyle3}>
              <div style={{ position: 'relative' }}>
                <div style={overlayStyle}></div>
                <div>
                  <Typography
                    fontSize={{ sm: 20, lg: 35 }}
                    sx={{
                      fontWeight: 'bold',
                      pt: 5,
                      textDecoration:"underline",
                      padding:2,
                      
                    }}
                  >
                    Quality Liquor, Delivered at Your Doorstep
                  </Typography>
                  <br />
                  <Typography
                    fontSize={{ xs: 10, sm: 20 }}
                    p={{ sm: 1, md: 5 }}
                    sx={{
                      fontWeight: 'bold',
                      color: 'black',
                      backgroundColor:"white",
                      padding:1,
                      opacity:"40%"
                    }}
                  >
                    We take pride in offering an extensive range of liquors,
                    from premium spirits to popular brands. Our goal is to
                    provide a diverse selection to cater to your preferences.
                    With our 24-hour delivery service, you can now enjoy your
                    favorite beverages without leaving the comfort of your home.
                    Sindhuli Liquor Express is not just a service; it's a
                    commitment to exceptional customer experience. Join us on
                    this exciting journey, and let us raise a glass to
                    convenience and quality in Sindhuli!
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
        sx={{ background: 'orange', p: 1, margin: 'auto' }}
      >
        <Typography
          fontSize={{ xs: 10, sm: 17 }}
          style={{ color: 'black', margin: 10 }}
        >
          CUSTOMER SERVICE: 9741667448 (Kumar Dulal)
        </Typography>
      </Box>
    </DrawerAppBar>
  )
}

export default About
