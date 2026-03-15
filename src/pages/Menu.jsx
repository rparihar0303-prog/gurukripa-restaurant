import { useState, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext";

const menuData = [
  {
    category: "🌟 Must Try",
    items: [
      { name: "Dal Bafle Special Thali", desc: "Traditional Rajasthani thali with dal bafle & churma — House Specialty!", price: 350, image: "src/assets/DalBati.png" },
      { name: "Paneer Butter Masala", desc: "Rich and creamy dish made of mildly sweet gravy with butter, cashew paste, tomato gravy and traditional spices", price: 294, image: "src/assets/PaneerButterMasala.jpg" },
      { name: "Malai Kofta", desc: "Celebratory dish — cashew and vegetables stuffed cottage cheese dumplings in a sweet saffron cream gravy", price: 286, image: "src/assets/MalaiKofta.jpg" },
      { name: "Today Special Paneer", desc: "Gurukripa style rich, very flavorful & delicious paneer dish in yello gravy — big paneer pieces!", price: 363, image: "src/assets/SpecialPanner.jpg" },
      { name: "Veg Biryani", desc: "Rice and veggies cooked in fragrant masala seasoned with Indian whole spices, served with raita", price: 226, image: "src/assets/VegBiryani.webp" },
      { name: "Crispy Corn", desc: "Fresh corn kernels deep fried and flavoured with white pepper, rock salt, spring onions and capsicum", price: 269, image: "src/assets/CrispyCorn.jpg" },
    ],
  },
  {
    category: "Starters & Snacks",
    items: [
      { name: "Paneer Tikka Dry (6 Pcs)", desc: "Cottage cheese slices marinated with barbeque seasoning and roasted in tandoor to a light crispiness", price: 320, image: "src/assets/PannerTikka.jpg" },
      { name: "Hara Bhara Kabab", desc: "Nutritious vegetarian kebab made with fresh spinach and green peas. Served with mint chutney", price: 252, image: "src/assets/HaraBharaKabab.jpg" },
      { name: "Honey Chilli Potato", desc: "Potato strips fried to perfection and slathered in honey chilli sauce topped with sesame seeds", price: 269, image: "src/assets/HoneyChilliPotato.jpg" },
      { name: "Veg Manchurian", desc: "Indo Chinese favourite — fresh veggies cooked in tangy Manchurian sauce", price: 269, image: "src/assets/Manchurian.jpg" },
      { name: "Chilli Paneer", desc: "Crispy paneer with garlic, onions, green chillies tossed in soya sauce and home made chili sauce", price: 314, image: "src/assets/ChilliPaneer.jpg" },
      { name: "Veg Lollipop", desc: "Flavourful sticks made of chopped vegetables and spices blend together fried deep to a lip smacking taste", price: 177, image: "src/assets/VegLolipop.jpg" },
    ],
  },
  {
    category: "Soups & Salads",
    items: [
      { name: "Tomato Soup", desc: "Classic creamy tomato soup", price: 276, image: "src/assets/TomatoSoup.jpg" },
      { name: "Sweet Corn Soup", desc: "Thick sweet corn soup with vegetables", price: 164, image: "src/assets/SweetCornSoup.jpg" },
      { name: "Hot & Sour Soup", desc: "Hot and sour soup made from juicy fresh assorted vegetables with special blend of Indian spices", price: 164, image: "src/assets/Hot&SourSoup.jpg" },
    ],
  },
  {
    category: "Main Course — Paneer",
    items: [
      { name: "Shahi Paneer", desc: "Cubes of paneer simmered in a creamy curry with mild and sweet undertones of whole spices", price: 294, image: "src/assets/ShahiPaneer.jpg" },
      { name: "Kadai Paneer", desc: "Paneer chunks in spicy kadhai masala flavors with toppings of onion and capsicum", price: 304, image: "src/assets/KadaiPaneer.jpg" },
      { name: "Palak Paneer", desc: "Juicy chunks of paneer cooked in creamy gravy with nutritious spinach", price: 279, image: "src/assets/PalakPaneer.jpg" },
      { name: "Paneer Tikka Masala", desc: "Marinated cottage cheese grilled to perfection and cooked in tomato-onion based curry", price: 295, image: "src/assets/PaneerTikkaMasala.jpg" },
      { name: "Paneer Handi", desc: "Cottage cheese and onions stir fried and tossed in a mildly spiced masala", price: 311, image: "src/assets/PannerHandi.jpeg" },
    ],
  },
  {
    category: "Main Course — Veg & Dal",
    items: [
      { name: "Dal Makhani", desc: "Black lentil slow-cooked in a creamy, buttery and slightly spicy gravy", price: 244, image: "src/assets/DalMakhani.jpg" },
      { name: "Dal Tadka", desc: "Flavourful dal made with boiled yellow lentil, tomatoes, onions tempered with spices", price: 226, image: "src/assets/DalTadka.webp" },
      { name: "Veg Kolhapuri", desc: "Delicious, spicy & flavorful dish made with vegetables, onions, tomatoes, ginger, garlic & fresh ground spices", price: 269, image: "src/assets/VegKolhapuri.jpg" },
      { name: "Navratan Korma", desc: "Exotic Indian recipe of assorted vegetables tossed in creamy spiced sauce", price: 286, image: "src/assets/NavratanKorma.jpg" },
      { name: "Veg Patiala", desc: "Aromatic mixture of vegetables in incredible curry sauce made with paneer, tomato, onion and spices", price: 337, image: "src/assets/VegPatiala.jpg" },
    ],
  },
  {
    category: "Rice & Breads",
    items: [
      { name: "Special Dum Biryani", desc: "Aromatic dum-cooked biryani with fresh vegetables and whole spices", price: 320, image: "src/assets/DumBiryani.jpg" },
      { name: "Jeera Rice", desc: "Aromatic basmati rice cooked with cumin and flavourful spices", price: 150, image: "src/assets/JeeraRice.jpg" },
      { name: "Butter Naan", desc: "Soft leavened bread brushed with butter from tandoor", price: 89, image: "src/assets/ButterNaan.jpg" },
      { name: "Garlic Naan", desc: "Tandoor-baked naan with fresh garlic & butter", price: 115, image: "src/assets/GarlicNaan.jpg" },
      { name: "Tandoori Roti", desc: "Classic tandoor-baked whole wheat roti", price: 19, image: "src/assets/TandooriRoti.jpg" },
    ],
  },
  {
    category: "Sweets & Drinks",
    items: [
      { name: "Gulab Jamun", desc: "Sweet dumplings made with maida and kova, soaked in sugar syrup", price: 220, image: "src/assets/GulabJamun.jpg" },
      { name: "Rasmalai (2 Piece)", desc: "Flattened balls of chhana soaked in malai flavoured with cardamom", price: 160, image: "src/assets/Rasmalai.jpg" },
      { name: "Lassi", desc: "Thick chilled yogurt-based traditional drink", price: 65, image: "src/assets/Lassi.webp" },
      { name: "Jaljeera", desc: "Cooling cumin-based traditional digestive drink", price: 45, image: "src/assets/Jaljeera.webp" },
    ],
  },
];

export default function Menu() {
  const { addToCart, cartItems, updateQty: cartUpdateQty } = useCart();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = ["All Categories", ...menuData.map((m) => m.category)];

  const filteredMenu = menuData
    .filter((cat) => selectedCategory === "All Categories" ? true : cat.category === selectedCategory)
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.desc.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  // Drinks jinka poora glass dikhna chahiye
  const containImages = ["Lassi", "Jaljeera"];
  const getImgClass = (name, extra = "") =>
    `h-full w-full ${containImages.includes(name) ? "object-contain bg-white p-2" : "object-cover"} ${extra}`;

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="bg-white py-10 md:py-16 text-center px-4">
        <div className="rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: "#FDDCB5", width: "64px", height: "64px" }}>
          <svg style={{ width: "28px", height: "28px", color: "#E8853D" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 21h6m-6 0v-3m6 3v-3M9 18h6M7.5 8.25A4.5 4.5 0 0112 3.75a4.5 4.5 0 014.5 4.5c0 1.63-.864 3.056-2.156 3.844L14.25 18H9.75l-.094-5.906A4.502 4.502 0 017.5 8.25z" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-3 md:mb-4">
          Our <span className="text-orange-500">Menu</span>
        </h1>
        <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto mb-8 md:mb-10">
          Explore our delicious vegetarian offerings crafted with authentic flavors
        </p>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3 px-4 md:px-8 max-w-4xl mx-auto">
          <div className="flex items-center bg-white border-2 border-orange-100 rounded-full px-5 py-3 w-full shadow-sm hover:border-orange-300 transition focus-within:border-orange-400 focus-within:shadow-md">
            <svg className="w-5 h-5 text-orange-400 mr-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input type="text" placeholder="Search dishes..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none text-gray-700 bg-transparent text-base placeholder-gray-400" />
          </div>
          <div className="relative w-full sm:w-auto shrink-0" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between gap-3 border-2 border-orange-100 rounded-full px-5 py-3 text-gray-700 bg-white cursor-pointer hover:border-orange-300 transition font-medium min-w-[180px]">
              <span className="truncate">{selectedCategory}</span>
              <svg className={`w-4 h-4 text-orange-500 transition-transform duration-300 shrink-0 ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute top-full mt-2 right-0 w-full min-w-[220px] bg-white border border-orange-100 rounded-2xl shadow-xl z-50 max-h-72 overflow-y-auto">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => { setSelectedCategory(cat); setDropdownOpen(false); }}
                    className={`w-full text-left px-5 py-2.5 text-sm font-medium transition hover:bg-orange-50 hover:text-orange-500 first:rounded-t-2xl last:rounded-b-2xl ${selectedCategory === cat ? "bg-orange-500 text-white hover:bg-orange-500 hover:text-white" : "text-gray-700"}`}>
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= MENU ITEMS ================= */}
      <section className="bg-[#FFF5EE] px-4 md:px-8 lg:px-20 py-10 md:py-16">
        <div className="max-w-6xl mx-auto">
          {filteredMenu.map((category, i) => (
            <div key={i} className="mb-10 md:mb-14">
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <h2 className="text-xl md:text-3xl font-bold text-gray-900 whitespace-nowrap">{category.category}</h2>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-orange-400 to-transparent rounded-full" />
              </div>

              {/* Mobile: horizontal scroll */}
              <div className="md:hidden flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory" style={{scrollbarWidth:"none"}}>
                {category.items.map((item, index) => {
                  const cartItem = cartItems.find((i) => i.name === item.name);
                  return (
                    <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden flex-shrink-0 snap-start flex flex-col" style={{width:"72vw", maxWidth:"280px", height:"300px"}}>
                      <div className="relative h-36 overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className={getImgClass(item.name)} />
                        <div className="absolute top-2 left-2 bg-white rounded px-2 py-0.5 flex items-center gap-1 shadow-sm">
                          <div className="w-3 h-3 rounded-sm border-2 border-green-600 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                          </div>
                          <span className="text-xs font-semibold text-green-700">Veg</span>
                        </div>
                      </div>
                      <div className="p-3 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-gray-900 text-sm leading-tight">{item.name}</h3>
                          <span className="text-orange-500 font-bold text-base ml-2 shrink-0">₹{item.price}</span>
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-1">{item.desc}</p>
                        <div className="mt-3">
                          {cartItem ? (
                            <div className="flex items-center justify-between bg-[#FFF5EE] rounded-xl p-1">
                              <button onClick={() => cartUpdateQty(item.name, cartItem.qty - 1)} className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition font-bold text-lg">−</button>
                              <span className="font-bold text-gray-900 text-sm">{cartItem.qty}</span>
                              <button onClick={() => cartUpdateQty(item.name, cartItem.qty + 1)} className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600 transition font-bold text-lg">+</button>
                            </div>
                          ) : (
                            <button onClick={() => addToCart(item)} className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all py-2 rounded-xl font-semibold flex items-center justify-center gap-1 text-xs">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop: normal grid */}
              <div className="hidden md:grid md:grid-cols-3 gap-6">
                {category.items.map((item, index) => {
                  const cartItem = cartItems.find((i) => i.name === item.name);
                  return (
                    <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                      <div className="relative h-44 overflow-hidden">
                        <img src={item.image} alt={item.name} className={getImgClass(item.name, "hover:scale-105 transition-transform duration-500")} />
                        <div className="absolute top-3 left-3 bg-white rounded px-2 py-0.5 flex items-center gap-1 shadow-sm">
                          <div className="w-3 h-3 rounded-sm border-2 border-green-600 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                          </div>
                          <span className="text-xs font-semibold text-green-700">Veg</span>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-gray-900 text-lg leading-tight">{item.name}</h3>
                          <span className="text-orange-500 font-bold text-xl ml-2 shrink-0">₹{item.price}</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                        {cartItem ? (
                          <div className="flex items-center justify-between bg-[#FFF5EE] rounded-xl p-1">
                            <button onClick={() => cartUpdateQty(item.name, cartItem.qty - 1)} className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition font-bold text-lg">−</button>
                            <span className="font-bold text-gray-900">{cartItem.qty}</span>
                            <button onClick={() => cartUpdateQty(item.name, cartItem.qty + 1)} className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600 transition font-bold text-lg">+</button>
                          </div>
                        ) : (
                          <button onClick={() => addToCart(item)} className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SPECIAL DIETARY ================= */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto rounded-3xl py-8 px-6 md:px-16 text-center"
          style={{ background: "linear-gradient(135deg, #FFF0E8, #FFE4D6)" }}>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Special Dietary Requirements?</h2>
          <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">
            We can customize dishes to suit your taste preferences. Please inform our staff about any dietary restrictions or special requests.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            {["Jain Food Available", "Less Spicy Options", "Extra Spicy Options"].map((tag) => (
              <span key={tag} className="bg-white text-gray-700 px-5 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md hover:text-orange-500 transition cursor-pointer">{tag}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}