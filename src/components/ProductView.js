import React from 'react';
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, Rating } from '@mui/material';

// Sample product data
const product = {
  productId: 1,
  productName: "veg chaumin",
  description: "Veg Chowmein is a stir-fried noodle dish with mixed vegetables, seasoned with soy sauce and spices. It’s a tasty, quick vegetarian favorite in Nepali cuisine.",
  price: 120.99,
  category: "food",
  stockAvailability: true,
  ratings: {
    average: 4.7,
    reviewsCount: 10,
  },
  colorsAvailable: ["Black", "Silver", "Rose Gold"],
  features: [
    "Heart Rate Monitor",
    "Sleep Tracker",
    "GPS Tracking",
    "Water Resistant (50m)",
    "Bluetooth Connectivity",
    "7-day Battery Life",
  ],
  dimensions: {
    width: "1.7 in",
    height: "1.8 in",
    depth: "0.5 in",
  },
  weight: "45g",
  manufacturer: {
    name: "Prayash hotel",
    warranty: "2 years",
  },
  imageURL: "https://i.imgur.com/HFy54bX.jpg",
};

const ProductView = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: 'center' }}>
        {product.productName}
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              alt={product.productName}
              height="300"
              image={product.imageURL}
            />
            <CardContent>
              <Typography variant="h6">Price: ${product.price.toFixed(2)}</Typography>
              <Typography variant="body2" color="text.secondary">{product.description}</Typography>
              <Typography variant="h6" sx={{ marginTop: 1 }}>
                Ratings: 
                <Rating
                  name="read-only"
                  value={product.ratings.average}
                  readOnly
                  precision={0.1}
                />
                <span> ({product.ratings.reviewsCount} reviews)</span>
              </Typography>
              <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">Product Details</Typography>
          <Typography variant="body1"><strong>Category:</strong> {product.category}</Typography>
          <Typography variant="body1"><strong>Stock Availability:</strong> {product.stockAvailability ? "In Stock" : "Out of Stock"}</Typography>
          <Typography variant="body1"><strong>Weight:</strong> {product.weight}</Typography>
          <Typography variant="body1"><strong>Dimensions:</strong> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth}</Typography>
          <Typography variant="body1"><strong>Manufacturer:</strong> {product.manufacturer.name} (Warranty: {product.manufacturer.warranty})</Typography>
          
          <Typography variant="h6" sx={{ marginTop: 2 }}>Available Colors:</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {product.colorsAvailable.map((color, index) => (
              <Box
                key={index}
                sx={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: color.toLowerCase(),
                  border: '1px solid #000',
                }}
              />
            ))}
          </Box>

          <Typography variant="h6" sx={{ marginTop: 2 }}>Features:</Typography>
          <ul>
            {product.features.map((feature, index) => (
              <li key={index}>
                <Typography variant="body2">{feature}</Typography>
              </li>
            ))}
          </ul>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductView;
