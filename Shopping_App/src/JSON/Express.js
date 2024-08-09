const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'products.json'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
