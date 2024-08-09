import React from 'react';
import { useCart } from '../contexts/CartContext';

const ProductDetails = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
