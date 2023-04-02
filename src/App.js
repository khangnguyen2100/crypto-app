import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";

import { NavBar, HomePage, Cryptocurrencies, CryptoDetails, Exchanges, News } from "./components";
import './App.css'

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>

              <Route exact path="/" element={<HomePage />}>
              </Route>

              <Route exact path="/exchanges"  element={<Exchanges />}>
              </Route>

              <Route exact path="/cryptocurrencies"  element={<Cryptocurrencies />}>
              </Route>

              <Route exact path="/crypto/:coinId"  element={<CryptoDetails />}>
              </Route>

              <Route exact path="/news"  element={<News />}>
              </Route>
              
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title level={5} style={{color : 'white', textAlign : 'center', marginTop:'auto'}}>
            <div>Cryptoverse</div>
            <div>All rights reverse</div>
          </Typography.Title>
        </div>
      </div>
    </div>
  );
};

export default App;
