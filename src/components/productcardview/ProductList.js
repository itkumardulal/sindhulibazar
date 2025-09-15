import React from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ImgMediaCard from "./ImgMediaCard";

export default function ProductList({ products }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: 2,
        justifyContent: "center",
      }}
    >
      {products.map((product, index) => (
        <Grid
          item
          key={product.id}
          xs={6}   // 2 per row on mobile
          sm={4}   // 3 per row on tablet
          md={3}   // 4 per row on desktop
        >
          <ImgMediaCard data={product} index={index} />
        </Grid>
      ))}
    </Grid>
  );
}
