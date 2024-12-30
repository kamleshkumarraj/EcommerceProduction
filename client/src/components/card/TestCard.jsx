import { useSelector } from "react-redux";
import comma_l from "../../assets/Img/comma-left.svg";
import comma_r from "../../assets/Img/comma-right.svg";
import { getSelf } from "../../store/slices/selfHandler.slice";
import PropTypes from "prop-types";
function TestCard({ title, sender, type }) {
  const user = useSelector(getSelf);
  return (
    <div
      className="flex-col flex items-center max-w-[36.1rem] p-[1rem]"
      id="testo-box"
    >
      <div className="text-section w-[100%] ">
        <img
          className="relative top-[25px] max-w-[20px]"
          src={comma_l}
          alt=""
        />

        <p className="text-[15px] text-gray-600 font-[500] leading-[25px] text-center pl-[50px]">
          {title}{" "}
        </p>

        <p className="relative ">
          <img
            className="relative left-[350px] top-[-20px] max-w-[20px]"
            src={comma_r}
            alt=""
          />
        </p>
      </div>
      <div className="image-section flex gap-[1rem] items-center mx-auto">
        <img
          className="max-w-[48px] max-h-[48px] rounded-full"
          src={user?.avatar?.url}
          alt=""
        />
        <div className="text">
          <h3 className="text-[15px] font-[600] leading-[23px]">{sender}</h3>

          <p className="text-[13px] font-[500] leading-[20px]">{type}</p>
        </div>
      </div>
    </div>
  );
}
TestCard.propTypes = {
  title: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default TestCard;
