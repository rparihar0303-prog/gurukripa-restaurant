const dishes = [
  {
    name: "Butter Paneer Malai",
    price: "₹280",
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
  },
  {
    name: "Dal Makhani",
    price: "₹220",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950",
  },
  {
    name: "Veg Noodles",
    price: "₹160",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
  },
  {
    name: "Guru Kripa Kofta",
    price: "₹290",
    image:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa0b3c",
  },
];

export default function Dishes() {
  return (
    <section className="px-20 py-20 bg-gray-100">

      <h2 className="text-3xl font-bold text-center mb-12">
        Our Signature Dishes
      </h2>

      <div className="grid grid-cols-4 gap-8">

        {dishes.map((dish, i) => (
          <div
            key={i}
            className="bg-white shadow rounded-xl overflow-hidden"
          >

            <img
              src={dish.image}
              alt={dish.name}
              className="h-40 w-full object-cover"
            />

            <div className="p-4">

              <h3 className="font-bold">{dish.name}</h3>

              <p className="text-orange-500">{dish.price}</p>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}
