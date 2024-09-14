import { CommentSharp, Numbers } from '@mui/icons-material'
import { Button } from '@mui/material'
import React,{useEffect, useState} from 'react'

const WhatsAppMessageLink = ({ orderDetails }) => {
  const totalCost = orderDetails.count * orderDetails.price + 150
  const [currentShift, setCurrentShift] = useState('');
  const [admin, setAdmin] = useState('');

    const currentHour = new Date().getHours();
    const dayShiftStart = 8;
    const dayShiftEnd = 17;

    // Assuming night shift starts after day shift
   
useEffect(()=>{
  const nightShiftStart = dayShiftEnd;
  const nightShiftEnd = 8;
  if (currentHour >= dayShiftStart && currentHour < dayShiftEnd) {
    setCurrentShift('Day Shift');
    setAdmin(+9779703782444)
    
 
    
  } else if (currentHour >= nightShiftStart || currentHour < nightShiftEnd) {
    setCurrentShift('Night Shift');
    setAdmin(+9779703782444)
   
    // setAdmin(+9779741667448)
  
  } else {
    setCurrentShift('Outside of Day and Night Shifts');
    setAdmin(+9779703782444)
  }
})

    // if (currentShift==="Day Shift"){
    //   setAdmin(+9779741667448)
    // }
    // else{
    //   setAdmin(+9779825880900)
    // }

  // Replace 'YOUR_PHONE_NUMBER' with your actual phone number, including the country code.
  const phoneNumber = 'YOUR_PHONE_NUMBER'
  // Replace 'YOUR_MESSAGE' with the default message you want to include.
  const defaultMessage = 'Hello, This is my order details!'

  const generateWhatsAppLink = () => {
    const url = `https://api.whatsapp.com/send?phone=${admin}&text=${encodeURIComponent(
      defaultMessage +
        '  ' +
        '##itemName: ' +
        orderDetails.name +
        '  ' +
        '##Price per piece: ' +
        orderDetails.price +
        ' ' +
        '##quantity: ' +
        orderDetails.count +
        '##Delivery Charge:Rs.' +
        150 +
        '##total price:' +
        totalCost
    )}`
    return url
  }

  return (
    <div>
      {/* <p>Click the button below to send me a WhatsApp message:</p> */}
      <a
        href={generateWhatsAppLink()}
        target='_blank'
        rel='noopener noreferrer'
      >
        {/* <Button fullWidth size="medium" variant='outlined' onClick={handleClickOpen}>Buy</Button> */}
        <Button sx={{ mb: 2 }} fullWidth size='medium' variant='outlined'>
          ORDER NOW( खरीद गर्नुहोस्।)
        </Button>
      </a>
    </div>
  )
}

export default WhatsAppMessageLink
