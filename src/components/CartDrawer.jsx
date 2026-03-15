import { useState } from "react";
import { useCart } from "../context/CartContext";
import { createOrder } from "../api/orders";

export default function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQty, removeFromCart, totalPrice, totalItems, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [orderType, setOrderType] = useState("delivery");
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const resetDrawer = () => {
    setStep(1);
    setOrderType("delivery");
    setForm({ name: "", phone: "", address: "" });
    setPaymentMethod("cod");
  };

  const handleClose = () => {
    setIsCartOpen(false);
    setTimeout(resetDrawer, 300);
  };

  const isFormValid = form.name && form.phone && (orderType === "pickup" || form.address);

  const handleRazorpay = () => {
    setLoading(true);
    const options = {
      key: "rzp_test_YourTestKeyHere",
      amount: totalPrice * 100,
      currency: "INR",
      name: "Shree Gurukripa",
      description: "Food Order",
      handler: function () {
        setLoading(false);
        clearCart();
        setStep(3);
      },
      prefill: {
        name: form.name,
        contact: form.phone,
      },
      theme: { color: "#f97316" },
      modal: {
        ondismiss: () => setLoading(false),
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleCOD = async () => {
    setLoading(true);
    try {
      const data = await createOrder({
        customer: { name: form.name, phone: form.phone, address: form.address },
        orderType,
        items: cartItems.map((i) => ({ name: i.name, price: i.price, qty: i.qty })),
        totalPrice,
        paymentMethod: "cod",
        paymentStatus: "pending",
      });

      // WhatsApp open karo
      if (data.whatsappLink) {
        window.open(data.whatsappLink, "_blank");
      }

      setLoading(false);
      clearCart();
      setStep(3);
    } catch (err) {
      setLoading(false);
      alert("Order failed! Please try again.");
    }
  };
  
  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={handleClose} />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[440px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>

        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {step > 1 && step < 3 && (
              <button onClick={() => setStep(step - 1)} className="text-gray-400 hover:text-gray-700 transition mr-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <h2 className="text-xl font-bold text-gray-900">
              {step === 1 ? "Your Cart" : step === 2 ? "Checkout" : "Order Placed!"}
            </h2>
            {step === 1 && totalItems > 0 && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">{totalItems}</span>
            )}
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-700 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ===== STEP INDICATOR ===== */}
        {step < 3 && (
          <div className="flex items-center px-6 py-3 gap-2">
            {["Cart", "Checkout"].map((label, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step > i ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-400"}`}>
                  {i + 1}
                </div>
                <span className={`text-sm font-medium ${step > i ? "text-orange-500" : "text-gray-400"}`}>{label}</span>
                {i === 0 && <div className={`h-0.5 w-12 rounded ${step > 1 ? "bg-orange-400" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
        )}

        {/* ===== STEP 1: CART ITEMS ===== */}
        {step === 1 && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <div className="rounded-full flex items-center justify-center" style={{ backgroundColor: "#FDDCB5", width: "80px", height: "80px" }}>
                    <svg style={{ width: "36px", height: "36px", color: "#E8853D" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg font-medium">Your cart is empty</p>
                  <p className="text-gray-400 text-sm">Add items from the menu</p>
                  <button onClick={handleClose} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold transition">
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.name} className="flex items-center gap-4 bg-[#FFF5EE] rounded-2xl p-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-base">{item.name}</h3>
                        <p className="text-orange-500 font-semibold">₹{item.price} × {item.qty} = <span className="text-gray-900">₹{item.price * item.qty}</span></p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(item.name, item.qty - 1)} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-orange-400 hover:text-orange-500 transition font-bold">−</button>
                        <span className="w-6 text-center font-bold text-gray-900">{item.qty}</span>
                        <button onClick={() => updateQty(item.name, item.qty + 1)} className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600 transition font-bold">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.name)} className="text-gray-300 hover:text-red-400 transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Total</span>
                  <span className="text-2xl font-bold text-gray-900">₹{totalPrice}</span>
                </div>
                <button onClick={() => setStep(2)} className="w-full bg-orange-500 hover:bg-orange-600 transition text-white py-4 rounded-xl font-bold text-lg">
                  Proceed to Checkout →
                </button>
              </div>
            )}
          </>
        )}

        {/* ===== STEP 2: CHECKOUT FORM ===== */}
        {step === 2 && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">

              {/* Order Type */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Order Type</p>
                <div className="grid grid-cols-2 gap-2">
                  {["delivery", "pickup"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setOrderType(type)}
                      className={`py-3 rounded-xl font-semibold text-sm border-2 transition-all ${orderType === type ? "border-orange-500 bg-orange-50 text-orange-600" : "border-gray-200 text-gray-500 hover:border-orange-200"}`}
                    >
                      {type === "delivery" ? "🚚 Delivery" : "🏪 Pickup"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Your Name *</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-orange-400 transition text-gray-700"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-orange-400 transition text-gray-700"
                />
              </div>

              {/* Address */}
              {orderType === "delivery" && (
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Delivery Address *</label>
                  <textarea
                    placeholder="Enter your full address..."
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    rows={3}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-orange-400 transition text-gray-700 resize-none"
                  />
                </div>
              )}

              {/* Pickup info */}
              {orderType === "pickup" && (
                <div className="bg-[#FFF5EE] rounded-xl p-4 flex gap-3">
                  <svg className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Pickup Location</p>
                    <p className="text-gray-500 text-xs mt-1">Royal Platinum Building, Scheme No 54, Vijay Nagar, Indore</p>
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-[#FFF5EE] rounded-xl p-4">
                <p className="font-semibold text-gray-800 text-sm mb-3">Order Summary</p>
                {cartItems.map((item) => (
                  <div key={item.name} className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{item.name} × {item.qty}</span>
                    <span>₹{item.price * item.qty}</span>
                  </div>
                ))}
                <div className="border-t border-orange-200 mt-2 pt-2 flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Payment Method</p>
                <div className="space-y-2">
                  {[
                    { value: "cod", label: "💵 Cash on Delivery", desc: "Pay when you receive" },
                    { value: "razorpay", label: "💳 Pay Online", desc: "UPI, Card, Net Banking" },
                  ].map((method) => (
                    <button
                      key={method.value}
                      onClick={() => setPaymentMethod(method.value)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${paymentMethod === method.value ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-200"}`}
                    >
                      <div className="text-left">
                        <p className={`font-semibold text-sm ${paymentMethod === method.value ? "text-orange-600" : "text-gray-700"}`}>{method.label}</p>
                        <p className="text-xs text-gray-400">{method.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.value ? "border-orange-500" : "border-gray-300"}`}>
                        {paymentMethod === method.value && <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Place Order Button */}
            <div className="border-t border-gray-100 px-6 py-5">
              <button
                onClick={paymentMethod === "razorpay" ? handleRazorpay : handleCOD}
                disabled={!isFormValid || loading}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${isFormValid && !loading ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
              >
                {loading ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : paymentMethod === "razorpay" ? "Pay ₹" + totalPrice : "Place Order 🎉"}
              </button>
            </div>
          </>
        )}

        {/* ===== STEP 3: SUCCESS ===== */}
        {step === 3 && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-5">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Order Placed!</h2>
            <p className="text-gray-500">Thank you <span className="font-semibold text-gray-700">{form.name}</span>! Your order has been received. We'll contact you on <span className="font-semibold text-gray-700">{form.phone}</span>.</p>
            <button onClick={handleClose} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition">
              Done 🎉
            </button>
          </div>
        )}

      </div>
    </>
  );
}