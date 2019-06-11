import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import {Redirect} from 'react-router-dom';
import Admin from "./admin";
import {Cookies} from 'react-cookie';
import {instanceOf} from 'prop-types';

export default class Login extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies)
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      login: false,
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });

  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.username);
    console.log(this.state.password);
    if(this.state.username==="admin" && this.state.password==="password")
    {
      //cookies.set('username', this.state.username, { path: '/' });
      //cookies.set('password', this.state.password, { path: '/' });
      this.setCookies();
      this.setState({login: true});
      console.log(this.setState);
    }
  }

  setCookies()
  {
    const cookie= new Cookies();
    cookie.set("name", "admin");
    cookie.set("pass", "password");
    cookie.set("countvisit","defined");
  }

  render() {
    if(this.state.login===false)
    {
    return (
      <div className="Login">

        <form onSubmit={this.handleSubmit}>

          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button className="but"
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>

        </form>
      </div>
    );
  }
  else{
    return(<Redirect to={{pathname: "/admin", state: {username: this.state.username, password: this.state.password}}} Component={Admin} />)
    }
  }
}
