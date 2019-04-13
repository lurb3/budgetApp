import React, { Component } from 'react';
import Firestore from "./Firestore/Firestore.js";
import './App.scss';
import './custom.scss';
import './Login/Login.scss';
import './Dashboard/Dashboard.scss';
import './Signup/Signup.scss';
import Login from './Login/Login.js';
import Dashboard from './Dashboard/Dashboard.js';
import Signup from './Signup/Signup.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      showLogin: true,
      showScreen1: false,
      showRegister: false,
    }
  }

  handleChangeEmail = (evt) => {
    this.setState({
      email: evt.target.value
    })
  }

  handleChangePassword = (evt) => {
    this.setState({
      password: evt.target.value
    })
  }

  showRegister = () => {
    let prevState = this.state;
    prevState.showRegister = true;
    prevState.showLogin = false;
    this.setState({
      prevState,
    })
  }

  closeSignupScreen = () => {
    let prevState = this.state;
    prevState.showRegister = false;
    prevState.showLogin = true;
    this.setState({
      prevState,
    })
  }

  submitState = () => {
    let prevState = this.state;
    let addDBitem = () => {
      /*const db = Firestore.firestore();
      db.settings({
        timestampsInSnapshots: true
      });
      const userRef = db.collection('users').add({
        email: prevState.email,
      });*/
      /**/
    } 

    if(prevState.email !== '') {
      prevState.showLogin = false;
      prevState.showScreen1 = true;
      this.setState({
        prevState,
      },
      addDBitem) 
    } 
  }

  registerNewUser = (e) => {
    e.preventDefault();
    let prevState = this.state;
    Firestore.auth().signInWithEmailAndPassword(prevState.email, prevState.password) //Check if use exists
    .then(function(firebaseUser) {
        console.log("User already exists"); 
    })
    .catch(function(error) {
      Firestore.auth().createUserWithEmailAndPassword(prevState.email, prevState.password).catch(function(error) { //Create new user
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        
      });
    });

  }

  render() {
    return (
      <div className="App">
        {/* #Register Screen */}
        {
          this.state.showRegister ? [
            <Signup
              email={this.handleChangeEmail}
              passwordChange={this.handleChangePassword}
              closeSignupScreen = {this.closeSignupScreen}
              closePopup = {this.closeSignupScreen}
              registerUser = {this.registerNewUser}
            />
          ] : null
        }

        {/* #Login Screen */}
        {
          this.state.showLogin ? 
            <Login
              email={this.handleChangeEmail}
              passwordChange={this.handleChangePassword}
              submitState={this.submitState}
              signUpClick={this.showRegister}/>
          : null
        }

        {/* #Dashboard Screen */}
        {
          this.state.showScreen1 ? [
            <Dashboard />,
            this.state.email,
          ] : null
        }
      </div>
    );
  }
}

export default App;
