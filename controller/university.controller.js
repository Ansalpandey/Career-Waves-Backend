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
    const searchTerm = req.params.name.trim(); // Remove leading/trailing spaces
    if (searchTerm.length < 1) {
      return res.status(400).send('Search term is too short');
    }

    // Create a regular expression for partial matching (case insensitive)
    const regex = new RegExp(searchTerm, 'i'); // 'i' for case-insensitivity

    // Use the regex in the query for flexible matching
    const universities = await University.find({ name: { $regex: regex } });

    if (universities.length === 0) {
      return res.status(404).send('No universities found matching the search term');
    }

    res.status(200).send(universities);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getUniversityById = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).send('University not found');
    }
    res.status(200).send(university);
  } catch (error) {
    res.status(500).send(error);
  }
};