const BASE_URL = "http://localhost:5000/api";

// ===== Customer: Order Place Karo =====
export const createOrder = async (orderData) => {
  try {
    const res = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    return await res.json();
  } catch (err) {
    console.error("❌ createOrder error:", err);
    return null;
  }
};

// ===== Admin: Saare Orders Lo =====
export const getOrders = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      console.error("❌ getOrders failed:", res.status);
      return [];  // ✅ null nahi, empty array
    }
    return await res.json();
  } catch (err) {
    console.error("❌ getOrders error:", err);
    return [];
  }
};

// ===== Admin: Order Status Update Karo =====
export const updateOrderStatus = async (id, status, token) => {
  try {
    const res = await fetch(`${BASE_URL}/orders/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      console.error("❌ updateOrderStatus failed:", res.status);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error("❌ updateOrderStatus error:", err);
    return null;
  }
};

// ===== Admin: Stats Lo =====
export const getStats = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/orders/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      console.error("❌ getStats failed:", res.status);
      // ✅ Default stats return karo taki dashboard crash na ho
      return { total: 0, pending: 0, preparing: 0, delivered: 0, revenue: 0 };
    }
    return await res.json();
  } catch (err) {
    console.error("❌ getStats error:", err);
    return { total: 0, pending: 0, preparing: 0, delivered: 0, revenue: 0 };
  }
};

// ===== Admin: Login =====
export const adminLogin = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (err) {
    console.error("❌ adminLogin error:", err);
    return {};
  }
};

// Analytics fetch
export const getAnalytics = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/orders/analytics`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Analytics error:", err);
    return null;
  }
};