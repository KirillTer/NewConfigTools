import React, {useState} from "react";
import './layout.scss';
import { observer } from 'mobx-react-lite'
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

import Home from '../home/home'
import TeamComponent from '../team/team'
import Player from '../player/player'

const { Header, Sider, Content } = Layout;

const MainLayout = observer(() => {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed} className="sider">
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={() => setCollapsed(!collapsed)}
        />
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span>nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span>nav 3</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="header">
          <span>Header</span>
        </Header>
        <Content className="layoutContent">
          <Switch>
            <Route exact path="/" render={() => (
                <Redirect to="/home"/>
            )}/>
            <Route exact path="/home" component={Home} />
            <Route path="/team/:id" component={TeamComponent} />
            <Route path="/player/:id" component={Player} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
});

export default MainLayout;
