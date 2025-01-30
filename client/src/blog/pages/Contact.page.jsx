import { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden p-[2rem]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-[50rem] mx-auto backdrop-blur-lg bg-white/10 border border-white/20 p-[4rem] rounded-[2rem] text-white shadow-lg"
      >
        <h1 className="text-[4rem] font-bold text-center drop-shadow-lg">Contact Us</h1>
        <p className="text-[1.6rem] text-center mb-[3rem] leading-relaxed">
          Have any questions or suggestions? Feel free to reach out to us!
        </p>
        <form onSubmit={handleSubmit} className="space-y-[2rem]">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-[1.5rem] text-[1.6rem] bg-white/20 border border-white/30 rounded-[1rem] placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-[1.5rem] text-[1.6rem] bg-white/20 border border-white/30 rounded-[1rem] placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-[1.5rem] text-[1.6rem] bg-white/20 border border-white/30 rounded-[1rem] placeholder-white focus:outline-none focus:ring-2 focus:ring-white h-[12rem]"
          ></textarea>
          <button
            type="submit"
            className="w-full p-[1.5rem] text-[1.8rem] font-semibold bg-white text-gray-900 rounded-[1rem] shadow-md hover:bg-gray-200 transition-all"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;