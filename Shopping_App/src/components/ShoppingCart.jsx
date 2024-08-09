import React from 'react';
import { useCart } from '../contexts/CartContext';

const ShoppingCart = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="shopping-cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCart;
