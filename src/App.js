import React, { Component } from "react";
import { Switch, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AuthService from './services/auth-service'
import Register from './components/register'
import Login from './components/login'
import Home from './components/home'
import Profile from './components/profile'
import BoardStudent from './components/board-student'
import BoardOrganization from './components/board-organization'
import BoardTeacher from './components/board-teacher'


class App extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showOrganizationBoard: false,
      showTeacherBoard: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showOrganizationBoard: user.roles.includes("ROLE_ORGANIZATION"),
        showTeacherBoard: user.roles.includes("ROLE_TEACHER"),
      })
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showOrganizationBoard, showTeacherBoard } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            MASTU
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showOrganizationBoard && (
              <li className="nav-item">
                <Link to={"/organization"} className="nav-link">
                  Organization Board
                </Link>
              </li>
            )}

            {showTeacherBoard && (
              <li className="nav-item">
                <Link to={"/teacher"} className="nav-link">
                  Teacher Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/student"} className="nav-link">
                  Student
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                </Link>
                </li>
              </div>
            )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/student" component={BoardStudent} />
            <Route path="/organization" component={BoardOrganization} />
            <Route path="/teacher" component={BoardTeacher} />
          </Switch>
        </div>
      </div>
    );
  }

}

export default App;
