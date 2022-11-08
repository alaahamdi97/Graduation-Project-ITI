import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import React, { useEffect, useState } from "react";
import { VscHome } from "react-icons/vsc";
import { SlEnvolope } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { FiBookmark } from "react-icons/fi";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from "./sidebar.module.css";
const SideBar = ({ collapsed, setCollapsed }) => {
  const [pageInView, setPageInView] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  useEffect(() => {
    setPageInView(pathname.split("/")[1]);
  }, [pathname]);

  function getItem(label, key, icon, onTitleClick) {
    return {
      label,
      key,
      icon,
      onTitleClick,
    };
  }
  const clickHandler = (route) => {
    !collapsed && setCollapsed(true);
    navigate(route);
  };

  const items = [
		getItem('Home', 'home', <VscHome className='fs-3 me-3' />, () =>
			clickHandler('/home'),
		),
		getItem('Messages', 'messages', <SlEnvolope className='fs-3 me-3' />, () =>
			clickHandler('/messages'),
		),
		getItem('Profile', 'profile', <CgProfile className='fs-3 me-3 ' />, () =>
			clickHandler('/profile'),
		),
		getItem('Saved', 'saved', <FiBookmark className='fs-3 me-3' />, () =>
			clickHandler('/saved'),
		),
		getItem(
			'About',
			'about',
			<BsFillQuestionCircleFill className='fs-3 me-3' />,
			() => clickHandler('/about'),
		),
	];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className={` bg-white shadow-sm text-blue h-100 d-none d-md-block overflow-hidden ${
        classes.sidebar
      } ${
        ["", "login", "signup"].includes(pageInView) ? "d-none d-md-none" : ""
      }`}
    >
      <Link
        to="/home"
        className="d-flex align-items-center py-2 mb-4 text-decoration-none mt-4 "
        onClick={() => !collapsed && setCollapsed(true)}
      >
        <img src="/logo.png" alt="logo" height="35" className={classes.logo} />
        <h3 className={`ms-2 mb-0  ${classes.brand}`}>Medica</h3>
      </Link>
      <Menu theme="light" selectedKeys={pageInView} mode="inline">
        {items.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={item.onTitleClick}
            className={`my-4`}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SideBar;
