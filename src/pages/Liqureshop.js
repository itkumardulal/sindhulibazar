


import React from 'react'
import DrawerAppBar from '../components/Navbar'
import ImgMediaCard from '../components/ItemCard'
import { Box } from '@mui/material'
import Item from '../data/item.json'
import BackgroundVideo from '../components/BackgroundVideo'

const Liqureshop = () => {
  const handleCart=()=>{
    alert("We are working on updating ADD to Cart for you to allow multiple Purchase. Wait for some days to update this feature. Continue shopping with website with direct order ")
  
  }
  return (
    <>
     <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <DrawerAppBar  >
       
   
         <button onClick={handleCart}  class="material-symbols-outlined"
          style={{fontSize:32,
             position:"fixed", 
               bottom: 0,
            right: 0,
            padding: 12
            ,color:"white",
            backgroundColor:"#1a66ad",
            margin:15,
            borderRadius:40,
            textDecoration:"none"
            }}>
          shopping_cart
</button>


      

         
        {/* <img src='https://i.imgur.com/bvliFME.jpg' style={{height:250}}/>
              <img src='https://Zi.imgur.com/9dKWY8A.jpg' style={{height:250}}/>
              <img src='https://i.imgur.com/YSIHio3.pngjpg' style={{height:250}}/> */}
            <Box sx={{ display: 'flex', justifyContent:'center', flexWrap: 'wrap', gap: 2, maxWidth: '100%' }} mt={5}>
             
            <text style={{width:"100%",fontSize:20,backgroundColor:"silver",padding:10,borderRadius:10}}>"तलबाट आफ्नो मनपरेको पेय खरीद गर्नुहोस्। 24 hours delivery Available"</text>           
            {
                Item?.map((dt, index) => (
                    <ImgMediaCard key={index} data={dt} />
                ))
            }
            </Box>
          
        </DrawerAppBar>
    </>
  )
}

export default Liqureshop;