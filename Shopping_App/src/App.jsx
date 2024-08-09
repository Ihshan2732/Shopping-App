import React, { useEffect, useState } from 'react';
import ProductList from './components/ProductList'; // Ensure this path is correct
import ProductDetails from './components/ProductDetails'; // Ensure this path is correct
import ShoppingCart from './components/ShoppingCart'; // Ensure this path is correct
import CheckoutForm from './components/CheckoutForm'; // Ensure this path is correct
import { CartProvider } from './contexts/CartContext'; // Ensure this path is correct
import { AuthProvider, useAuth } from './contexts/AuthContext'; // Ensure this path is correct
import apiService from './services/apiService'; // Ensure this path is correct
import './styles/App.css'; // Import CSS for App component
//import Products from './JSON/Products.json'; // Ensure this path is correct, if used

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <Header />
          <MainContent />
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

const Header = () => {
  const { user, login, logout } = useAuth();

  return (
    <header>
      <h1>Product Catalog</h1>
      <nav>
        {user ? (
          <>
            <p>Welcome, {user.name}!</p>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => login({ name: 'Sample User' })}>Login</button>
          </>
        )}
      </nav>
    </header>
  );
};

const MainContent = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await apiService.getProductById(1); // Fetch product with ID 1 for example
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleOrder = async (orderData) => {
    try {
      await apiService.postOrder(orderData);
      // Handle successful order placement
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle error in order placement
    }
  };

  return (
    <main>
      <ProductList />
      <div className="app-container">
        {loading && <p>Loading product details...</p>}
        {error && <p>Error loading product details: {error.message}</p>}
        {product && (
          <>
            <h1>Product Details</h1>
            <ProductDetails product={product} />
          </>
        )}
      </div>
      <ShoppingCart />
      <CheckoutForm onSubmit={handleOrder} />
    </main>
  );
};

export default App;
