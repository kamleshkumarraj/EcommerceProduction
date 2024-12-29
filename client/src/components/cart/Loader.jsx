
// import logo from "../assets/loader.webp";
import logo from '../../assets/Img/loader.webp'
const Loader = () => {
  return (
    <div className='flex bg-[#474747f4] fixed top-0  items-center justify-center w-full h-screen z-[99999999]' >
      <img 
        className="w-[60px] h-[60px] mx-auto animate-spin"
        src={logo}
        alt="loading..."
      />
    </div>
  );
};

export default Loader;