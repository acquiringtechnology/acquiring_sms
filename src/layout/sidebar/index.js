/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink } from "react-router";
import { LOGIN_TYPE, MENU } from "../../services/constants";
import face1 from "../../assets/images/faces/face1.jpg";
import {getStorage,getIdByLabel ,getDisplayName} from '../../services/helperFunctions'
import { useEffect, useState } from 'react';
import {EXIST_LOCAL_STORAGE ,EMPLOYEE_DESIGNATION_LIST} from '../../services/constants'
export const Sidebar = () => {
  const [userDetail,setUserDetail] =useState(null)
  const handleOpenMenu = (menu) => {
    const subMenuDom = document.getElementById(menu);
    subMenuDom.classList.toggle("show");
  };




  
  
    useEffect(() => {
      try {
        const storedUser = getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER);
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserDetail(user);
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }, []);

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item nav-profile">
          <a href="#" className="nav-link">
            <div className="nav-profile-image">
              <img src={face1} alt="profile" />
              <span className="login-status online"></span>
              {/* <!--change to offline or busy as needed--> */}
            </div>
            <div className="nav-profile-text d-flex flex-column">
              <span className="font-weight-bold mb-2">{getDisplayName()}</span>
              <span className="text-secondary text-small">{userDetail?.loginType === LOGIN_TYPE.EMPLOYEE ?getIdByLabel(EMPLOYEE_DESIGNATION_LIST,userDetail?.role):"Candidate"}</span>
            </div>
            <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
          </a>
        </li>

        {MENU.map((menu, i) => (
          menu?.loginType === userDetail?.loginType &&
          <li className="nav-item " key={i}>
            {menu.subMenu.length > 0 ? (
              <span
                className="nav-link "
                onClick={() => handleOpenMenu(i + "menu")}
              >
                <span className="menu-title">{menu.title}</span>
                <i className={`mdi ${menu.icon} menu-icon`}></i>
              </span>
            ) : (
              <NavLink className="nav-link " to={menu.path}>
                <span className="menu-title">{menu.title}</span>
                <i className={`mdi ${menu.icon} menu-icon`}></i>
              </NavLink>
            )}

            {menu.subMenu.length > 0 && (
              <div className="collapse show" id={i + "menu"}>
                <ul className="nav flex-column sub-menu">
                  {menu.subMenu.map((menu ,j) => (
                    <li className="nav-item" key={j}>
                      <a
                        className="nav-link"
                        href="pages/ui-features/buttons.html"
                      >
                        {menu.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/*  */}
          </li>
        ))}
      </ul>
    </nav>
  );
};
