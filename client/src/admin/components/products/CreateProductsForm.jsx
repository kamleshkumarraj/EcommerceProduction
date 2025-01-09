import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { useCreateProductsMutation } from "../../../store/slices/adminApi";
import {toast} from 'react-toastify'
import { toastUpdate } from "../../../helper/helper";
import { useError } from "../../../hooks/useError";
import { getSocket } from "../../../contexts/Socket";
import { NEW_PRODUCT_ADDED } from "../../../events";

function CreateProductForm() {
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);
  const [thumbnailFile , setThumbnailFile] = useState(null);
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
    setImagesFiles([...imagesFiles , ...newFiles])
  };

  const handleDropThumbnail = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
      setThumbnailFile(file)
    }
  };

  const handleDropImages = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setImages([
      ...images,
      ...droppedFiles.map((file) => URL.createObjectURL(file)),
    ]);
    setImagesFiles([...imagesFiles , ...droppedFiles])
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const [productsDetails, setProductsDetails] = useState({
    title: "",
    category: "",
    price: "",
    discountPercent: "",
    brand: "",
    minimumOrderQuantity: "",
    description: "",
    warrantyInformation: "",
    returnPolicy: "",
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
    price: [
      {
        isRequired: true,
        message: "Price must be required",
      },
    ],
    discountPercent: [
      {
        isRequired: true,
        message: "Discount must be required",
      },
    ],
    brand: [
      {
        isRequired: true,
        message: "Brand must be required",
      },
    ],
    minimumOrderQuantity: [
      {
        isRequired: true,
        message: "Minimum Order Quantity must be required",
      },
    ],
    description: [
      {
        isRequired: true,
        message: "Description must be required",
      },
    ],
    warrantyInformation: [
      {
        isRequired: true,
        message: "Warranty Information must be required",
      },
    ],
    returnPolicy: [
      {
        isRequired: true,
        message: "Return Policy must be required",
      },
    ],
    
  };

  const [errors , setErrors] = useState({
    title: "",
    category: "",
    price: "",
    discountPercent: "",
    brand: "",
    minimumOrderQuantity: "",
    description: "",
    warrantyInformation: "",
    returnPolicy: "",
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

  
  const [createProductsApi , {isError , error , data : productsData}] = useCreateProductsMutation();
  console.log(thumbnailFile)
  console.log(imagesFiles)
  useError([{error , isError}])
  const createProducts = async (e) => {
    e.preventDefault();
    
    const error = validateError(productsDetails)
    if(Object.keys(error).length > 0 ){
      console.log("We can't create product with errors")
      return;
    }
    if(!thumbnail || images.length == 0){
      console.log("Please upload thumbnail and at least one image")
      return;
    }
    const formData = new FormData();
    
    Object.entries(productsDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("thumbnail", thumbnailFile);
    imagesFiles.forEach((image) => {
      formData.append("images",image);
    });
    
    const toastId = toast.loading("Uploading the products ...")
    try {
      const {data} = await createProductsApi(formData)
      toastUpdate({toastId , message : "Product created successfully" , type : "success" })
      
      socket.emit(NEW_PRODUCT_ADDED , {message : "New product added successfully " , productsData : data?.data})

    } catch (error) {
      toastUpdate({toastId , message : error || "Error during creating products" , type : "error" })
    }
  }
  

  const inputHandler = (e) => {
    setErrors({
      title: "",
      category: "",
      price: "",
      discountPercent: "",
      brand: "",
      minimumOrderQuantity: "",
      description: "",
      warrantyInformation: "",
      returnPolicy: "",
    })
    setProductsDetails({ ...productsDetails, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r rounded-[2rem] from-blue-500 to-purple-500">
      <div className="w-full max-w-[140rem] p-8 bg-white rounded-lg shadow-lg bg-opacity-20 backdrop-blur-lg">
        <h2 className="mb-6 text-2xl font-bold text-white">Create Product</h2>
        <form onSubmit={createProducts}  className="space-y-4">
          <div id="row-1" className="grid grid-cols-3 gap-x-[2rem]">
            <div>
              <label className="block text-[1.6rem]  text-gray-800 font-[500]">
                Title
              </label>
              <input
                name="title"
                type="text"
                onChange={inputHandler}
                value={productsDetails.title}
                className={`w-full py-[1.8rem] border-b-blue-600 border-b-[2px] px-[1rem] text-white bg-gray-200 rounded-lg bg-opacity-40 focus:outline-none focus:border-[2.2px]  ${errors.title ? "border-red-500 border-b-red-500 focus:border-red-500 border-[2px]" : "border-green-500 focus:border-green-500"}`}
              />
              <span id="error" className="text-red-600 my-[1rem] text-[1.4rem] font-[500]" >{errors?.title}</span>
            </div>
            <div>
              <label className="block text-[1.6rem]  text-gray-800 font-[500]">
                Category
              </label>
              <input
                name="category"
                type="text"
                onChange={inputHandler}
                value={productsDetails.category}
                className={`w-full py-[1.8rem] border-b-blue-600 border-b-[2px] px-[1rem] text-white bg-gray-200 rounded-lg bg-opacity-40 focus:outline-none focus:border-[2.2px]  ${errors.category ? "border-red-500 border-b-red-500 focus:border-red-500 border-[2px]" : "border-green-500 focus:border-green-500" }`}
              />
              <span id="error" className="text-red-600 my-[1rem] text-[1.4rem] font-[500]" >{errors?.category}</span>
            </div>
            <div>
              <label className="block text-[1.6rem]  text-gray-800 font-[500]">
                Price
              </label>
              <input
                name="price"
                onChange={inputHandler}
                value={productsDetails.price}
                type="number"
                className={`w-full py-[1.8rem] border-b-blue-600 border-b-[2px] px-[1rem] text-white bg-gray-200 rounded-lg bg-opacity-40 focus:outline-none focus:border-[2.2px]  ${errors.price ? "border-red-500 border-b-red-500 focus:border-red-500 border-[2px]" : "border-green-500 focus:border-green-500" }`}
              />
              <span id="error" className="text-red-600 my-[1rem] text-[1.4rem] font-[500]" >{errors?.price}</span>
            </div>
          </div>

          <div id="row-2" className="grid grid-cols-3 gap-x-[2rem]">
            <div>
              <label className="block text-[1.6rem]  text-gray-800 font-[500]">
                Discount
              </label>
              <input
                type="number"
                onChange={inputHandler}
                value={productsDetails.discountPercent}
                name="discountPercent"
                className={`w-full py-[1.8rem] border-b-blue-600 border-b-[2px] px-[1rem] text-white bg-gray-200 rounded-lg   bg-opacity-40 focus:outline-none focus:border-[2.2px]  ${errors.discountPercent ? "border-red-500 border-b-red-500 focus:border-red-500 border-[2px]" : "border-green-500 focus:border-green-500" }`}
              />
              <span id="error" className="text-red-600 my-[1rem] text-[1.4rem] font-[500]" >{errors?.discountPercent}</span>
            </div>

            <div>
              <label className="block text-[1.6rem]  text-gray-800 font-[500]">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                onChange={inputHandler}
                value={productsDetails.brand}
                className={`w-full py-[1.8rem] border-b-blue-600 border-b-[2px] px-[1rem] text-white bg-gray-200 rounded-lg bg-opacity-40 focus:outline-none focus:border-[2.2px]  ${errors.brand ? "border-red-500 border-b-red-500 focus:border-red-500 border-[2px]" : "border-green-500 focus:border-green-500" }`}
              />
              <span id="error" className="text-red-600 my-[1rem] text-[1.4rem] font-[500]" >{errors?.brand}</span>
            </div>
            <div>
              <label className="block text-[1.6rem]  text-gray-800 font-[500]">
                Minimum Order Quantity
              </label>
              <input
                type="number"
                name="minimumOrderQuantity"
                onChange={inputHandler}
                value={productsDetails.minimumOrderQuantity}
                className={`w-full py-[1.8rem] border-b-blue-600 border-b-[2px] px-[1rem] text-white bg-gray-200 rounded-lg bg-opacity-40 focus:outline-none focus:border-[2.2px]  ${errors.minimumOrderQuantity ? "border-red-500 border-b-red-500 focus:border-red-500 border-[2px]" : "border-green-500 focus:border-green-500" }`}
              />
              <span id="error" className="text-red-600 my-[1rem] text-[1.4rem] font-[500]" >{errors?.minimumOrderQuantity}</span>
            </div>
          </div>

          <div id="row-3">
            <label className="block text-[1.6rem]  text-gray-800 font-[500]">
              Description
            </label>
            <textarea
              onChange={inputHandler}
              name="description"
              value={productsDetails.description}
              className={`w-full py-[1.8rem] border-b-blue-600 border-b-[2px] px-[1rem] text-white bg-gray-200 rounded-lg bg-opacity-40 focus:outline-none focus:border-[2.2px]  ${errors.description ? "border-red-500 border-b-red-500 focus:border-red-500 border-[2px]" : "border-green-500 focus:border-green-500" }`}
            ></textarea>
            <span id="error" className="text-red-600 my-[1rem] text-[1.4rem] font-[500]" >{errors?.description}</span>
          </div>

          <div id="row-4" className="grid gap-x-[2rem] grid-cols-2">
            <div>
              <label className="block text-[1.6rem]  text-gray-800 font-[500]">
                Warranty Information
              </label>
              <textarea
                onChange={inputHandler}
                name="warrantyInformation"
                value={productsDetails.warrantyInformation}
                className={`w-full py-[1.8rem] border-b-blue-600 border-b-[2px] px-[1rem] text-white bg-gray-200 rounded-lg bg-opacity-40 focus:outline-none focus:border-[2.2px]  ${errors.warrantyInformation ? "border-red-500 border-b-red-500 focus:border-red-500 border-[2px]" : "border-green-500 focus:border-green-500" }`}
              ></textarea>
              <span id="error" className="text-red-600 my-[1rem] text-[1.4rem] font-[500]" >{errors?.warrantyInformation}</span>
            </div>
            <div>
              <label className="block text-[1.6rem]  text-gray-800 font-[500]">
                Return Policy
              </label>
              <textarea
                onChange={inputHandler}
                name="returnPolicy"
                value={productsDetails.returnPolicy}
                className={`w-full py-[1.8rem] border-b-blue-600 border-b-[2px] px-[1rem] text-white bg-gray-200 rounded-lg bg-opacity-40 focus:outline-none focus:border-[2.2px]  ${errors.returnPolicy ? "border-red-500 border-b-red-500 focus:border-red-500 border-[2px]" : "border-green-500 focus:border-green-500" }`}
              ></textarea>
              <span id="error" className="text-red-600 my-[1rem] text-[1.4rem] font-[500]" >{errors?.returnPolicy}</span>
            </div>
          </div>

          <div id="row-5" className="grid gap-x-[2rem] grid-cols-2">
            <div>
              <label className="block text-[1.6rem]  text-gray-800 font-[500]">
                Availability Status
              </label>
              <select
                onChange={inputHandler}
                name="availabilityStatus"
                className={`w-full py-[1.8rem] border-b-blue-600 border-b-[2px] px-[1rem] text-white bg-gray-200 rounded-lg bg-opacity-40 focus:outline-none focus:border-[2.2px] `}
              >
                <option value="inStock">In Stock</option>

                <option value="outOfStock">Out of Stock</option>
              </select>
            </div>
            <div>
              <label className="block text-[1.6rem]  text-gray-800 font-[500]">
                Quantity
              </label>
              <input
                onChange={inputHandler}
                name="quantity"
                value={productsDetails.quantity}
                type="number"
                className={`w-full py-[1.8rem] border-b-blue-600 border-b-[2px] px-[1rem] text-white bg-gray-200 rounded-lg bg-opacity-40 focus:outline-none focus:border-[2.2px]  ${errors}`}
              />
              <span id="error" className="text-red-600 my-[1rem] text-[1.4rem] font-[500]" >{errors?.quantity}</span>
            </div>
          </div>

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

          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:border-[2.2px] "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProductForm;
