import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import ConfirmModal from './ConfirmItem'
import WhatsAppMessageLink from './Whatsappme'
export default function ImgMediaCard({ data }) {
  const { name, image, description, price } = data
  const [open, setOpen] = React.useState(false)

  const [count, setCount] = useState(1)
  const deliverycharge = 100
  const [totalprice, setTotalPrice] = useState(0)


  const handleClickOpen = () => {
    setOpen(true)
  }

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }
  const handleClose = () => {
    setOpen(false)

    //   let tID = setTimeout(function () {
    //     window.location.href =
    //     "https://wa.me/+9779741667448"; //replace with your url
    //     window.clearTimeout(tID);// clear time out.
    // }, 5000);
  }

  return (
    <>
      <ConfirmModal open={open} setOpen={setOpen} handleClose={handleClose} />
      <Card sx={{ maxWidth: 345 }} elevation={5}>
        <CardMedia
        style={{paddingTop:5}}
          component='img'
          alt='green iguana'
          height='140'
          
          sx={{ objectFit: 'contain' }}
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
          <br />
          <Typography variant='title'>Rs. {price}</Typography>
        </CardContent>
        <CardActions>
          <Box sx={{ width: '100%' }}>
            {/* quantity of its set by users */}
          
            <Button
              sx={{ mr: 2 }}
              size='small'
              variant='outlined'
              onClick={decrement}
            >
              -
            </Button>

            <text>{count}</text>

            <Button
              sx={{ ml: 2 }}
              size='small'
              variant='outlined'
              onClick={increment}
            >
              +
            </Button>
            <p></p>
      

            <WhatsAppMessageLink orderDetails={{ name, price, count }} />
            <Button
              fullWidth
              size='medium'
              variant='outlined'
              onClick={handleClickOpen}
            >
              How to purchase?("खरीद कसरी गर्ने?)
            </Button>
            {/* <Button size="small">Learn More</Button> */}
          </Box>
        </CardActions>
      </Card>
    </>
  )
}

