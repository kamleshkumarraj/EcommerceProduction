
import { BiDislike, BiLike, BiShare } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { LiaDownloadSolid } from "react-icons/lia";

const ButtonGroup = () => {
  return (
    <div className="flex px-4 py-2 space-x-4 text-white bg-[#0F172A] rounded-lg">
      {/* Like and Dislike */}
      <div className="flex items-center px-8 py-4 space-x-4 bg-gray-800 rounded-full">
        <BiLike size={24} />
        <span className="text-[1.6rem]">0</span>
        <p className="border-r-[1px] py-[1.2rem] border-r-white"></p>
        <BiDislike size={24} />
        <span className="text-[1.6rem]">5</span>
      </div>

      {/* Share */}
      <button className="flex items-center px-4 py-2 space-x-2 bg-gray-800 rounded-full">
        <BiShare size={24} />
        <span className="text-[1.6rem]">Share</span>
      </button>

      {/* Download */}
      <button className="flex items-center px-6 py-3 space-x-2 bg-gray-800 rounded-full">
        <LiaDownloadSolid size={'20'} />
        <span className="text-[1.4rem]">Download</span>
      </button>

      {/* Save */}
      <button className="flex items-center px-6 py-3 space-x-4 bg-gray-800 rounded-full">
        <BsBookmark size={20} />
        <span className="text-[1.5rem]">Save</span>
      </button>
    </div>
  );
};

export default ButtonGroup;
