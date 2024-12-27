import React from "react";

const ReviewSection = () => {
  const reviews = [
    {
      name: "Masirul Islam",
      date: "March 20, 2024 at 2:37 pm",
      review:
        "Neque porro est qui dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Aelites port lacus quis enim var sed efficitur turpis gilla sed sit amet finibus eros. Lorem Ipsum is simply dummy",
      stars: 5,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU_TIpEbGConvxJa-0ov5dHJtths65_bsRzQ&s", // Replace with actual image link
    },
    {
      name: "Daniel Adam",
      date: "March 30, 2024 at 2:37 pm",
      review:
        "Neque porro est qui dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Aelites port lacus quis enim var sed efficitur turpis gilla sed sit amet finibus eros. Lorem Ipsum is simply dummy",
      stars: 5,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYiQVI64BOhcmcvgwR3TrgsgxkEyWmQCdz9g&s", // Replace with actual image link
    },
    {
        name: "Masirul Islam",
        date: "March 20, 2024 at 2:37 pm",
        review:
          "Neque porro est qui dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Aelites port lacus quis enim var sed efficitur turpis gilla sed sit amet finibus eros. Lorem Ipsum is simply dummy",
        stars: 5,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU_TIpEbGConvxJa-0ov5dHJtths65_bsRzQ&s", // Replace with actual image link
      },
      {
        name: "Daniel Adam",
        date: "March 30, 2024 at 2:37 pm",
        review:
          "Neque porro est qui dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Aelites port lacus quis enim var sed efficitur turpis gilla sed sit amet finibus eros. Lorem Ipsum is simply dummy",
        stars: 5,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYiQVI64BOhcmcvgwR3TrgsgxkEyWmQCdz9g&s", // Replace with actual image link
      },
  ];

  return (
    <div className="p-8 px-[80px]">
      <h2 className="mb-4 text-2xl font-bold">02 Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index} className="flex items-start mb-8">
          <img
            src={review.image}
            alt={review.name}
            className="self-center w-20 h-20 mr-4 rounded-full"
          />
          <div className="flex-1">
            <h3 className="font-bold text-[18px]">{review.name}</h3>
            <p className="text-[14px] text-gray-500">{review.date}</p>
            <p className="mt-2 text-[16px] text-gray-600 font-[500]">{review.review}</p>
            <button className="px-4 rounded-[20px] py-1 mt-2 text-white bg-red-500 ">
              Reply
            </button>
          </div>
          <div className="ml-4">
            {Array.from({ length: review.stars }).map((_, i) => (
              <span key={i} className="text-[28px] text-red-500">
                ★
              </span>
            ))}
          </div>
        </div>
      ))}
      <button className="fixed flex items-center justify-center w-12 h-12 text-2xl text-white bg-red-500 rounded-full bottom-4 right-4">
        ↑
      </button>
    </div>
  );
};

export default ReviewSection;
