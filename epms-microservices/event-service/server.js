const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const auth = require('./src/middlewares/authMiddleware')
const eventRoutes = require('./src/routes/eventRoutes');
const venueRoutes = require('./src/routes/venueRoutes')
const employeeRoutes = require('./src/routes/employeeRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected to event-service'))
  .catch((err) => console.error(err));

app.use('/api/events', auth, eventRoutes);
app.use('/api/venue', auth, venueRoutes);
app.use('/api/employee', auth, employeeRoutes);

app.get('/', (req, res) => res.send('Event Service Running'));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Event service on port ${PORT}`));
