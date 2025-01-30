import { motion } from "framer-motion";

const Services = () => {
  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden p-[2rem]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-[60rem] mx-auto backdrop-blur-lg bg-white/10 border border-white/20 p-[4rem] rounded-[2rem] text-white shadow-lg"
      >
        <h1 className="text-[4rem] font-bold text-center drop-shadow-lg">Our Services</h1>
        <p className="text-[1.6rem] text-center mb-[3rem] leading-relaxed">
          Explore our premium blogging services designed to enhance your reading and writing experience.
        </p>
        <div className="space-y-[2rem]">
          <div className="p-[2rem] bg-white/20 border border-white/30 rounded-[1rem] shadow-md">
            <h2 className="text-[2.4rem] font-semibold">Content Curation</h2>
            <p className="text-[1.6rem] mt-[1rem] leading-relaxed">
              We provide well-researched and engaging content across various domains to keep you informed and inspired.
            </p>
          </div>
          <div className="p-[2rem] bg-white/20 border border-white/30 rounded-[1rem] shadow-md">
            <h2 className="text-[2.4rem] font-semibold">Guest Blogging</h2>
            <p className="text-[1.6rem] mt-[1rem] leading-relaxed">
              Become a contributor and share your knowledge with a wide audience through our platform.
            </p>
          </div>
          <div className="p-[2rem] bg-white/20 border border-white/30 rounded-[1rem] shadow-md">
            <h2 className="text-[2.4rem] font-semibold">SEO Optimization</h2>
            <p className="text-[1.6rem] mt-[1rem] leading-relaxed">
              Improve your content's visibility with our SEO-friendly blog optimization services.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Services;
