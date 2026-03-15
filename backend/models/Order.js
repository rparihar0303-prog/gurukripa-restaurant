import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name:  { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  qty:   { type: Number, required: true, min: 1 },
}, { _id: false });

const customerSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true },
  phone:   { type: String, required: true },
  address: { type: String, trim: true },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderNumber:   { type: String, unique: true, required: true },
  customer:      { type: customerSchema, required: true },
  orderType:     { type: String, enum: ["delivery", "pickup"], required: true },
  items:         { type: [itemSchema], required: true },
  totalPrice:    { type: Number, required: true, min: 0 },
  paymentMethod: { type: String, enum: ["cod", "razorpay"], required: true },
  paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
  status: {
    type: String,
    enum: ["Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"],
    default: "Pending"
  },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);