// services/apiService.jsx

const API_BASE_URL = 'https://example.com/api'; // Replace with your API base URL

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

const apiService = {
  getProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    return handleResponse(response);
  },

  getProductById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return handleResponse(response);
  },

  postOrder: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    return handleResponse(response);
  },
};

export default apiService;
