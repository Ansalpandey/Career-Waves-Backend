const ContactUs = require('../models/contactus.model');

// Create a new contact us message
exports.createContactUs = async (req, res) => {
  try {
    const contactUs = new ContactUs(req.body);
    await contactUs.save();
    res.status(201).send(contactUs);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all contact us messages
exports.getAllContactUsMessages = async (req, res) => {
  try {
    const contactUsMessages = await ContactUs.find();
    res.status(200).send(contactUsMessages);
  } catch (error) {
    res.status(500).send(error);
  }
};