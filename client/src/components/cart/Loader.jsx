
import logo from "../assets/loader.webp";

const Loader = () => {
  return (
    <div>
      <img
        className="w-12 h-12 mx-auto animate-spin"
        src={logo}
        alt="loading..."
      />
    </div>
  );
};

export default Loader;