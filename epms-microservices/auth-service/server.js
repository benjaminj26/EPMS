const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

console.log(`Mongo URI: ${process.env.MONGO_URI}`);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected to auth-service'))
  .catch((err) => console.error(err));

const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Auth Service Running'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Auth service on port ${PORT}`));
