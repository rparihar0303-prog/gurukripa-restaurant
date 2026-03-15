import { useCart } from "../context/CartContext";

export default function Checkout() {

  const { cart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-[#FFF5EE] min-h-screen py-16 px-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* ================= FORM ================= */}

        <div className="bg-white rounded-3xl p-8 shadow-sm">

          <h2 className="text-3xl font-bold mb-6">
            Checkout Details
          </h2>

          <form className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>


            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Phone
              </label>

              <input
                type="tel"
                placeholder="Enter phone number"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>


            {/* Address */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Address
              </label>

              <textarea
                rows="4"
                placeholder="Enter delivery address"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>


            {/* Order Type */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Order Type
              </label>

              <select className="w-full border rounded-xl px-4 py-3 outline-none focus:border-orange-500">

                <option>Delivery</option>

                <option>Pickup</option>

              </select>
            </div>


            {/* Order Button */}

            <button
              type="button"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold text-lg transition"
            >
              Place Order on WhatsApp
            </button>

          </form>

        </div>


        {/* ================= ORDER SUMMARY ================= */}

        <div className="bg-white rounded-3xl p-8 shadow-sm">

          <h2 className="text-3xl font-bold mb-6">
            Order Summary
          </h2>


          <div className="space-y-4">

            {cart.map((item, index) => (

              <div
                key={index}
                className="flex justify-between border-b pb-3"
              >

                <div>

                  <p className="font-semibold">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>

                </div>

                <p className="font-semibold text-orange-500">
                  ₹{item.price * item.quantity}
                </p>

              </div>

            ))}

          </div>


          {/* Total */}

          <div className="flex justify-between mt-6 text-xl font-bold">

            <span>Total</span>

            <span className="text-orange-500">
              ₹{total}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}