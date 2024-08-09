const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/mydatabase', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error('MongoDB connection error:', error.message);
//     process.exit(1);
//   }
// };

mongoose.connect('mongodb://localhost:27017/your_db_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

module.exports = connectDB;
