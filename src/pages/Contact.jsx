import { useState } from "react";

export default function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div>

      {/* ================= HERO ================= */}
      <section className="bg-white py-16 text-center">

        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Get in <span className="text-orange-500">Touch</span>
        </h1>

        <p className="text-gray-900 text-xl">
          We'd love to hear from you. Visit us or send us a message!
        </p>

      </section>


      {/* ================= 4 CONTACT CARDS ================= */}
      <section className="bg-[#FFF5EE] py-16 px-8 md:px-20">

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">

          {/* Phone */}
          <div className="bg-white rounded-2xl py-10 px-6 flex flex-col items-center text-center shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 gap-4">
            <div className="rounded-full flex items-center justify-center" style={{ backgroundColor: "#FDDCB5", width: "60px", height: "60px" }}>
              <svg style={{ width: "26px", height: "26px", color: "#E8853D" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Phone</h3>
            <a href="tel:+918871785707" className="text-orange-500 font-medium hover:text-orange-600 transition">+91 731 422 2202</a>
          </div>

          {/* WhatsApp */}
          <div className="bg-white rounded-2xl py-10 px-6 flex flex-col items-center text-center shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 gap-4">
            <div className="rounded-full flex items-center justify-center" style={{ backgroundColor: "#FDDCB5", width: "60px", height: "60px" }}>
              <svg style={{ width: "26px", height: "26px", color: "#E8853D" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg">WhatsApp</h3>
            <a href="https://wa.me/8871785707" className="text-orange-500 font-medium hover:text-orange-600 transition">Chat with us</a>
          </div>

          {/* Hours */}
          <div className="bg-white rounded-2xl py-10 px-6 flex flex-col items-center text-center shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 gap-4">
            <div className="rounded-full flex items-center justify-center" style={{ backgroundColor: "#FDDCB5", width: "60px", height: "60px" }}>
              <svg style={{ width: "26px", height: "26px", color: "#E8853D" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Hours</h3>
            <p className="text-gray-600 font-medium">Open till 12 AM</p>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl py-10 px-6 flex flex-col items-center text-center shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 gap-4">
            <div className="rounded-full flex items-center justify-center" style={{ backgroundColor: "#FDDCB5", width: "60px", height: "60px" }}>
              <svg style={{ width: "26px", height: "26px", color: "#E8853D" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Email</h3>
            <a href="mailto:info@shreegurukripa.com" className="text-orange-500 font-medium hover:text-orange-600 transition text-sm">info@shreegurukripa.com</a>
          </div>

        </div>

        {/* ================= FORM + MAP ================= */}
        {/* ================= FORM + MAP ================= */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="text-gray-700 font-medium text-sm mb-2 block">Your Name *</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 outline-none focus:border-orange-400 transition text-base"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium text-sm mb-2 block">Email Address *</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 outline-none focus:border-orange-400 transition text-base"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium text-sm mb-2 block">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 outline-none focus:border-orange-400 transition text-base"
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium text-sm mb-2 block">Message *</label>
                <textarea
                  placeholder="Your message..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 outline-none focus:border-orange-400 transition text-base resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 transition text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
                Send Message
              </button>

            </form>
          </div>

          {/* Visit Us + Map */}
          <div className="flex flex-col gap-6">

            {/* Address Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Visit Us</h2>
              <div className="flex gap-3 items-start">
                <div
                  className="rounded-full flex items-center justify-center shrink-0 mt-1"
                  style={{ backgroundColor: "#FDDCB5", width: "40px", height: "40px" }}
                >
                  <svg style={{ width: "18px", height: "18px", color: "#E8853D" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-base mb-1">Address</p>
                  <p className="text-gray-900 text-sm leading-relaxed">
                    Royal Platinum Building, Scheme No 54, behind Bombay Hospital,
                    Opp. Prestige College, Vijay Nagar, Scheme 54 PU4,
                    Indore, Madhya Pradesh 452010, India
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-sm flex-1">
              <iframe
                src="https://maps.google.com/maps?q=Vijay%20Nagar%20Indore&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="380"
                style={{ border: 0 }}
                loading="lazy"
                title="Restaurant Location"
              />
            </div>

          </div>

        </div>

      </section>


      {/* ================= PREFER DIRECT CONTACT ================= */}
      <section className="py-16 px-8 bg-white text-center">

        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Prefer Direct Contact?
        </h2>

        <div className="flex justify-center gap-4 flex-wrap">

          <a
            href="tel:+918871785707"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-full font-semibold"
          >
            Call Us Now
          </a>

          <a
            href="https://wa.me/8871785707"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3.5 rounded-full font-semibold"
          >
            WhatsApp Us
          </a>

        </div>

      </section>

    </div>
  );
}