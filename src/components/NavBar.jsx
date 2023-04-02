import React, {useState, useEffect} from "react";
import { Button, Typography, Avatar, Menu } from "antd";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router';

import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  MenuOutlined,
  FundOutlined,
} from "@ant-design/icons";

import icon from "../images/cryptocurrency.png";
const NavBar = () => {
  const { pathname } = useLocation()

  const [activeMenu, setActiveMenu] = useState(window.innerWidth < 800);
  useEffect(() => {
    function getSizeOfSreen() {
      setActiveMenu(window.innerWidth < 800)
    }

    window.addEventListener('resize' ,() => getSizeOfSreen())
      
    return (  
      window.removeEventListener('resize' , getSizeOfSreen)
    )
  },[])
  
  return (
    <div className="nav-container">

      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>

        <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
          <MenuOutlined />
        </Button>
      </div>
      {
        !activeMenu && (
          <Menu 
            theme="dark"
            selectedKeys={pathname}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined />} key="/cryptocurrencies">
              <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item icon={<MoneyCollectOutlined />} key="/exchanges">
              <Link to="/exchanges">Exchanges</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined />} key="/news">
              <Link to="/news">News</Link>
            </Menu.Item>
          </Menu>
        )
      }

    </div>
  );
};

export default NavBar;
