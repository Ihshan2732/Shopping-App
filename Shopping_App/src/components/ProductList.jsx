// components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService'; // Ensure this path is correct
import Product from './Product'; // Import the correct component for displaying products

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiService.getProducts(); // Fetch all products
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {loading && <p>Loading products...</p>}
      {error && <p>Error loading products: {error.message}</p>}
      <ul>
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
