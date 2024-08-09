import React, { useState } from 'react';

const CheckoutForm = ({onSubmit}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = { name, address, paymentMethod };
    onSubmit(orderData);
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
    <h2>Checkout</h2>
    <div>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
    </div>
    <div>
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
    </div>
    <div>
      <label>
        Payment Method:
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
        </select>
      </label>
    </div>
    <button type="submit">Place Order</button>
  </form>
);
};

export default CheckoutForm;
