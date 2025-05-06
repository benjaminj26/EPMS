const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const guestRoutes = require('./routes/guestRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const userRoutes = require('./routes/userRoutes');
const venueRoutes = require('./routes/venueRoutes');
const auth = require('./middleware/authMiddleware')
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


app.use('/auth', authRoutes);
app.use('/event', auth, eventRoutes);
app.use('/guests', auth, guestRoutes);
app.use('/vendor', vendorRoutes);
app.use('/user', auth, userRoutes);
app.use('/venue', auth, venueRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
