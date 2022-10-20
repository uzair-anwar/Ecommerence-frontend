import React, { useState } from "react";
import ImageSwiper from "./ImageSwiper";
import "../../StyleSheets/navbar-style.css";
import { Card, CardContent, Typography } from "@material-ui/core";

const ProductCard = ({ product, handleCart }) => {
  const [images] = useState(product.image);

  return (
    <div className="home-card">
      <Card>
        <div className="images-section">
          <ImageSwiper images={images} />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            Name:
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {product?.name}
          </Typography>

          <Typography gutterBottom variant="h5" component="div">
            Description
          </Typography>
          <Typography variant="body1" color="textPrimary" component="p">
            {product.description}
          </Typography>

          <Typography gutterBottom variant="h5" component="div">
            Price:
          </Typography>
          <Typography variant="body1" color="textPrimary" component="p">
            {`${product.price}$`}
          </Typography>
        </CardContent>

        <button
          className="btn btn-outline-primary"
          onClick={() => handleCart(product)}
        >
          Add to cart
        </button>
      </Card>
    </div>
  );
};
export default ProductCard;
