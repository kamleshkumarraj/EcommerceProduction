
import { useState } from "react";
import resetImage from "../../assets/Images/reset-password.svg";

import InputField from "./InputField";

function ResetPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  

  
  return (
    <div
      id="reset"
      className="p-0 m-0"
     
    >
      <main
        
        className="grid w-full h-[100vh] place-content-center p-[2rem]"
      >
        <div
          id="register-page"
          className="grid grid-cols-2 gap-[5rem] place-content-center w-full"
        >
          <div id="img" className="my-auto">
            <img src={resetImage} alt="register-image" />
          </div>
          <div className="border-[1px] border-[#252525] rounded-[1rem] p-[2rem]"
            
            
            style={{
              backgroundColor: `rgba(255,255,255,0.1)`,
              backdropFilter: `blur(2px)`,
              borderRadius: "10px",
            }}
          >
            <h4
              
              className=" text-[1.4rem]  space-y-[2rem]"
              style={{ fontWeight: "400" }}
            >
              Reset Your Password !
            </h4>
            <p className="text-[1.2rem] font-[600]  my-[.8rem] px-[.5rem]">
              This reset password link will expire within 5 minutes. So, please
              enter your new password carefully as soon as possible.
            </p>
            <form
              className="w-full flex flex-col gap-[1rem] mt-[1rem] justify-center"
            >
              <InputField
                placeholder={"Enter your password*"}
                name={"password"}
                value={formData.password}
                setValue={setFormData}
                type={"password"}
              />
              <InputField
                placeholder={"Enter your confirm password*"}
                name={"confirmPassword"}
                value={formData.confirmPassword}
                setValue={setFormData}
                type={"password"}
              />

              <button
                id="button"
                variant="contained"
                type="submit"
                className="w-full py-[1rem] rounded-[.5rem]"
                style={{
                  fontSize: "1.4rem",
                  background: `linear-gradient(45deg , #5468FF ,#59C3FF)`,
                  ":hover": {
                    background: `linear-gradient(45deg , #59C3FF ,#5468FF)`,
                  },
                }}
              >
                {"Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ResetPassword;
