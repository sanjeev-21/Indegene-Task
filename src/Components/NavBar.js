import React from "react";
import { Layout, Menu } from "antd";
import Questions from "./Questions";
import UserDet from "./UserDet";
import logo from "../indegene.png";
import ProTableUserDetails from "./Users";
import { UserOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  Link,
} from "react-router-dom";
const { Sider, Content } = Layout;
export default function NavBar() {
  return (
    <Router>
      <Layout>
        <Sider trigger={null} collapsible collapsed={false}>
          <div className="logo">
            <img
              src={logo}
              alt="logo"
              style={{
                width: "75%",
                marginTop: "15px",
                marginLeft: "20px",
                marginBottom: "10px",
              }}
            />
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              User Details
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              Pro Table
              <Link to="/details_with_proTable" />
            </Menu.Item>
            <Menu.Item key="3" icon={<QuestionCircleOutlined />}>
              FAQs
              <Link to="/questions" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Route exact path="/" component={UserDet} />
            <Route path="/questions" component={Questions} />
            <Route path="/details_with_proTable" component={ProTableUserDetails} />
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}
