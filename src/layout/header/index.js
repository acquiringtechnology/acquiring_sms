/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import logo from "../../assets/images/purple_logo.svg";
import logoMini from "../../assets/images/logo-mini.svg";
import face1 from "../../assets/images/faces/face1.jpg";
import face2 from "../../assets/images/faces/face2.jpg";
import face3 from "../../assets/images/faces/face3.jpg";
import face4 from "../../assets/images/faces/face4.jpg";
import { useEffect, useState, useRef } from "react";
import { getStorage, getDisplayName } from "../../services/helperFunctions";
import { EXIST_LOCAL_STORAGE } from "../../services/constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { Link } from "react-router";

export const Header = () => {
  const [userDetail, setUserDetail] = useState(null);
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    try {
      const storedUser = getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserDetail(user);
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }, []);

  const handleSideBarMinimize = () => {
    document.body.classList.toggle("sidebar-icon-only");
  };

  const handleOpenMobileSideBar = () => {
    if (document.getElementById("sidebar")) {
      document.getElementById("sidebar").classList.toggle("active");
    }
  };

  const handleLogin = () => {
    Swal.fire({
      title: "Are you sure you want to logout!",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
        <a className="navbar-brand brand-logo" href="index.html">
          <img src={logo} alt="logo" />
        </a>
        <a className="navbar-brand brand-logo-mini" href="index.html">
          <img src={logoMini} alt="logo" />
        </a>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-stretch">
        <button
          className="navbar-toggler navbar-toggler align-self-center"
          onClick={handleSideBarMinimize}
          type="button"
          data-toggle="minimize"
        >
          <span className="mdi mdi-menu"></span>
        </button>
        <div className="search-field d-none d-md-block">
          <form className="d-flex align-items-center h-100" action="#">
            <div className="input-group">
              <div className="input-group-prepend bg-transparent">
                <i className="input-group-text border-0 mdi mdi-magnify"></i>
              </div>
              <input
                type="text"
                className="form-control bg-transparent border-0"
                placeholder="Search projects"
              />
            </div>
          </form>
        </div>
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-profile dropdown" ref={dropdownRef}>
            <a
              className="nav-link dropdown-toggle"
              id="profileDropdown"
              href="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => setIsProfileDropdown((prev) => !prev)}
            >
              <div className="nav-profile-img">
                <img src={face1} alt="image" />
                <span className="availability-status online"></span>
              </div>
              <div className="nav-profile-text">
                <p className="mb-1 text-black">{getDisplayName()}</p>
              </div>
            </a>
            <div
              className={`dropdown-menu navbar-dropdown ${
                isProfileDropdown ? "show" : ""
              }`}
              aria-labelledby="profileDropdown"
            >
              <Link className="dropdown-item" to="/profile">
                <i className="mdi mdi-account me-2 text-success"></i> My Profile
                Log{" "}
              </Link>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#" onClick={handleLogin}>
                <i className="mdi mdi-logout me-2 text-primary"></i> Signout{" "}
              </a>
            </div>
          </li>
          <li className="nav-item d-none d-lg-block full-screen-link">
            <a className="nav-link">
              <i className="mdi mdi-fullscreen" id="fullscreen-button"></i>
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link count-indicator dropdown-toggle"
              id="messageDropdown"
              href="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="mdi mdi-email-outline"></i>
              <span className="count-symbol bg-warning"></span>
            </a>
            <div
              className="dropdown-menu dropdown-menu-end navbar-dropdown preview-list"
              aria-labelledby="messageDropdown"
            >
              <h6 className="p-3 mb-0">Messages</h6>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <img src={face4} alt="image" className="profile-pic" />
                </div>
                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                  <h6 className="preview-subject ellipsis mb-1 font-weight-normal">
                    Mark send you a message
                  </h6>
                  <p className="text-gray mb-0"> 1 Minutes ago </p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <img src={face2} alt="image" className="profile-pic" />
                </div>
                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                  <h6 className="preview-subject ellipsis mb-1 font-weight-normal">
                    Cregh send you a message
                  </h6>
                  <p className="text-gray mb-0"> 15 Minutes ago </p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <img src={face3} alt="image" className="profile-pic" />
                </div>
                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                  <h6 className="preview-subject ellipsis mb-1 font-weight-normal">
                    Profile picture updated
                  </h6>
                  <p className="text-gray mb-0"> 18 Minutes ago </p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <h6 className="p-3 mb-0 text-center">4 new messages</h6>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link count-indicator dropdown-toggle"
              id="notificationDropdown"
              href="#"
              data-bs-toggle="dropdown"
            >
              <i className="mdi mdi-bell-outline"></i>
              <span className="count-symbol bg-danger"></span>
            </a>
            <div
              className="dropdown-menu dropdown-menu-end navbar-dropdown preview-list"
              aria-labelledby="notificationDropdown"
            >
              <h6 className="p-3 mb-0">Notifications</h6>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-success">
                    <i className="mdi mdi-calendar"></i>
                  </div>
                </div>
                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                  <h6 className="preview-subject font-weight-normal mb-1">
                    Event today
                  </h6>
                  <p className="text-gray ellipsis mb-0">
                    {" "}
                    Just a reminder that you have an event today{" "}
                  </p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-warning">
                    <i className="mdi mdi-cog"></i>
                  </div>
                </div>
                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                  <h6 className="preview-subject font-weight-normal mb-1">
                    Settings
                  </h6>
                  <p className="text-gray ellipsis mb-0"> Update dashboard </p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-info">
                    <i className="mdi mdi-link-variant"></i>
                  </div>
                </div>
                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                  <h6 className="preview-subject font-weight-normal mb-1">
                    Launch Admin
                  </h6>
                  <p className="text-gray ellipsis mb-0"> New admin wow! </p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <h6 className="p-3 mb-0 text-center">See all notifications</h6>
            </div>
          </li>
          <li className="nav-item nav-logout d-none d-lg-block">
            <a className="nav-link" href="#" onClick={handleLogin}>
              <i className="mdi mdi-power"></i>
            </a>
          </li>
          <li className="nav-item nav-settings d-none d-lg-block">
            <a className="nav-link" href="#">
              <i className="mdi mdi-format-line-spacing"></i>
            </a>
          </li>
        </ul>
        <button
          onClick={handleOpenMobileSideBar}
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
        >
          <span className="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
  );
};
