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
    }
    
  }

  registerNewUser = (e) => {
    e.preventDefault();
    let prevState = this.state;
    const db = Firestore.firestore();
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

    let data = {
      'email' : prevState.email
    }

    db.collection('users').doc(prevState.email).set(data);
    db.collection('users').doc(prevState.email).collection('spents').doc('car').set('carro');


    this.setState({
      email: '',
      showLogin: true,
      showScreen1: false,
      showRegister: false,
    })

  }

  teste = () => {
    const db = Firestore.firestore();
    db.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
         // console.log(`${doc.id} => ${doc.data().email}`);
      });
    });

    let a = db.collection('users').doc('gustavo.gigante.@gmail.com').collection('spents').doc('teste');
    console.log(a);

    var citiesRef = db.collection('users').doc('gustavo.gigante.@gmail.com').collection('spents');
    var allCities = citiesRef.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });


    //TODO: Restructure data structure...
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
          this.state.showLogin ?  [
            this.teste(),
            <Login
              email={this.handleChangeEmail}
              passwordChange={this.handleChangePassword}
              submitState={this.submitState}
              signUpClick={this.showRegister}
              ref={this.warning}/>
          ]: null
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
