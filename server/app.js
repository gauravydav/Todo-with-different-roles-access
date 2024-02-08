const express = require('express');
const connectDB = require('./db/db');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); 
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/todo', todoRoutes);

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
