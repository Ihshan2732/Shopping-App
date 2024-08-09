const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const authMiddleware = require('./middlewares/authMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');


app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);

app.use(authMiddleware); // Apply auth middleware to routes that need authentication

app.use(errorMiddleware); // Error handling middleware

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running on port 5000');
});


module.exports = app;