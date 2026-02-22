const express = require('express');
const router = express.Router();
const { createLead, getLeads, updateLead, deleteLead } = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createLead);              // public — contact form
router.get('/', protect, getLeads);        // admin only
router.put('/:id', protect, updateLead);   // admin only
router.delete('/:id', protect, deleteLead);// admin only

module.exports = router;
