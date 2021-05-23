import React, {useState} from 'react';
import { Layout, Menu } from 'antd';
import Questions from './Questions';
import UserDet from './UserDet';
import logo from '../indegene.png';
import DynamicSettings from './Users';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    QuestionCircleOutlined,
  } from '@ant-design/icons';
  import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  const { Header, Sider, Content } = Layout;
export default function NavBar(){
    const [ collapsed, setCollapsed ] = useState(false);
    const toggle = () => {
        setCollapsed(!collapsed);
      };
    return(
      <Router>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" >
            <img src={logo} style={{width:'75%',marginTop:'15px', marginLeft:'20px', marginBottom:'10px'}}/>          
          {/* <span className="site-layout-background" style={{ padding: 0, color:'white', marginLeft:'5px' }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </span> */}
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >            
             <Route exact path="/" component={UserDet} />
             <Route path="/questions" component={Questions} />
             <Route path="/details_with_proTable" component={DynamicSettings} />
          </Content>
        </Layout>
      </Layout>
      </Router>
    )
}