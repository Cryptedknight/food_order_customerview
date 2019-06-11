import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout,  Header, Navigation, Drawer, Content} from 'react-mdl';
import Main from './components/main';
import {Link} from 'react-router-dom';
import './App.css';
class App extends Component {

  render() {
    return (
      <div className="demo-big-content">
        <Layout>
            <Header id="header" className="header-color" title="Food-Order" scroll>

            <Navigation>
            <Link to ="/">Home</Link>
            <Link to ="/menu">Menu</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>

            </Navigation>
            </Header>
            <Drawer title="Food-Order-USA">
            <Navigation>
            <Link to ="/">Home</Link>
            <Link to ="/menu">Menu</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </Navigation>
            </Drawer>
            <Content>
                <div className="page-content"></div>
                <Main />
            </Content>
            </Layout>
        </div>


    );
  }
}

export default App;
