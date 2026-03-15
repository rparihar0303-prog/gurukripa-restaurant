const dishes = [
  {
    name: "Dal Bafle Special Thali",
    price: "₹350",
    desc: "Our signature dish – authentic Rajasthani experience",
    image: "/DalBati.png"
  },
  {
    name: "Butter Paneer Malai",
    price: "₹280",
    desc: "Creamy, rich paneer in butter gravy",
    image: "/PaneerButterMasala.jpg"
  },
  {
    name: "Dal Makhani",
    price: "₹220",
    desc: "Slow-cooked black lentils with butter",
    image: "/DalMakhani.jpg"
  },
  {
    name: "Guru Kripa Special Kofta",
    price: "₹290",
    desc: "Chef's special creation",
    image: "/MalaiKofta.jpg"
  }
];

export default function Dishes() {
    return (
        <section className="bg-[#F7F7F7] px-20 py-24">

            {/* Heading */}
            <div className="text-center mb-16">
                <h2 className="text-5xl font-extrabold text-gray-900">
                    Our <span className="text-orange-500">Signature Dishes</span>
                </h2>
                <p className="text-gray-500 mt-5 text-lg max-w-2xl mx-auto">
                    Explore our most loved dishes, crafted with authentic spices and
                    fresh ingredients
                </p>
            </div>


            {/* Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {dishes.map((dish, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group"
                    >

                        {/* Image */}
                        <div className="relative overflow-hidden">
                            <img
                                src={dish.image}
                                className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                            />

                            {/* Price badge */}
                            <span className="absolute top-4 right-4 bg-orange-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow">
                                {dish.price}
                            </span>
                        </div>


                        {/* Content */}
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {dish.name}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {dish.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Button */}
            <div className="flex justify-center mt-16">
                <a
                    href="/menu"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-4 rounded-full shadow-md transition flex items-center gap-2"
                >
                    View Full Menu →
                </a>
            </div>
        </section>
    );
}