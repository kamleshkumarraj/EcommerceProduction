import logo from "../assets/Img/loader.webp"
export const InitialLoader = () => {
  return (
    <div className='flex bg-[#dbdada] fixed top-0  items-center justify-center w-full h-screen' >
      <img 
        className="w-[70px] h-[70px] mx-auto animate-spin"
        src={logo}
        alt="loading..."
      />
    </div>
  );
};
