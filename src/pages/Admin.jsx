import { useState, useEffect, useRef } from "react";
import { adminLogin, getOrders, getStats, updateOrderStatus, getAnalytics } from "../api/orders";

// ===== 🔔 NOTIFICATION SOUND =====
const playNotificationSound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const playBeep = (freq, startTime, duration, vol = 0.4) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = "sine";
      gain.gain.setValueAtTime(vol, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    const t = ctx.currentTime;
    playBeep(880,  t,       0.15, 0.5);
    playBeep(1100, t + 0.2, 0.15, 0.4);
    playBeep(1320, t + 0.4, 0.25, 0.5);
    playBeep(1100, t + 0.6, 0.30, 0.3);
  } catch (e) { console.log("Sound error:", e); }
};

const STATUS_COLORS = {
  Pending:   "bg-yellow-100 text-yellow-700",
  Preparing: "bg-blue-100 text-blue-700",
  Ready:     "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const NEXT_STATUS = {
  Pending:   { label: "▶ Start Preparing", next: "Preparing", color: "bg-blue-500 hover:bg-blue-600 text-white" },
  Preparing: { label: "✓ Mark Ready",      next: "Ready",     color: "bg-purple-500 hover:bg-purple-600 text-white" },
  Ready:     { label: "🚚 Mark Delivered",  next: "Delivered", color: "bg-green-500 hover:bg-green-600 text-white" },
  Delivered: { label: "✅ Delivered",       next: null,        color: "bg-gray-100 text-gray-400 cursor-not-allowed" },
  Cancelled: { label: "❌ Cancelled",       next: null,        color: "bg-red-100 text-red-400 cursor-not-allowed" },
};

// ===== BAR CHART =====
const BarChart = ({ data, valueKey, labelKey, color = "#f97316", height = 120 }) => {
  if (!data || data.length === 0) return <p className="text-gray-400 text-sm text-center py-8">Data nahi hai</p>;
  const max = Math.max(...data.map(d => d[valueKey]));
  return (
    <div className="flex items-end gap-1" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center flex-1 gap-1">
          <span className="text-gray-500 font-semibold" style={{ fontSize: "8px" }}>{d[valueKey]}</span>
          <div className="w-full rounded-t-md transition-all"
            style={{ height: `${max > 0 ? (d[valueKey] / max) * 70 : 0}%`, backgroundColor: color, minHeight: d[valueKey] > 0 ? "4px" : "0" }} />
          <span className="text-gray-400 truncate w-full text-center" style={{ fontSize: "8px" }}>
            {String(d[labelKey]).length > 5 ? String(d[labelKey]).slice(5) : d[labelKey]}
          </span>
        </div>
      ))}
    </div>
  );
};

// ===== THERMAL RECEIPT =====
const printReceipt = (order) => {
  const date = new Date(order.createdAt);
  const dateStr = date.toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" });
  const timeStr = date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  const itemsRows = order.items.map((item) => {
    const total = item.price * item.qty;
    return `<tr>
      <td style="padding:5px 0;font-size:13px;width:50%;">${item.name}</td>
      <td style="padding:5px 0;font-size:13px;text-align:center;width:15%;">${item.qty}</td>
      <td style="padding:5px 0;font-size:13px;text-align:right;width:17.5%;">&#8377;${item.price}</td>
      <td style="padding:5px 0;font-size:13px;text-align:right;width:17.5%;font-weight:700;">&#8377;${total}</td>
    </tr>`;
  }).join("");
  const receiptHTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
    <title>Receipt - ${order.orderNumber}</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap');
      * { margin:0; padding:0; box-sizing:border-box; }
      body { font-family:'Courier Prime','Courier New',monospace; background:#e8e8e8; display:flex; justify-content:center; padding:30px 10px; }
      .receipt { background:#fff; width:350px; padding:28px 24px 24px; box-shadow:0 6px 30px rgba(0,0,0,0.2); }
      .header { text-align:center; padding-bottom:16px; margin-bottom:16px; border-bottom:2px dashed #222; }
      .logo { font-size:30px; margin-bottom:6px; }
      .restaurant-name { font-size:20px; font-weight:700; letter-spacing:3px; text-transform:uppercase; color:#111; }
      .restaurant-info { font-size:11.5px; color:#555; margin-top:6px; line-height:1.9; }
      .section-title { font-size:10px; text-transform:uppercase; letter-spacing:2px; color:#999; font-weight:700; margin-bottom:8px; }
      .meta-table { width:100%; border-collapse:collapse; margin-bottom:4px; }
      .meta-table td { padding:3px 0; font-size:12.5px; }
      .meta-table .label { color:#888; width:45%; }
      .meta-table .value { font-weight:700; text-align:right; color:#111; }
      .order-num { font-size:16px !important; letter-spacing:1px; }
      .divider-dash { border-top:1px dashed #bbb; margin:12px 0; }
      .divider-bold { border-top:2px dashed #222; margin:14px 0; }
      .customer-name { font-size:15px; font-weight:700; color:#111; margin-bottom:4px; }
      .customer-info { font-size:12px; color:#555; line-height:1.8; }
      .items-table { width:100%; border-collapse:collapse; }
      .items-header td { font-size:10px; text-transform:uppercase; letter-spacing:1px; color:#999; padding-bottom:6px; font-weight:700; }
      .items-header td:nth-child(2) { text-align:center; }
      .items-header td:nth-child(3), .items-header td:nth-child(4) { text-align:right; }
      .total-box { background:#111; color:#fff; padding:12px 16px; margin:14px 0; display:flex; justify-content:space-between; align-items:center; }
      .total-label { font-size:13px; letter-spacing:2px; text-transform:uppercase; }
      .total-amount { font-size:22px; font-weight:700; }
      .payment-row { display:flex; justify-content:space-between; align-items:center; margin:10px 0; }
      .payment-label { font-size:11px; color:#999; text-transform:uppercase; letter-spacing:1px; }
      .payment-value { font-size:13px; font-weight:700; color:#111; }
      .footer { text-align:center; margin-top:16px; padding-top:14px; border-top:2px dashed #222; line-height:1.9; }
      .thank-you { font-size:15px; font-weight:700; letter-spacing:2px; color:#111; }
      .footer-sub { font-size:11px; color:#888; margin-top:4px; }
      .bottom-code { text-align:center; margin-top:14px; padding-top:10px; border-top:1px dashed #ccc; font-size:10px; color:#bbb; letter-spacing:3px; }
      @media print {
        @page { size: 80mm auto; margin: 0; }
        body { background:white; padding:0; margin:0; display:block; }
        .receipt { box-shadow:none; width:80mm; max-width:80mm; margin:0 auto; padding:10px 12px; }
      }
    </style></head><body>
    <div class="receipt">
      <div class="header">
        <div class="logo">🍽️</div>
        <div class="restaurant-name">Shree Gurukripa</div>
        <div class="restaurant-info">Vijay Nagar, Indore, M.P. 452010<br/>+91 731 422 2202<br/>Open: 11 AM – 12 AM (All Days)</div>
      </div>
      <div class="section-title">Order Details</div>
      <table class="meta-table">
        <tr><td class="label">Order No.</td><td class="value order-num">#${order.orderNumber}</td></tr>
        <tr><td class="label">Date</td><td class="value">${dateStr}</td></tr>
        <tr><td class="label">Time</td><td class="value">${timeStr}</td></tr>
        <tr><td class="label">Type</td><td class="value">${order.orderType === "delivery" ? "🚚 Delivery" : "🏪 Pickup"}</td></tr>
        <tr><td class="label">Status</td><td class="value">${order.status}</td></tr>
      </table>
      <div class="divider-bold"></div>
      <div class="section-title">Customer Details</div>
      <div class="customer-name">${order.customer.name}</div>
      <div class="customer-info">📞 ${order.customer.phone}${order.customer.address ? `<br/>📍 ${order.customer.address}` : ""}</div>
      <div class="divider-bold"></div>
      <div class="section-title">Items Ordered</div>
      <table class="items-table">
        <tr class="items-header">
          <td>Item</td><td style="text-align:center;">Qty</td><td style="text-align:right;">Rate</td><td style="text-align:right;">Total</td>
        </tr>
        <tr><td colspan="4"><div class="divider-dash"></div></td></tr>
        ${itemsRows}
      </table>
      <div class="total-box">
        <span class="total-label">Total Amount</span>
        <span class="total-amount">&#8377;${order.totalPrice}</span>
      </div>
      <div class="payment-row">
        <span class="payment-label">Payment</span>
        <span class="payment-value">${order.paymentMethod === "cod" ? "💵 Cash on Delivery" : "💳 Online Paid"}</span>
      </div>
      <div class="footer">
        <div class="thank-you">✦ THANK YOU ✦</div>
        <div class="footer-sub">Aapka order receive ho gaya hai!<br/>Dobara padharein 🙏<br/><em>Best Veg Restaurant in Indore</em></div>
      </div>
      <div class="bottom-code">${order.orderNumber} · ${dateStr}</div>
    </div>
    <script>window.onload = () => { window.print(); }</script>
    </body></html>`;
  const win = window.open("", "_blank", "width=420,height=780");
  win.document.write(receiptHTML);
  win.document.close();
};

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [analyticsTab, setAnalyticsTab] = useState("weekly");
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newOrderAlert, setNewOrderAlert] = useState(null);
  // Mobile: order detail as bottom sheet
  const [showDetailSheet, setShowDetailSheet] = useState(false);
  const knownOrderIds = useRef(new Set());
  const isFirstLoad = useRef(true);

  const fetchData = async (silent = false) => {
    if (!silent) setLoading(true);
    const [ordersData, statsData, analyticsData] = await Promise.all([
      getOrders(token), getStats(token), getAnalytics(token),
    ]);
    if (!isFirstLoad.current) {
      const newOrders = ordersData.filter(o => !knownOrderIds.current.has(o._id));
      if (newOrders.length > 0) {
        playNotificationSound();
        setNewOrderAlert(newOrders[0]);
        setTimeout(() => setNewOrderAlert(null), 6000);
      }
    }
    ordersData.forEach(o => knownOrderIds.current.add(o._id));
    isFirstLoad.current = false;
    setOrders(ordersData);
    setStats(statsData);
    setAnalytics(analyticsData);
    if (!silent) setLoading(false);
  };

  useEffect(() => { if (token) fetchData(); }, [token]);
  useEffect(() => {
    if (!token) return;
    const interval = setInterval(() => fetchData(true), 15000);
    return () => clearInterval(interval);
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    const res = await adminLogin(loginForm.email, loginForm.password);
    if (res.token) { localStorage.setItem("adminToken", res.token); setToken(res.token); }
    else setLoginError("Invalid email or password!");
    setLoginLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(""); setOrders([]); setStats(null); setAnalytics(null);
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus, token);
    setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o)));
    if (selectedOrder?._id === orderId) setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowDetailSheet(true);
  };

  const filteredOrders = orders.filter((o) => activeTab === "all" ? true : o.status === activeTab);

  // ===== LOGIN =====
  if (!token) return (
    <div className="min-h-screen bg-[#FFF5EE] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#FDDCB5", width: "72px", height: "72px" }}>
            <svg style={{ width: "32px", height: "32px", color: "#E8853D" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-1">Shree Gurukripa Dashboard</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Email</label>
            <input type="email" placeholder="admin@shreegurukripa.com" value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-orange-400 transition text-gray-700" required />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Password</label>
            <input type="password" placeholder="••••••••" value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-orange-400 transition text-gray-700" required />
          </div>
          {loginError && <p className="text-red-500 text-sm font-medium">{loginError}</p>}
          <button type="submit" disabled={loginLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2">
            {loginLoading
              ? <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              : "Login →"}
          </button>
        </form>
      </div>
    </div>
  );

  // ===== ADMIN PANEL =====
  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🔔 NOTIFICATION */}
      {newOrderAlert && (
        <div className="fixed top-4 right-4 left-4 md:left-auto md:w-96 z-50">
          <div className="bg-green-500 text-white rounded-2xl shadow-2xl p-4 flex items-start gap-3 border-4 border-green-300">
            <div className="text-2xl">🔔</div>
            <div className="flex-1 min-w-0">
              <p className="font-bold">🆕 Naya Order Aaya!</p>
              <p className="text-sm opacity-90 truncate">#{newOrderAlert.orderNumber} — {newOrderAlert.customer.name}</p>
              <p className="text-sm opacity-90">₹{newOrderAlert.totalPrice} • {newOrderAlert.orderType === "delivery" ? "🚚 Delivery" : "🏪 Pickup"}</p>
            </div>
            <button onClick={() => setNewOrderAlert(null)} className="text-white opacity-70 hover:opacity-100 font-bold text-lg shrink-0">✕</button>
          </div>
        </div>
      )}

      {/* TOPBAR */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: "#FDDCB5", width: "36px", height: "36px" }}>
            <svg style={{ width: "18px", height: "18px", color: "#E8853D" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 21h6m-6 0v-3m6 3v-3M9 18h6M7.5 8.25A4.5 4.5 0 0112 3.75a4.5 4.5 0 014.5 4.5c0 1.63-.864 3.056-2.156 3.844L14.25 18H9.75l-.094-5.906A4.502 4.502 0 017.5 8.25z" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-base md:text-lg leading-tight">Shree Gurukripa</h1>
            <p className="text-xs text-gray-400 hidden sm:block">Admin Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={() => fetchData()}
            className="text-gray-500 hover:text-orange-500 transition flex items-center gap-1 text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button onClick={handleLogout}
            className="bg-red-50 text-red-500 hover:bg-red-100 transition px-3 md:px-4 py-1.5 md:py-2 rounded-xl font-semibold text-sm">
            Logout
          </button>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-8 max-w-7xl mx-auto">

        {/* STATS — 2 cols mobile, 5 cols desktop */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8">
            {[
              { label: "Total Orders", value: stats.total, icon: "📦", color: "text-gray-900" },
              { label: "Pending", value: stats.pending, icon: "⏳", color: "text-yellow-600" },
              { label: "Preparing", value: stats.preparing, icon: "👨‍🍳", color: "text-blue-600" },
              { label: "Delivered", value: stats.delivered, icon: "✅", color: "text-green-600" },
              { label: "Revenue", value: `₹${stats.revenue}`, icon: "💰", color: "text-orange-600" },
            ].map((stat, i) => (
              <div key={i} className={`bg-white rounded-2xl p-4 md:p-5 shadow-sm ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}>
                <p className="text-xl md:text-2xl mb-1">{stat.icon}</p>
                <p className={`text-xl md:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-gray-500 text-xs md:text-sm mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* ANALYTICS */}
        {analytics && (
          <div className="mb-6 md:mb-8">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">📊 Sales Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-3 md:mb-4">

              {/* Today */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-5 text-white">
                <p className="text-orange-100 text-sm font-semibold mb-3">📅 Aaj Ka Summary</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-orange-100 text-sm">Orders</span>
                  <span className="text-2xl font-bold">{analytics.today.orders}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-orange-100 text-sm">Revenue</span>
                  <span className="text-2xl font-bold">₹{analytics.today.revenue}</span>
                </div>
              </div>

              {/* Top Items */}
              <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm md:col-span-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3 md:mb-4">🏆 Most Ordered Items</p>
                {analytics.topItems?.length > 0 ? (
                  <div className="space-y-2">
                    {analytics.topItems.map((item, i) => {
                      const maxQty = analytics.topItems[0].totalQty;
                      const pct = Math.round((item.totalQty / maxQty) * 100);
                      const medals = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];
                      return (
                        <div key={i} className="flex items-center gap-2 md:gap-3">
                          <span className="text-base md:text-lg shrink-0">{medals[i]}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between text-xs md:text-sm mb-1">
                              <span className="font-semibold text-gray-800 truncate">{item._id}</span>
                              <span className="text-gray-500 shrink-0 ml-2">{item.totalQty} sold</span>
                            </div>
                            <div className="bg-gray-100 rounded-full h-1.5 md:h-2">
                              <div className="bg-orange-400 h-full rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : <p className="text-gray-400 text-sm">Koi data nahi</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {/* Revenue Chart */}
              <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">📈 Revenue</p>
                  <div className="flex gap-1">
                    {["weekly", "monthly"].map(t => (
                      <button key={t} onClick={() => setAnalyticsTab(t)}
                        className={`text-xs px-2 md:px-3 py-1 rounded-full font-semibold transition ${analyticsTab === t ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-500"}`}>
                        {t === "weekly" ? "7D" : "30D"}
                      </button>
                    ))}
                  </div>
                </div>
                <BarChart data={analyticsTab === "weekly" ? analytics.weeklyData : analytics.monthlyData} valueKey="revenue" labelKey="_id" color="#f97316" height={120} />
              </div>

              {/* Peak Hours */}
              <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3 md:mb-4">⏰ Peak Hours</p>
                {analytics.hourlyData?.length > 0 ? (
                  <>
                    <BarChart data={analytics.hourlyData.map(h => ({ ...h, label: `${h._id}h` }))} valueKey="orders" labelKey="label" color="#8b5cf6" height={120} />
                    <p className="text-xs text-gray-400 mt-2 text-center">
                      🔥 {(() => { const p = analytics.hourlyData.reduce((a, b) => a.orders > b.orders ? a : b, {}); return `Busy: ${p._id}:00–${p._id + 1}:00 (${p.orders} orders)`; })()}
                    </p>
                  </>
                ) : <p className="text-gray-400 text-sm text-center py-8">Koi data nahi</p>}
              </div>
            </div>
          </div>
        )}

        {/* TABS — scrollable on mobile */}
        <div className="flex gap-2 mb-4 md:mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {["all", "Pending", "Preparing", "Ready", "Delivered", "Cancelled"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${activeTab === tab ? "bg-orange-500 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
              {tab === "all" ? "All" : tab}
              {tab !== "all" && (
                <span className="ml-1 text-xs">{orders.filter((o) => o.status === tab).length}</span>
              )}
            </button>
          ))}
        </div>

        {/* ORDERS + DETAIL — stack on mobile, side by side on desktop */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">

          {/* Orders List */}
          <div className="flex-1 space-y-3">
            {loading ? (
              <div className="text-center py-20 text-gray-400">Loading orders...</div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-16 text-gray-400 bg-white rounded-2xl">No orders found</div>
            ) : filteredOrders.map((order) => {
              const nextInfo = NEXT_STATUS[order.status];
              return (
                <div key={order._id} onClick={() => handleOrderClick(order)}
                  className={`bg-white rounded-2xl p-4 md:p-5 shadow-sm cursor-pointer hover:shadow-md transition-all border-2 ${selectedOrder?._id === order._id ? "border-orange-400" : "border-transparent"}`}>
                  <div className="flex items-start justify-between mb-2 md:mb-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                        <h3 className="font-bold text-gray-900 text-sm md:text-base">#{order.orderNumber}</h3>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{order.orderType === "delivery" ? "🚚" : "🏪"}</span>
                      </div>
                      <p className="text-gray-600 text-xs md:text-sm mt-1 truncate">{order.customer.name} • {order.customer.phone}</p>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <p className="font-bold text-orange-500 text-base md:text-lg">₹{order.totalPrice}</p>
                      <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs md:text-sm mb-3 line-clamp-1">{order.items.map((i) => `${i.name} ×${i.qty}`).join(", ")}</p>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={(e) => { e.stopPropagation(); if (nextInfo.next) handleStatusUpdate(order._id, nextInfo.next); }}
                      disabled={!nextInfo.next}
                      className={`flex-1 text-xs md:text-sm px-3 md:px-4 py-2 rounded-xl font-semibold transition-all ${nextInfo.color}`}>
                      {nextInfo.label}
                    </button>
                    {order.status !== "Delivered" && order.status !== "Cancelled" && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleStatusUpdate(order._id, "Cancelled"); }}
                        className="text-xs px-2 md:px-3 py-2 rounded-xl font-semibold border border-red-200 text-red-400 hover:bg-red-50 transition shrink-0">
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ORDER DETAIL — sidebar on desktop, bottom sheet on mobile */}
          {selectedOrder && (
            <>
              {/* Mobile Bottom Sheet Overlay */}
              <div className="lg:hidden fixed inset-0 z-40 flex flex-col justify-end"
                style={{ display: showDetailSheet ? "flex" : "none" }}>
                <div className="absolute inset-0 bg-black/40" onClick={() => { setShowDetailSheet(false); setSelectedOrder(null); }} />
                <div className="relative bg-white rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto z-10">
                  <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
                  <OrderDetail
                    order={selectedOrder}
                    onClose={() => { setShowDetailSheet(false); setSelectedOrder(null); }}
                    onStatusUpdate={handleStatusUpdate}
                    onPrint={printReceipt}
                  />
                </div>
              </div>

              {/* Desktop Sidebar */}
              <div className="hidden lg:block w-80 shrink-0">
                <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                  <OrderDetail
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onStatusUpdate={handleStatusUpdate}
                    onPrint={printReceipt}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ===== ORDER DETAIL COMPONENT =====
function OrderDetail({ order, onClose, onStatusUpdate, onPrint }) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900 text-lg">#{order.orderNumber}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Progress */}
      <div className="mb-5">
        <div className="flex justify-between">
          {["Pending", "Preparing", "Ready", "Delivered"].map((s, i) => {
            const statuses = ["Pending", "Preparing", "Ready", "Delivered"];
            const currentIdx = statuses.indexOf(order.status);
            const isActive = i <= currentIdx && order.status !== "Cancelled";
            return (
              <div key={s} className="flex flex-col items-center gap-1" style={{ width: "22%" }}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${isActive ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-400"}`}>{i + 1}</div>
                <span className={`text-xs text-center leading-tight ${isActive ? "text-orange-500 font-semibold" : "text-gray-400"}`}>{s}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Customer */}
      <div className="bg-[#FFF5EE] rounded-xl p-4 mb-4">
        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Customer</p>
        <p className="font-bold text-gray-900">{order.customer.name}</p>
        <p className="text-gray-600 text-sm">{order.customer.phone}</p>
        {order.customer.address && <p className="text-gray-500 text-sm mt-1">{order.customer.address}</p>}
      </div>

      {/* Items */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Items</p>
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm text-gray-700 mb-1.5">
            <span>{item.name} × {item.qty}</span>
            <span className="font-semibold">₹{item.price * item.qty}</span>
          </div>
        ))}
        <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold text-gray-900">
          <span>Total</span>
          <span className="text-orange-500">₹{order.totalPrice}</span>
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full font-medium">{order.paymentMethod === "cod" ? "💵 COD" : "💳 Online"}</span>
        <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full font-medium">{order.orderType === "delivery" ? "🚚 Delivery" : "🏪 Pickup"}</span>
      </div>

      <p className="text-xs text-gray-400 mb-4">Placed at {new Date(order.createdAt).toLocaleString("en-IN")}</p>

      {NEXT_STATUS[order.status]?.next && (
        <button onClick={() => onStatusUpdate(order._id, NEXT_STATUS[order.status].next)}
          className={`w-full py-2.5 rounded-xl font-semibold text-sm mb-3 transition ${NEXT_STATUS[order.status].color}`}>
          {NEXT_STATUS[order.status].label}
        </button>
      )}

      <button onClick={() => onPrint(order)}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white transition py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.042 48.042 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
        </svg>
        🧾 Print Receipt
      </button>
    </>
  );
}