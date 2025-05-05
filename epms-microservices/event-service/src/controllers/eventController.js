const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, plannerId: req.user.id });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    // const events = await Event.find({ userId: req.query.id }).populate('guestList');
    const events = await Event.find({ userId: req.query.id });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id, userId: req.user.id });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, plannerId: req.user.id },
      req.body,
      { new: true }
    );
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({ _id: req.params.id, plannerId: req.user.id });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEventsByDate = async (req, res) => {
  try {
    const date = req.query.date;

    let newDate = new Date(date);
    // newDate.setUTCHours(0, 0, 0, 0);

    // console.log('Auth Header: ', req.headers.authorization);

    const events = await Event.find({ date: newDate });
    // events.forEach(event => {
    //   console.log(event.date);
    // })

    if (!events) return res.status(200).json({ message: 'No events found' });

    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
