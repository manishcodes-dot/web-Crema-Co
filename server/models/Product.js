import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, enum: ['espresso', 'latte', 'cold-brew', 'roast', 'pastry'], required: true },
  description: { type: String, required: true },
  longDescription: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  origin: { type: String },
  roastLevel: { type: String },
  tastingNotes: [String],
  featured: { type: Boolean, default: false },
  available: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
