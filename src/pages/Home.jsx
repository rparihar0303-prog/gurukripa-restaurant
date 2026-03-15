import Dishes from "../components/DishCard";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full min-h-[100svh] md:h-[90vh] md:min-h-[600px]">

        <img
          src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&q=80"
          alt="Indian Vegetarian Food"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <div className="w-full max-w-3xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-semibold mb-5 md:mb-6">
              🍽️ Pure Vegetarian • Vijay Nagar, Indore
            </div>

            <h1 className="text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.15] mb-4 md:mb-5">
              Delicious Vegetarian<br />
              Food in the<br />
              <span className="text-orange-400">Heart of Indore</span>
            </h1>

            <p className="text-white/85 text-sm sm:text-base md:text-xl mb-5 md:mb-8 max-w-xl mx-auto">
              Authentic North Indian & Chinese Vegetarian Cuisine
            </p>

            {/* Rating + Price */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-7 md:mb-10 flex-wrap">
              <span className="bg-orange-500 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-1.5 text-sm">
                ⭐ 3.9
                <span className="font-normal text-xs opacity-90">(11,500+ reviews)</span>
              </span>

              <span className="text-white/90 font-medium text-sm md:text-lg bg-white/10 px-4 py-2 rounded-full">
                ₹200–₹400 per person
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center max-w-xs sm:max-w-none mx-auto">

              <a
                href="/menu"
                className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 transition text-white px-8 py-3.5 rounded-full font-semibold text-base flex items-center justify-center gap-2"
              >
                View Menu →
              </a>

              <a
                href="https://wa.me/918871785707"
                className="bg-green-500 hover:bg-green-600 active:bg-green-700 transition text-white px-8 py-3.5 rounded-full font-semibold text-base flex items-center justify-center gap-2"
              >
                💬 Order on WhatsApp
              </a>

            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/60 rounded-full"></div>
          </div>
        </div>

      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="w-full bg-[#FFF5EE] py-10 md:py-16 px-4 md:px-8 lg:px-20">

        <div className="grid grid-cols-3 gap-3 md:gap-8 max-w-6xl mx-auto">

          {[
            { icon: "👥", value: "11,500+", label: "Happy Customers" },
            { icon: "⭐", value: "3.9/5", label: "Customer Rating" },
            { icon: "🕛", value: "12 AM", label: "Open Till Midnight" },
          ].map((item, i) => (

            <div
              key={i}
              className="bg-white rounded-2xl py-5 md:py-8 px-2 md:px-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl transition hover:-translate-y-1"
            >

              <div
                className="rounded-full flex items-center justify-center mb-2 md:mb-4 text-lg md:text-2xl"
                style={{ backgroundColor: "#FDDCB5", width: "42px", height: "42px" }}
              >
                {item.icon}
              </div>

              <h2 className="text-base sm:text-2xl md:text-4xl font-bold text-gray-900 mb-1">
                {item.value}
              </h2>

              <p className="text-gray-500 text-[9px] sm:text-xs md:text-base leading-tight">
                {item.label}
              </p>

            </div>

          ))}

        </div>
      </section>

      {/* ================= SIGNATURE DISHES ================= */}
      <Dishes />

      {/* ================= WELCOME SECTION ================= */}
      <section className="w-full bg-white py-14 md:py-24 lg:py-32 px-5 md:px-12 lg:px-24">

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-28 items-center">

          {/* Text */}
          <div className="text-center md:text-left">

            <h2 className="text-3xl sm:text-4xl lg:text-[58px] font-extrabold leading-tight lg:leading-[1.05] text-[#0f172a] mb-5 md:mb-8">
              Welcome to{" "}
              <span className="text-[#f97316]">
                Shree<br className="hidden md:block" />
                Gurukripa
              </span>
            </h2>

            <p className="text-sm md:text-[17px] text-gray-600 leading-relaxed mb-4">
              Located in the heart of Vijay Nagar, Indore, we've been serving
              delicious vegetarian food to families, students, and food
              enthusiasts.
            </p>

            <p className="text-sm md:text-[17px] text-gray-600 leading-relaxed mb-8 md:mb-10">
              From our signature Dal Bafle Special Thali to our creamy Butter
              Paneer Malai, every dish is prepared with fresh ingredients and
              traditional cooking methods.
            </p>

            <a
              href="/about"
              className="inline-flex items-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white px-8 py-3.5 rounded-full font-semibold shadow-lg transition text-base"
            >
              Learn More About Us →
            </a>

          </div>

          {/* Images */}
          <div className="flex flex-row items-end justify-center gap-3 md:gap-6">

            <div className="flex-1 max-w-[200px] md:max-w-[320px] h-[170px] sm:h-[220px] md:h-[260px] rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/GK_Restaurant2.webp"
                className="w-full h-full object-cover"
                alt="Restaurant"
              />
            </div>

            <div className="flex-1 max-w-[150px] md:max-w-[220px] h-[140px] sm:h-[190px] md:h-[230px] rounded-2xl overflow-hidden shadow-lg mb-4">
              <img
                src="/GK_Restaurant.webp"
                className="w-full h-full object-cover"
                alt="Restaurant"
              />
            </div>

          </div>

        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <Testimonials />

    </div>
  );
}