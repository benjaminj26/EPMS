const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const vendorRoutes = require('./routes/vendorRoutes');

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Vendor service DB connected'))
  .catch(err => console.error(err));

app.use('/api/vendors', vendorRoutes);

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`Vendor service running on port ${PORT}`));
