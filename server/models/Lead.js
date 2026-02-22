const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    message: { type: String, required: true },
    yachtId: { type: mongoose.Schema.Types.ObjectId, ref: 'Yacht' },
    yachtName: { type: String },
    status: {
      type: String,
      enum: ['new', 'read', 'replied'],
      default: 'new',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
