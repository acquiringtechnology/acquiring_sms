import { NormalInput, NormalButton } from "../../../components/common";
import SimpleReactValidator from "simple-react-validator";
import purple_logo from "../../../assets/images/purple_logo.svg";
import { useState, useRef } from "react";
import { userSignIn } from "../../../services/api/login";
import {useNavigate} from 'react-router'
import { LOGIN_TYPE } from "../../../services/constants";
import _ from 'lodash'
export const TrainerLoginPage = () => {
  const navigate =useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setloginForm] = useState({
    email: "",
    password: "",
  });
  const simpleValidator = useRef(
    new SimpleReactValidator({ className: "error-message" })
  );
  const [, forceUpdate] = useState();

  const handleInputChange = (event) => {
    setloginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  const handleSendOtp = async () => {
    try {
      const formValid = simpleValidator.current.allValid();

      if (formValid) {
        const body = {
          ...loginForm,
          loginType: LOGIN_TYPE?.EMPLOYEE,
        };
        setIsLoading(true);
        const resOpt = await userSignIn(body);
        setIsLoading(false);
        if(!_.isEmpty(resOpt)){
          navigate('/home',{ replace: true });
        }
        console.log("resOpt------", JSON.stringify(resOpt));
      } else {
        simpleValidator.current.showMessages();
        forceUpdate(1); // Consider removing this if possible
      } 
    } catch (e) {
      setIsLoading(false);
      console.error("Error during form submission:", e);
    }
  };

  return (
    <div className="row whoiAm">
      <div className="col-md-12">
        <div className="row mb-4">
          <div className="col-md-12 text-center">
            <img src={purple_logo} className="brand-logo" />
            <h2> Sign up has Mentor.</h2>
            <p>Start Managing your Learners from one place</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <NormalInput
              label="Email Email"
              value={loginForm.email}
              placeholder="example@acquire.com"
              name="email"
              onChange={handleInputChange}
              errorMessage={simpleValidator.current.message(
                "Email",
                loginForm.email,
                "required|email"
              )}
            />
          </div>
          <div className="col-md-12">
            <NormalInput
              label="Email Password"
              value={loginForm.password}
              placeholder="Enter Password"
              name="password"
              onChange={handleInputChange}
              errorMessage={simpleValidator.current.message(
                "Password",
                loginForm.password,
                "required"
              )}
            />
          </div>
          <div className="col-md-12 mt-3 d-grid gap-2">
            <NormalButton
            isLoader={isLoading}
            
              className="btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
              label={"Send OTP"}
              onClick={handleSendOtp}
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
