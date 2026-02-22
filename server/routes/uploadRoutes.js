const express = require('express');
const router = express.Router();
const { uploadImages } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.post('/', protect, upload.array('images', 10), uploadImages);

module.exports = router;
