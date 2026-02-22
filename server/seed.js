const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Yacht = require('./models/Yacht');

dotenv.config();

const yachts = [
  {
    name: '150 Palmer-Johnson',
    brand: 'Palmer-Johnson',
    year: 2018,
    length: 150,
    guests: 12,
    cabins: 6,
    crew: 10,
    price: 120000,
    priceType: 'charter',
    currency: 'USD',
    description:
      'A masterpiece of modern yacht design, the 150 Palmer-Johnson blends raw power with timeless elegance. Her sleek hull and vast deck spaces make her the pinnacle of luxury yachting.',
    specs: {
      beam: 28,
      draft: 8,
      engines: 'Twin MTU 16V 4000 M93L',
      speed: 18,
      range: 3500,
    },
    amenities: ['Jacuzzi', 'Beach Club', 'Helipad', 'Gym', 'Cinema Room', 'Water Toys'],
    images: [
      'https://images.unsplash.com/photo-1567636788276-40a47795ba4d?w=1920&q=80',
      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1920&q=80',
    ],
    featured: true,
    status: 'available',
  },
  {
    name: 'Majesty 175',
    brand: 'Gulf Craft',
    year: 2020,
    length: 175,
    guests: 14,
    cabins: 7,
    crew: 12,
    price: 180000,
    priceType: 'charter',
    currency: 'USD',
    description:
      'The Majesty 175 is a floating palace. Designed for those who demand nothing but the best, she offers unrivaled luxury across her seven sumptuous staterooms.',
    specs: {
      beam: 32,
      draft: 9,
      engines: 'Quad MTU 16V 2000 M96L',
      speed: 22,
      range: 4000,
    },
    amenities: ['Pool', 'Jacuzzi', 'Helipad', 'Spa', 'Cinema', 'Dive Center'],
    images: [
      'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1920&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    ],
    featured: true,
    status: 'available',
  },
  {
    name: 'Sunreef 80',
    brand: 'Sunreef Yachts',
    year: 2022,
    length: 80,
    guests: 8,
    cabins: 4,
    crew: 4,
    price: 65000,
    priceType: 'charter',
    currency: 'USD',
    description:
      'The Sunreef 80 catamaran redefines sailing luxury. With her wide beam and eco-friendly hybrid propulsion, she is the perfect vessel for exploring the world\'s most remote anchorages.',
    specs: {
      beam: 40,
      draft: 5,
      engines: 'Hybrid Electric + Volvo Penta D6',
      speed: 14,
      range: 2000,
    },
    amenities: ['Solar Panels', 'Trampoline', 'Paddleboards', 'Snorkeling Gear', 'Outdoor Bar'],
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80',
    ],
    featured: false,
    status: 'available',
  },
  {
    name: 'Feadship Excellence',
    brand: 'Feadship',
    year: 2019,
    length: 200,
    guests: 16,
    cabins: 8,
    crew: 20,
    price: 9500000,
    priceType: 'sale',
    currency: 'USD',
    description:
      'A Feadship is not merely a yacht — it is a legacy. The Excellence represents the pinnacle of Dutch craftsmanship, custom built to the owner\'s exact specifications over four meticulous years.',
    specs: {
      beam: 35,
      draft: 10,
      engines: 'Twin Caterpillar 3516C',
      speed: 16,
      range: 5000,
    },
    amenities: ['Swimming Pool', 'Helipad', 'Submarine', 'Glassbottom Boat', 'Art Gallery', 'Wine Cellar'],
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    ],
    featured: true,
    status: 'available',
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Yacht.deleteMany();
    await Yacht.insertMany(yachts);
    console.log('✅ Database seeded with', yachts.length, 'yachts');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seed();
