import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import bannerImg1 from "../assets/Banner/banner-img-1.jpg";
import bannerImg2 from "../assets/Banner/banner-img-2.webp";
import bannerImg3 from "../assets/Banner/banner-img-3.png";
import bannerImg4 from "../assets/Banner/banner-img-4.jpg";
import bannerImg5 from "../assets/Banner/banner-img-5.jpg";
import bannerImg6 from "../assets/Banner/banner-img-6.jpg";
import bannerImg7 from "../assets/Banner/banner-img-7.jpg";
import bannerImg8 from "../assets/Banner/banner-img-8.jpg";

const Banner = () => {
  // const { banners } = useSelector(state => state.home)
  const banners = [
    { banner: bannerImg1, link: "http://localhost:5173" },
    { banner: bannerImg2, link: "http://localhost:5173" },
    { banner: bannerImg3, link: "http://localhost:5173" },
    { banner: bannerImg4, link: "http://localhost:5173" },
    { banner: bannerImg5, link: "http://localhost:5173" },
    { banner: bannerImg6, link: "http://localhost:5173" },
    { banner: bannerImg7, link: "http://localhost:5173" },
    { banner: bannerImg8, link: "http://localhost:5173" },
  ];
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="w-full md:mt-[60px]">
  <div className="w-[98%] mx-auto">
    <div className="flex flex-wrap w-full md:gap-[32px]">
      <div className="w-full">
        <div className="my-[80px]">
          <Carousel
            autoPlay={true}
            infinite={true}
            arrows={true}
            responsive={responsive}
          >
            {banners &&
              banners.length > 0 &&
              banners.map((b, i) => (
                <Link
                  className="block w-full h-auto md:h-[440px]"
                  key={i}
                  to={``}
                >
                  <img
                    className="w-full h-[50vh] object-cover"
                    src={b.banner}
                    alt=""
                  />
                </Link>
              ))}
          </Carousel>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Banner;
