import { Outlet } from "react-router";
import white_purple_logo from "../../assets/images/white_purple_logo.svg";
export const AuthorizationLayout = () => {
  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
          <Outlet />
        </div>

        <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center bg-gradient-primary vh-100">
        <img src={white_purple_logo} className="brand-logo-layout" />
        </div>
      </div>
    </div>
  );
};
