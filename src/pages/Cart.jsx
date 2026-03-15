import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {

  const { cart, addToCart, decreaseQty, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const message = cart
    .map(
      (item) =>
        `${item.name} x${item.qty} - ₹${item.price * item.qty}`
    )
    .join("\n");

  const whatsappURL =
    `https://wa.me/918871785707?text=${encodeURIComponent(
      `Hello Shree Gurukripa 👋\n\nI want to order:\n\n${message}\n\nTotal: ₹${total}`
    )}`;

  return (
    <div className="max-w-5xl mx-auto py-20 px-6">

      <h1 className="text-4xl font-bold mb-10">
        Your Cart
      </h1>

      {cart.map((item) => (

        <div
          key={item.name}
          className="bg-white shadow rounded-xl p-6 flex justify-between items-center mb-4"
        >

          <div>

            <h3 className="font-bold text-lg">
              {item.name}
            </h3>

            <p className="text-gray-500">
              ₹{item.price}
            </p>

          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={() => decreaseQty(item.name)}
              className="bg-gray-200 px-3 rounded"
            >
              -
            </button>

            {item.qty}

            <button
              
              className="bg-gray-200 px-3 rounded"
            >
              +
            </button>

          </div>

          <button
            onClick={() => removeFromCart(item.name)}
            className="text-red-500"
          >
            Remove
          </button>

        </div>

      ))}

      <h2 className="text-2xl font-bold mt-8">
        Total: ₹{total}
      </h2>
      <Link
        to="/checkout"
        className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold mb-4"
      >
        Checkout
      </Link>

      <a
        href={whatsappURL}
        target="_blank"
        className="inline-block mt-6 bg-green-500 text-white px-8 py-3 rounded-full font-semibold"
      >
        Order on WhatsApp
      </a>

    </div>
  );
}