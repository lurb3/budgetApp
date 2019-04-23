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

  showThings = () => {
    let prevState = this.state;
    const db = Firestore.firestore();
    var cityRef = db.collection('teste');
    var query = cityRef.get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }
  
      snapshot.forEach(doc => {
        prevState.data = doc.data;
        console.log(doc.data);
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
    this.setState({
      prevState
    })
    console.log(prevState)
  }

  submitState = (e) => {
    e.preventDefault();
    let prevState = this.state;
    if(prevState.email !== '') {
      Firestore.auth().signInWithEmailAndPassword(prevState.email, prevState.password)
      .then(function() {
        prevState.showLogin = false;
        prevState.showScreen1 = true;
        updateScreenState();
      })
      .catch(function() {
        console.log("User Doesnt' Exists")
        //document.getElementById("loginWarning").style.display = "block";
      })

      let updateScreenState = () => {
        this.setState({
          prevState,
        })
      }
      showThings();
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
    this.setState({
      email: '',
      showLogin: true,
      showScreen1: false,
      showRegister: false,
    })

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
              signUpClick={this.showRegister}
              ref={this.warning}/>
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
