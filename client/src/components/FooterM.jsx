
import {
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaPaperPlane,
} from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const FooterM = () => {
  return (
    <footer className="text-white bg-gray-900 pt-[90px]">
      {/* Top Section */}
      <div className="container grid grid-cols-1 gap-8 px-6 mx-auto text-center md:grid-cols-4 md:text-left mt-[10px] mb-[30px]">
        {/* Contact Info */}

        <div className="flex items-center gap-4">
          <p className="w-[80px] h-[80px] border-dotted border-[2px] border-[white] rounded-full flex justify-center items-center">
            <FaPhoneAlt size={30} />
          </p>
          <div>
            <p className="text-sm font-semibold">Call Us 7/24</p>
            <p className="text-lg font-bold">+208-555-0112</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="w-[80px] h-[80px] border-dotted border-[2px] border-[white] rounded-full flex justify-center items-center">
            <FaEnvelope size={30} />
          </p>

          <div>
            <p className="text-sm font-semibold">Make a Quote</p>
            <p className="text-lg font-bold">example@gmail.com</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="w-[80px] h-[80px] border-dotted border-[2px] border-[white] rounded-full flex justify-center items-center">
            <FaClock size={30} />
          </p>

          <div>
            <p className="text-sm font-semibold">Opening Hour</p>
            <p className="text-lg font-bold">Sunday - Fri: 9 AM - 6 PM</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="w-[80px] h-[80px] border-dotted border-[2px] border-[white] rounded-full flex justify-center items-center">
            <FaMapMarkerAlt size={30} />
          </p>

          <div>
            <p className="text-sm font-semibold">Location</p>
            <p className="text-lg font-bold">4517 Washington Ave.</p>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />

      {/* Bottom Section */}
      <div className="container grid grid-cols-1 gap-8 px-6 mx-auto md:grid-cols-4">
        {/* Logo and About */}
        <div>
          <h2 className="mb-4 text-[30px] font-bold ">Ecom <span className="text-red-500" >Arts</span></h2>
          <p className="text-gray-300 text-[15px]  font-[500]">
            Phasellus ultricies aliquam volutpat ullamcorper laoreet neque, a
            lacinia curabitur lacinia mollis.
          </p>
          <div className="flex gap-4 mt-4">
            <FaFacebookF className="text-xl cursor-pointer hover:text-red-500" />
            <FaTwitter className="text-xl cursor-pointer hover:text-red-500" />
            <FaYoutube className="text-xl cursor-pointer hover:text-red-500" />
            <FaLinkedin className="text-xl cursor-pointer hover:text-red-500" />
          </div>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="mb-4 text-xl font-semibold">Customer Support</h3>
          <ul className="space-y-6 text-gray-200 text-[16px] font-[500]">
            <li className="flex items-center gap-[10px]">
              <MdKeyboardDoubleArrowRight size={20} color="white" />
              <span>Store List</span>
            </li>
            <li className="flex items-center gap-[10px]">
              <MdKeyboardDoubleArrowRight size={20} color="white" />
              <span>Opening Hours</span>
            </li>
            <li className="flex items-center gap-[10px]">
              <MdKeyboardDoubleArrowRight size={20} color="white" />
              <span>Contact Us</span>
            </li>
            <li className="flex items-center gap-[10px]">
              <MdKeyboardDoubleArrowRight size={20} color="white" />
              <span>Return Policy</span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-xl font-semibold">Quick Links</h3>
          <ul className="space-y-6 text-gray-200 text-[16px] font-[500]">
            <li className="flex items-center gap-[10px]">
              <MdKeyboardDoubleArrowRight size={20} color="white" />
              <span>Privacy Policy</span>
            </li>
            <li className="flex items-center gap-[10px]">
              <MdKeyboardDoubleArrowRight size={20} color="white" />
              <span>Terms & Conditions</span>
            </li>
            <li className="flex items-center gap-[10px]">
              <MdKeyboardDoubleArrowRight size={20} color="white" />
              <span>FAQs</span>
            </li>
            <li className="flex items-center gap-[10px]">
              <MdKeyboardDoubleArrowRight size={20} color="white" />
              <span>Blog</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-4 text-xl font-semibold">Newsletter</h3>
          <p className="mb-4 text-gray-300 text-[14px] font-[500]">
            Sign up to receive weekly newsletters to get the latest updates.
          </p>
          <div className="flex items-center p-2 bg-gray-800 rounded-md">
            <input
              type="text"
              placeholder="Enter Email Address"
              className="flex-1 px-4 text-gray-400 bg-gray-800 outline-none"
            />
            <button className="p-2 bg-red-500 rounded-md hover:bg-red-600">
              <FaPaperPlane className="text-white" />
            </button>
          </div>
        </div>
      </div>
      <hr className="my-6 border-gray-700" />
        <p className="text-gray-200 pb-[30px] text-center text-[16px] font-[400] flex items-center justify-center gap-[3px]">
          <b className="text-[20px]">©</b> 
          <span>2023 EcomArts. All rights reserved by {'kushwahakamleshraj434@gmail.com'}.</span>
        </p>
    </footer>
  );
};

export default FooterM;
