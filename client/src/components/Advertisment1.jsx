const Advertisement = () => {
  return (
    <div
      className="relative flex items-center justify-center h-screen text-white bg-center bg-cover"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1423666639041-f56000c27a9a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbnRhY3R8ZW58MHx8MHx8fDA%3D")`,
        position: "relative",
        height: "60vh",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="p-[3.2rem] flex flex-col gap-[1rem] text-center bg-opacity-50 rounded-lg md:p-[6.4rem]">
        <h4 className="font-serif text-[1.8rem] italic md:text-[2rem]">
          Connect to Basel & Co.
        </h4>
        <h1 className="mt-2 text-[42px] font-[500] md:text-6xl">
          Join Our Advertisement
        </h1>
        <p className="mt-4 text-[1.4rem]  md:text-[1.6rem] max-w-[430px] text-center mx-auto">
          Hey you, sign up! It only takes a second to be the first to find out
          about our latest news and promotions!
        </p>
        <div className="flex items-center justify-center mt-6">
          <div className="relative w-full md:w-2/3">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 text-black  bg-[#00000000] border-b-gray-300 border-b-[2px] outline-none hover:outline-none  rounded-l-md focus:outline-none"
            />
          </div>
          <button className="px-8 py-3 font-bold text-black bg-white rounded-r-md hover:bg-gray-100">
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
