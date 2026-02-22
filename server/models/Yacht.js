const mongoose = require('mongoose');

const yachtSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, trim: true },
    year: { type: Number },
    length: { type: Number }, // feet
    guests: { type: Number },
    cabins: { type: Number },
    crew: { type: Number },
    price: { type: Number },
    priceType: { type: String, enum: ['charter', 'sale'], default: 'charter' },
    currency: { type: String, default: 'USD' },
    description: { type: String },
    specs: {
      beam: Number,
      draft: Number,
      engines: String,
      speed: Number,
      range: Number,
    },
    amenities: [String],
    images: [String],
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['available', 'chartered', 'hidden'],
      default: 'available',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Yacht', yachtSchema);
