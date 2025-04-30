const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const guestRoutes = require('./routes/guestRoutes');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Guest service DB connected'))
  .catch(err => console.error(err));

app.use('/api/guests', guestRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Guest service running on port ${PORT}`));
