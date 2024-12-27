import React from 'react';

const ContactUs = () => {
  return (
    <div className="relative overflow-hidden text-gray-800 bg-gray-100">
      {/* Parallax Header */}
      <div
        className="bg-cover bg-center h-[40rem] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbnRhY3R8ZW58MHx8MHx8fDA%3D')",
          backgroundAttachment: "fixed",
          backgroundSize : '100% 100%'
        }}
      >
        <h1 className="text-white text-[4rem] font-bold text-center drop-shadow-md">
          Contact Us
        </h1>
      </div>

      {/* Contact Information Section */}
      <main className="max-w-[90%] mx-auto py-[4rem]">
        <section className="mb-[4rem]">
          <h2 className="text-[2.4rem] font-semibold mb-[2rem] text-center">
            Get in Touch
          </h2>
          <p className="text-[1.6rem] leading-[2.4rem] text-center">
            We’re here to help! Reach out to us through any of the channels below or
            fill out the form, and we’ll get back to you promptly.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-[4rem] mb-[4rem]">
          {/* Contact Info */}
          <div className="flex flex-col gap-[2rem]">
            <div className="flex items-center gap-[2rem]">
              <span className="text-blue-600 text-[2rem]">☎</span>
              <div>
                <h3 className="text-[1.8rem] font-medium">Phone</h3>
                <p className="text-[1.6rem]">+1 123-456-7890</p>
              </div>
            </div>
            <div className="flex items-center gap-[2rem]">
              <span className="text-blue-600 text-[2rem]">✉</span>
              <div>
                <h3 className="text-[1.8rem] font-medium">Email</h3>
                <p className="text-[1.6rem]">support@ecommerce.com</p>
              </div>
            </div>
            <div className="flex items-center gap-[2rem]">
              <span className="text-blue-600 text-[2rem]">📍</span>
              <div>
                <h3 className="text-[1.8rem] font-medium">Address</h3>
                <p className="text-[1.6rem]">123 E-Commerce Street, Online City, 45678</p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col gap-[2rem]">
            <h3 className="text-[1.8rem] font-medium">Follow Us</h3>
            <div className="flex gap-[2rem]">
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 text-[1.6rem] underline"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 text-[1.6rem] underline"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 text-[1.6rem] underline"
              >
                Instagram
              </a>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="relative">
          <h2 className="text-[2.4rem] font-semibold mb-[2rem] text-center">
            Contact Form
          </h2>

          <div
            className="bg-cover bg-fixed bg-center rounded-[1rem] shadow-lg p-[4rem]"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbnRhY3R8ZW58MHx8MHx8fDA%3D')",
              backgroundSize : '100% 100%'
            }}
        
          >
            <form className="bg-white p-[4rem] rounded-[1rem] shadow-lg">
              <div className="mb-[2rem]">
                <label
                  htmlFor="name"
                  className="block text-[1.6rem] font-medium mb-[1rem]"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 p-[1rem] rounded-[0.5rem] text-[1.6rem]"
                />
              </div>

              <div className="mb-[2rem]">
                <label
                  htmlFor="email"
                  className="block text-[1.6rem] font-medium mb-[1rem]"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 p-[1rem] rounded-[0.5rem] text-[1.6rem]"
                />
              </div>

              <div className="mb-[2rem]">
                <label
                  htmlFor="message"
                  className="block text-[1.6rem] font-medium mb-[1rem]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Write your message"
                  className="w-full border border-gray-300 p-[1rem] rounded-[0.5rem] text-[1.6rem]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white text-[1.6rem] py-[1rem] px-[2rem] rounded-[0.5rem] hover:bg-blue-800"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      
    </div>
  );
};

export default ContactUs;
