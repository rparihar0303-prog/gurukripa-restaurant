import express from "express";
import Order from "../models/Order.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

const VALID_STATUSES = ["Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];

const generateWhatsAppMessage = (order) => {
  const items = order.items
    .map((i) => `  • ${i.name} ×${i.qty} = ₹${i.price * i.qty}`)
    .join("\n");
  return encodeURIComponent(
    `🍽️ *New Order - ${order.orderNumber}*\n\n` +
    `👤 *Customer:* ${order.customer.name}\n` +
    `📞 *Phone:* ${order.customer.phone}\n` +
    `📦 *Type:* ${order.orderType === "delivery" ? "🚚 Delivery" : "🏪 Pickup"}\n` +
    (order.customer.address ? `📍 *Address:* ${order.customer.address}\n` : "") +
    `\n*Items:*\n${items}\n\n` +
    `💰 *Total: ₹${order.totalPrice}*\n` +
    `💳 *Payment:* ${order.paymentMethod === "cod" ? "Cash on Delivery" : "Online Paid"}`
  );
};

// ✅ /stats — pehle
router.get("/stats", verifyAdmin, async (req, res) => {
  try {
    const [total, pending, preparing, delivered, cancelled, revenue] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ status: "Pending" }),
      Order.countDocuments({ status: "Preparing" }),
      Order.countDocuments({ status: "Delivered" }),
      Order.countDocuments({ status: "Cancelled" }),
      Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalPrice" } } }])
    ]);
    res.json({ total, pending, preparing, delivered, cancelled, revenue: revenue[0]?.total || 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ /analytics — /stats ke baad, /:id se pehle
router.get("/analytics", verifyAdmin, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);

    const [todayOrders, todayRevenue, weeklyData, monthlyData, topItems, hourlyData] =
      await Promise.all([
        Order.countDocuments({ createdAt: { $gte: today } }),
        Order.aggregate([
          { $match: { createdAt: { $gte: today }, status: { $ne: "Cancelled" } } },
          { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]),
        Order.aggregate([
          { $match: { createdAt: { $gte: weekAgo } } },
          { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, orders: { $sum: 1 }, revenue: { $sum: "$totalPrice" } } },
          { $sort: { _id: 1 } }
        ]),
        Order.aggregate([
          { $match: { createdAt: { $gte: monthAgo } } },
          { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, orders: { $sum: 1 }, revenue: { $sum: "$totalPrice" } } },
          { $sort: { _id: 1 } }
        ]),
        Order.aggregate([
          { $unwind: "$items" },
          { $group: { _id: "$items.name", totalQty: { $sum: "$items.qty" }, totalRevenue: { $sum: { $multiply: ["$items.price", "$items.qty"] } } } },
          { $sort: { totalQty: -1 } },
          { $limit: 5 }
        ]),
        Order.aggregate([
          { $group: { _id: { $hour: "$createdAt" }, orders: { $sum: 1 } } },
          { $sort: { _id: 1 } }
        ]),
      ]);

    res.json({
      today: { orders: todayOrders, revenue: todayRevenue[0]?.total || 0 },
      weeklyData, monthlyData, topItems, hourlyData,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Order create karo (customer)
router.post("/", async (req, res) => {
  try {
    const count = await Order.countDocuments();
    const orderNumber = `GK-${String(count + 1).padStart(4, "0")}`;
    const order = new Order({ ...req.body, orderNumber });
    await order.save();
    const whatsappNumber = "917314222202";
    const message = generateWhatsAppMessage(order);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
    res.status(201).json({ ...order.toObject(), whatsappLink });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Saare orders lo (admin)
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Order status update karo (admin)
router.patch("/:id/status", verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Valid: ${VALID_STATUSES.join(", ")}` });
    }
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    if (err.name === "CastError") return res.status(400).json({ message: "Invalid order ID" });
    res.status(500).json({ message: err.message });
  }
});

export default router;