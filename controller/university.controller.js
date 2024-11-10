const University = require('../models/university.model');

// Create a new university
exports.createUniversity = async (req, res) => {

  try {
    const university = new University(req.body);
    await university.save();
    res.status(201).send(university);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all universities

exports.getAllUniversities = async (req, res) => {
  try {
    const universities = await University.find();
    res.status(200).send(universities);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get university by name
exports.getUniversityByName = async (req, res) => {
  try {
    const university = await University.findOne({ name: req.query.name });
    if (!university) {
      return res.status(404).send('University not found');
    }
    res.status(200).send(university);
  } catch (error) {
    res.status(500).send(error);
  }
};

