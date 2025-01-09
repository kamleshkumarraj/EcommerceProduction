import { FaCloudUploadAlt, FaUpload } from "react-icons/fa";
import "react-quill/dist/quill.bubble.css";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { getSocket } from "../../../contexts/Socket";

const WritePage = () => {
  const categories = ["health", "medical", "education"];

  // blog images method and variables.
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [imagesFiles, setImagesFiles] = useState([]);
  const socket = getSocket();

  // file uploader funcanalities.

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
      setThumbnailFile(file);
    }
  };

  const handleImagesChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setImages([
      ...images,
      ...newFiles.map((file) => URL.createObjectURL(file)),
    ]);
    setImagesFiles([...imagesFiles, ...newFiles]);
  };

  const handleDropThumbnail = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
      setThumbnailFile(file);
    }
  };

  const handleDropImages = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setImages([
      ...images,
      ...droppedFiles.map((file) => URL.createObjectURL(file)),
    ]);
    setImagesFiles([...imagesFiles, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const [blogDetails, setBlogDetails] = useState({
    title: "",
    category: "",
    content: "",
    summary: "",
    slug: "",
  });

  const errorConfig = {
    title: [
      { isRequired: true, message: "Title must be required" },
      { minLength: 10, message: "Title must be at least 10 characters long" },
      { maxLength: 100, message: "Title must be at most 100 characters long" },
    ],
    category: [
      { isRequired: true, message: "Category must be required" },
      { minLength: 5, message: "Category must be at least 5 characters long" },
      { maxLength: 50, message: "Category must be at most 50 characters long" },
    ],
    summary: [
      {
        isRequired: true,
        message: "Summary must be required",
      },
      {
        minLength: 10,
        message: "Summary must be at least 10 characters long",
      },
      {
        maxLength: 200, // Adjust the maximum length as needed
        message: "Summary must be at most 200 characters long",
      },
    ],
    slug: [
      {
        isRequired: true,
        message: "Slug must be required",
      },
      {
        minLength: 5, // Adjust the minimum length as needed
        message: "Slug must be at least 5 characters long",
      },
      {
        maxLength: 50, // Adjust the maximum length as needed
        message: "Slug must be at most 50 characters long",
      },
    ],
    content: [
      {
        isRequired: true,
        message: "Description must be required",
      },
      {
        minLength: 10, // Adjust the minimum length as needed
        message: "Description must be at least 10 characters long",
      },
      {
        maxLength: 200, // Adjust the maximum length as needed
        message: "Description must be at most 200 characters long",
      },
    ],
  };

  const [errors, setErrors] = useState({
    title: "",
    category: "",
    content: "",
    summary: "",
    slug: "",
  });

  const validateError = (data) => {
    const error = {};
    Object.entries(data).forEach(([key, value]) => {
      errorConfig[key]?.some((errorRule) => {
        if (errorRule.isRequired && !value.trim()) {
          error[key] = errorRule.message;
          return true;
        }
        if (errorRule.minLength && value.length < errorRule.minLength) {
          error[key] = errorRule.message;
          return true;
        }
        if (errorRule.maxLength && value.length > errorRule.maxLength) {
          error[key] = errorRule.message;
          return true;
        }
      });
    });
    setErrors(error);
    return error;
  };

  const uploadNews = async (e) => {
    e.preventDefault();
  };
  const inputHandler = (e) => {
    setErrors({
      title: "",
      category: "",
      content: "",
      summary: "",
      slug: "",
    });
    setBlogDetails({ ...blogDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-[4rem] bg-[#6b6b746a] flex flex-col gap-[4rem]  items-center w-full ">
      <h1 className="text-[2.4rem] ">Create you news</h1>
      <form
        method="post"
        encType="multipart/form-data"
        action="http://localhost:5000/api/v1/news/admin/uploads-news"
        onSubmit={uploadNews}
        className=" w-full border-[1px]  gap-[4rem]  flex-col p-[2rem] lg:grid-cols-1 grid grid-cols-1 border-[#f3f0f038] rounded-[1rem]"
      >
        <div className="grid grid-cols-2 gap-[2rem]" id="row-1">
          <div
            id="left"
            className=" items-center w-full  gap-[4rem] flex  flex-col p-[2rem] lg:px-[5rem]"
          >
            <div id="title" className="w-full">
              <input
                className="text-[1.8rem]  w-full font-[600] px-[1.5rem] py-[1rem] foucus:border-none focus:outline-none  border-[#00000022] focus:border-[2px] bg-[#00000089] text-[white] focus:border-[#015107] focus:rounded-[.75rem]  rounded-t-[.5rem]  border-[blue] border-b-[2px] placeholder:text-white"
                type="text"
                placeholder="Title"
                name="title"
                value={blogDetails.title}
                onChange={inputHandler}
              />
            </div>
            <div id="cate" className="w-full">
              <select
                className="text-[1.8rem] font-[600] px-[1.5rem] py-[1rem] foucus:border-none focus:outline-none  border-[#00000022] focus:border-[2px] bg-[#00000089] text-[white] focus:border-[#015107] focus:rounded-[.75rem]  rounded-t-[.5rem]  border-[blue] border-b-[2px] w-full placeholder:text-gray-600"
                onChange={inputHandler}
                name="category"
              >
                {categories.length > 0 &&
                  categories.map((cate) => {
                    return (
                      <option key={cate} value={cate}>
                        {cate}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div id="content" className="flex flex-col w-full">
              <label className="text-[1.8rem] px-[2rem] py-[1rem]" htmlFor="">
                Enter your content here
              </label>
              <textarea
                onChange={inputHandler}
                className="text-[1.8rem] font-[600] w-full px-[1.5rem] py-[1rem] foucus:border-none focus:outline-none  border-[#00000022] focus:border-[2px] bg-[#00000089] text-[white] focus:border-[#015107] focus:rounded-[.75rem]  rounded-t-[.5rem]  border-[blue] border-b-[2px] placeholder:text-gray-600"
                name="content"
                rows={2}
                id=""
                value={blogDetails.content}
              ></textarea>
            </div>
          </div>
          <div
            id="right"
            className="items-center w-full  gap-[4rem] flex  flex-col p-[2rem] lg:px-[5rem]"
          >
            <div id="slug" className="w-full">
              <input
                className="text-[1.8rem]  w-full font-[600] px-[1.5rem] py-[1rem] foucus:border-none focus:outline-none  border-[#00000022] focus:border-[2px] bg-[#00000089] text-[white] focus:border-[#015107] focus:rounded-[.75rem]  rounded-t-[.5rem]  border-[blue] border-b-[2px] placeholder:text-white"
                type="text"
                placeholder="Slug"
                name="slug"
                value={blogDetails.slug}
                onChange={inputHandler}
              />
            </div>
            <div id="summary" className="flex flex-col w-full">
              <label className="text-[1.8rem] px-[2rem] py-[1rem]" htmlFor="">
                Enter Summary for news
              </label>
              <textarea
                onChange={inputHandler}
                value={blogDetails.summary}
                name="summary"
                className="text-[1.8rem] font-[600] w-full px-[1.5rem] py-[1rem] foucus:border-none focus:outline-none  border-[#00000022] focus:border-[2px] bg-[#00000089] text-[white] focus:border-[#015107] focus:rounded-[.75rem]  rounded-t-[.5rem]  border-[blue] border-b-[2px] placeholder:text-gray-600"
                rows={2}
                id=""
              ></textarea>
            </div>
          </div>
        </div>
        <div id="file-uploading">
          <div id="row-6">
            <p className="mb-2 text-white text-[1.6rem]">Upload Thumbnail</p>
            <div
              className="p-2 mb-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-400"
              onDragOver={handleDragOver}
              onDrop={handleDropThumbnail}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="thumbnailInput"
                onChange={handleThumbnailChange}
              />
              <label
                htmlFor="thumbnailInput"
                className="flex flex-col items-center justify-center h-20 text-gray-50"
              >
                <FaUpload className="mb-2 text-3xl" />
                <span>Drag & drop or click to upload Thumbnail</span>
              </label>
              {thumbnail && (
                <div className="mt-4">
                  <img
                    src={thumbnail}
                    alt="Thumbnail Preview"
                    className="object-cover h-[10rem] rounded-lg"
                  />
                </div>
              )}
            </div>
            <p className="mb-2 text-white text-[1.6rem]">Upload Images</p>
            <div
              className="p-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-400"
              onDragOver={handleDragOver}
              onDrop={handleDropImages}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="imagesInput"
                multiple
                onChange={handleImagesChange}
              />
              <label
                htmlFor="imagesInput"
                className="flex flex-col items-center justify-center text-gray-50 h-44"
              >
                <FaUpload className="mb-2 text-3xl" />
                <span>Drag & drop or click to upload Images</span>
              </label>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`Preview ${index}`}
                      className="object-cover h-[10rem] rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        

        <div
        id="submit"
        className="px-[4rem] hover:top-[-1%] transition-all relative py-[1.5rem] text-[1.8rem] border bg-[#7304d3] rounded-[.5rem] self-start text-white hover:cursor-pointer"
        style={{ transition: "all 5s linear" }}
      >
        <input
          className="border-none outline-none"
          type="submit"
          value={"Publish"}
        />
      </div>
      </form>
    </div>
  );
};

export default WritePage;
