import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import DrawerAppBar from '../components/Navbar'

const Contact = () => {
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    alert('Message sent successfull')
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
            maxWidth: '100%',
          }}
          mt={5}
        >
          <text
            style={{
              width: '90%',
              fontSize: 20,
              backgroundColor: 'orange',
              padding: 10,
              maxWidth: 800,
            }}
          >
            CONTACT US
          </text>

          {/* add text here */}
        </Box>
      </div>

      <div
        style={{
          height: '50vh',
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 10,

          width: '50%',
          margin: 'auto',
        }}
      >
        <Paper
          elevation={5}
          sx={{ mt: { xs: 20, sm: 5 }, p: 5, width: { xs: 320, lg: 800 } }}
        >
          <Typography
            style={{
              fontFamily: 'monospace',
              fontSize: 17,
              color: 'red',
              fontWeight: 500,
            }}
          >
            CUSTOMER SERVICE: 9741667448 (Kumar Dulal)
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              onChange={(e) => setFullName(e.target.value)}
              placeholder='Full name'
              type='text'
              name='name'
              sx={{ m: 2 }}
            />
            <TextField
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder='Phone number'
              type='number'
              name='phonenumber'
              sx={{ m: 2 }}
            />
            <TextField
              onChange={(e) => setMessage(e.target.value)}
              placeholder='write your message here.....'
              message='text'
              name='message'
              sx={{ m: 2 }}
            />
          </Box>
          <Button
            style={{
              width: '100%',
              height: 60,
              textAlign: 'center',

              backgroundColor: 'lightblue',
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Paper>
      </div>
    </DrawerAppBar>
  )
}

export default Contact
