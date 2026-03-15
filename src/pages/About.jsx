export default function About() {
  return (
    <div>

      {/* ================= HERO SECTION ================= */}
      <section className="bg-[#FFF5EE] py-24 text-center">
        <h1 className="text-6xl font-bold text-gray-950 mb-5">
          About <span className="text-orange-500">Shree Gurukripa</span>
        </h1>
        <p className="text-gray-600 text-xl">
          A beloved destination for authentic vegetarian cuisine in the heart of Indore
        </p>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="py-24 px-8 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center">

          {/* Left - Text */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-lg">
              Shree Gurukripa has been serving delicious vegetarian food in
              Indore for years. Located in the heart of Vijay Nagar, we have
              become a beloved destination for families, students, and food
              enthusiasts who appreciate authentic North Indian and Chinese
              vegetarian cuisine.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Our mission is to provide high-quality vegetarian food in a
              hygienic, family-friendly environment. We believe in using fresh
              ingredients and traditional cooking methods to create dishes
              that not only satisfy hunger but also create memorable dining
              experiences.
            </p>
          </div>

          {/* Right - Image with overlapping badge */}
          <div className="flex-1 relative">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
              alt="Restaurant Interior"
              className="w-full rounded-2xl shadow-lg object-cover h-[380px]"
            />
            <div className="absolute -bottom-6 left-6 bg-orange-500 text-white px-6 py-4 rounded-2xl shadow-lg">
              <p className="text-3xl font-bold">11,500+</p>
              <p className="text-sm font-medium">Happy Customers</p>
            </div>
          </div>

        </div>
      </section>


      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 px-8 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Why Choose <span className="text-orange-500">Us?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "Over 11,500+ satisfied customers",
              "Authentic North Indian & Chinese cuisine",
              "Hygienic and family-friendly environment",
              "Signature Dal Bafle Special Thali",
              "Open till midnight for late-night cravings",
              "Located conveniently in Vijay Nagar",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 flex items-center gap-4 
          transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer group"
              >
                <div className="bg-orange-100 rounded-full w-10 h-10 flex items-center justify-center shrink-0
          transition-all duration-300 group-hover:bg-orange-500">
                  <svg
                    className="w-5 h-5 text-orange-500 transition-all duration-300 group-hover:text-white"
                    fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium text-base">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="py-20 px-8 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1 */}
            <div className="bg-[#FFF5EE] rounded-2xl p-10 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer">
              <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality First</h3>
              <p className="text-gray-500 leading-relaxed">
                We use only the freshest ingredients and maintain the highest standards of food quality and preparation.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#FFF5EE] rounded-2xl p-10 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer">
              <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Authentic Taste</h3>
              <p className="text-gray-500 leading-relaxed">
                Every dish is prepared using traditional recipes and cooking methods to deliver authentic flavors.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#FFF5EE] rounded-2xl p-10 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer">
              <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Family Friendly</h3>
              <p className="text-gray-500 leading-relaxed">
                We provide a warm, welcoming environment perfect for families, friends, and celebrations.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= VISIT US ================= */}
      <section className="py-20 px-8 md:px-20 bg-[#FFF5EE]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">

          {/* Left - Text */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-5">Visit Us</h2>
            <p className="text-gray-700 leading-relaxed mb-8 text-lg">
              Conveniently located in Vijay Nagar, we're easily accessible and
              offer a comfortable dining experience. Whether you're a student
              from nearby colleges or a family looking for quality vegetarian
              food, we welcome you with open arms.
            </p>

            {/* Address Card */}
            <div className="bg-white rounded-2xl p-6 flex gap-5 items-start shadow-sm mb-4">
              <div
                className="rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#FDDCB5", width: "52px", height: "52px" }}
              >
                <svg style={{ width: "24px", height: "24px", color: "#E8853D" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base mb-1">Address</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Royal Platinum Building, Scheme No 54, behind Bombay
                  Hospital, Opp. Prestige College, Vijay Nagar, Scheme 54 PU4,
                  Indore, Madhya Pradesh 452010, India
                </p>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-2xl p-6 flex gap-5 items-center shadow-sm">
              <div
                className="rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#FDDCB5", width: "52px", height: "52px" }}
              >
                <svg style={{ width: "24px", height: "24px", color: "#E8853D" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base mb-1">Hours</p>
                <p className="text-gray-600 text-sm">Open till 12 AM</p>
              </div>
            </div>
          </div>

          {/* Right - 4 Images staggered grid */}
          <div className="flex-1 flex gap-4">

            {/* Left column */}
            <div className="flex flex-col gap-4 flex-1">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80"
                alt="Restaurant Interior"
                className="w-full h-56 object-cover rounded-2xl shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80"
                alt="Dining Area"
                className="w-full h-56 object-cover rounded-2xl shadow-md"
              />
            </div>

            {/* Right column - staggered */}
            <div className="flex flex-col gap-4 flex-1 mt-10">
              <img
                src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80"
                alt="Food"
                className="w-full h-56 object-cover rounded-2xl shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=80"
                alt="Restaurant"
                className="w-full h-56 object-cover rounded-2xl shadow-md"
              />
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}