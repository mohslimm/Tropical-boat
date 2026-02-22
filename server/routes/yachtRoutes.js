const express = require('express');
const router = express.Router();
const {
  getYachts,
  getYachtById,
  createYacht,
  updateYacht,
  deleteYacht,
} = require('../controllers/yachtController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getYachts);
router.get('/:id', getYachtById);
router.post('/', protect, createYacht);
router.put('/:id', protect, updateYacht);
router.delete('/:id', protect, deleteYacht);

module.exports = router;
