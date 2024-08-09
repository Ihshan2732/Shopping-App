// components/Product.jsx
import React from 'react';

const Product = ({ product }) => {
  return (
    <li className="product-item">
      {product.image && (
        <img src={product.image} alt={product.name} className="product-image" />
      )}
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </li>
  );
};

export default Product;
