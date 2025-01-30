import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const About = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/random/1920x1080/?nature')",
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />

      {/* Glassmorphic Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 space-y-16">
        {/* Section 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl p-10 text-center text-white border shadow-lg backdrop-blur-lg bg-white/10 border-white/20 rounded-2xl"
        >
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            About Our Blog
          </h1>
          <p className="mt-4 text-lg leading-relaxed">
            Welcome to our blog, where creativity meets knowledge. We share
            insightful articles, latest trends, and in-depth guides on various
            topics. Our mission is to inspire and educate through
            well-researched and engaging content.
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl p-10 text-center text-white border shadow-lg backdrop-blur-lg bg-white/10 border-white/20 rounded-2xl"
        >
          <h2 className="text-3xl font-semibold text-white drop-shadow-lg">
            Our Vision
          </h2>
          <p className="mt-4 text-lg leading-relaxed">
            Our goal is to build a community of thinkers, learners, and creators
            who explore diverse subjects and push the boundaries of knowledge
            through engaging discussions and thought-provoking content.
          </p>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl p-10 text-center text-white border shadow-lg backdrop-blur-lg bg-white/10 border-white/20 rounded-2xl"
        >
          <h2 className="text-3xl font-semibold text-white drop-shadow-lg">
            Join Us
          </h2>
          <p className="mt-4 text-lg leading-relaxed">
            Be part of our journey. Follow our blog, contribute your ideas, and
            let’s create a space where learning never stops.
          </p>
          <div className="mt-6">
            <button className="px-6 py-2 text-lg font-semibold text-gray-900 transition-all bg-white rounded-lg shadow-md hover:bg-gray-200">
              Get Involved
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
