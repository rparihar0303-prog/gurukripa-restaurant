export default function Testimonials() {

  const reviews = [
    {
      name: "Rajesh Kumar",
      time: "2 weeks ago",
      text: "Beautiful interior, good service & mouth watering food. The Dal Bafle is a must try!",
      rating: 5
    },
    {
      name: "Priya Sharma",
      time: "1 month ago",
      text: "Great vegetarian options and authentic taste. Family-friendly atmosphere.",
      rating: 4
    },
    {
      name: "Amit Patel",
      time: "3 weeks ago",
      text: "Best restaurant in Vijay Nagar! The Paneer Malai is absolutely delicious.",
      rating: 5
    }
  ];

  return (

    <section className="bg-white py-28 px-20">

      {/* Heading */}
      <div className="text-center mb-16">

        <h2 className="text-[52px] font-extrabold text-[#0f172a]">
          What Our <span className="text-[#f97316]">Customers Say</span>
        </h2>

        <p className="text-gray-500 mt-3 text-lg">
          Don't just take our word for it
        </p>

      </div>


      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">

        {reviews.map((review, index) => (

          <div
            key={index}
            className="bg-[#e8ded6] rounded-2xl p-8 shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
          >

            {/* Stars */}
            <div className="flex gap-1 mb-5">

              {[...Array(5)].map((_, i) => (

                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={i < review.rating ? "#f97316" : "#d1d5db"}
                  viewBox="0 0 24 24"
                  strokeWidth="0"
                  className="w-5 h-5"
                >
                  <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847 1.417 8.267L12 19.771l-7.417 4.091L6 15.595 0 9.748l8.332-1.73z" />
                </svg>

              ))}

            </div>


            {/* Text */}
            <p className="text-gray-700 text-[16px] leading-relaxed mb-6">
              {review.text}
            </p>


            {/* Bottom */}
            <div className="flex justify-between items-center">

              <span className="font-semibold text-[#0f172a] text-[16px]">
                {review.name}
              </span>

              <span className="text-gray-500 text-sm">
                {review.time}
              </span>

            </div>

          </div>

        ))}

      </div>

    </section>

  );
}