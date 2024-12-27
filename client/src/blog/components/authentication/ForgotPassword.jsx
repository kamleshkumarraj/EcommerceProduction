import { useState } from "react";
import { Link } from "react-router-dom";
import forgotImage from "../../assets/Images/forgot-password.svg";
import InputField from "./InputField";


function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });

  return (
    <div
      id="forgot"
     
    >
      <div
        className="grid w-full h-[100vh] place-content-center"
      >
        <div id="login-page" className="grid grid-cols-2 gap-[5rem]">
          <div id="img">
            <img src={forgotImage} alt="login-image" />
          </div>
          <div 
            className="max-w-[50rem] my-auto p-[2rem] mx-auto border-[1px] border-[#272626b2]"
            style={{
              backgroundColor: `rgba(255,255,255,0.1)`,
              backdropFilter: `blur(1px)`,
              borderRadius: "10px",
            }}
          >
            <h4
              className=" text-[2.4rem]  space-y-[2rem]"
              style={{ fontWeight: "400" }}
            >
              Forgot Password ?
            </h4>
            <p className="text-[1.6rem] font-[600] my-[.8rem] px-[.5rem]">
              We will send password reset link on your entered email address.
            </p>
            <form
              action=""
              className="w-full flex flex-col gap-[1.5rem]  mt-[1rem] justify-center"
            >
              <InputField
                placeholder={"Enter your email*"}
                name={"email"}
                value={formData.email}
                setValue={setFormData}
                type={"email"}
              />
              <button
                variant="contained"
                type="submit"
                className="w-full py-[1.5rem] rounded-[.5rem]"
                style={{
                  fontSize: "1.7rem",
                  background: `linear-gradient(45deg , #5468FF ,#59C3FF)`,
                  ":hover": {
                    background: `linear-gradient(45deg , #59C3FF ,#5468FF)`,
                  },
                }}
              >
                {"Send Email"}
              </button>

              <p className="font-[600] text-[2rem] text-center">OR,</p>
              <Link
                to="/login"
                className="text-[2rem] font-[600] text-center"
              >
                {`Already remember password?`}
                <span className="hover:text-[#0077B6] text-[green]">
                  {" "}
                  Login Now
                </span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
