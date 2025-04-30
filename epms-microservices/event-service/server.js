const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected to event-service'))
  .catch((err) => console.error(err));

const eventRoutes = require('./src/routes/eventRoutes');
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => res.send('Event Service Running'));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Event service on port ${PORT}`));
