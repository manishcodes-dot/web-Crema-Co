import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  size: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' },
  milkOption: { type: String, default: 'whole' },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  orderMethod: { type: String, enum: ['dine-in', 'takeaway', 'delivery'], default: 'dine-in' },
  paymentMethod: { type: String, enum: ['card', 'cash', 'apple-pay'], default: 'card' },
  customerName: { type: String },
  customerEmail: { type: String },
  status: { type: String, enum: ['pending', 'preparing', 'ready', 'completed'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
