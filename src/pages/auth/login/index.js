import { NormalInput, NormalButton } from "../../../components/common";
import SimpleReactValidator from "simple-react-validator";
import purple_logo from "../../../assets/images/purple_logo.svg";
import { useState, useRef, useEffect } from "react";
import { userSignIn } from "../../../services/api/login";
import { useNavigate } from "react-router";
import { LOGIN_TYPE } from "../../../services/constants";
import _ from "lodash";

export const LoginPage = ({ loginType = null }) => {
  const navigate = useNavigate();
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

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  const handleSendOtp = async () => {
    try {
      const formValid = simpleValidator.current.allValid();

      if (formValid) {
        const body = {
          ...loginForm,
          loginType: loginType,
        };
        setIsLoading(true);
        const resOpt = await userSignIn(body);
        setIsLoading(false);
        console.log("resOpt------", JSON.stringify(resOpt));
        if (!_.isEmpty(resOpt)) {
          if (loginType === LOGIN_TYPE.EMPLOYEE) {
            navigate("/home", { replace: true });
          } else {
            navigate("/home", { replace: true });
          }
        }
  
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
            <h2> Sign up has {loginType === LOGIN_TYPE.EMPLOYEE?"Mentor":"Learner"}.</h2>
            <p>{loginType === LOGIN_TYPE.EMPLOYEE?"Start Managing your Learners from one place":"Start your journey with us today!"}</p>
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
              type="password"
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
              label={"Sign in"}
              onClick={handleSendOtp}
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
