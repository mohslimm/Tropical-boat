const Yacht = require('../models/Yacht');

// @desc  Get all yachts
// @route GET /api/yachts
const getYachts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.featured) filter.featured = req.query.featured === 'true';
    if (req.query.priceType) filter.priceType = req.query.priceType;

    const yachts = await Yacht.find(filter).sort({ createdAt: -1 });
    res.json(yachts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get single yacht
// @route GET /api/yachts/:id
const getYachtById = async (req, res) => {
  try {
    const yacht = await Yacht.findById(req.params.id);
    if (!yacht) return res.status(404).json({ message: 'Yacht not found' });
    res.json(yacht);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Create yacht
// @route POST /api/yachts
const createYacht = async (req, res) => {
  try {
    const yacht = await Yacht.create(req.body);
    res.status(201).json(yacht);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc  Update yacht
// @route PUT /api/yachts/:id
const updateYacht = async (req, res) => {
  try {
    const yacht = await Yacht.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!yacht) return res.status(404).json({ message: 'Yacht not found' });
    res.json(yacht);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc  Delete yacht
// @route DELETE /api/yachts/:id
const deleteYacht = async (req, res) => {
  try {
    const yacht = await Yacht.findByIdAndDelete(req.params.id);
    if (!yacht) return res.status(404).json({ message: 'Yacht not found' });
    res.json({ message: 'Yacht removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getYachts, getYachtById, createYacht, updateYacht, deleteYacht };
