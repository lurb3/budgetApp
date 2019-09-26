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

		let data = {
			userid: 1,
		};

		fetch("https://gustavomonteiro.pt/budgetapp/api/getUserData.php", {
			method: 'post',
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then(function(data){
			let login = data;
			console.log(login);
		})
		//.then(text => console.log(text))




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
				let getUserBudget = () => {
					return 2
				}
				prevState.showLogin = false;
				prevState.showScreen1 = true;
				prevState.Budget = getUserBudget();
				updateScreenState();
			})
			.catch(function() {
				console.log("User Doesnt' Exists");
				//document.getElementById("loginWarning").style.display = "block";
			})

			let updateScreenState = () => {
				delete prevState.password;
				this.setState({
					prevState,
				});
				console.log(this.state);
			}
		}
	}

	registerNewUser = (e) => {
		let getCurrentDate = () => {
			let today = new Date();
			let dd = String(today.getDate()).padStart(2, '0');
			let mm = String(today.getMonth() + 1).padStart(2, '0');
			let yyyy = today.getFullYear();
	
			today = mm + '/' + dd + '/' + yyyy;
			return today;
		}

		e.preventDefault();
		let prevState = this.state;
		const db = Firestore.firestore();
		Firestore.auth().signInWithEmailAndPassword(prevState.email, prevState.password) //Check if user exists
		.then(function(firebaseUser) {
			console.log("User already exists"); 
		})
		.catch(function(error) {
			Firestore.auth().createUserWithEmailAndPassword(prevState.email, prevState.password);
			let data = {
				'login' : prevState.email,
				'date': getCurrentDate(),
			}
			db.collection('users').doc(prevState.email).set(data);
		});

		this.setState({
			email: '',
			showLogin: true,
			showScreen1: false,
			showRegister: false,
		});
	}

	render() {
		return (
			<div className="App">
				{/* #Register Screen */
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

				{/* #Login Screen */
					this.state.showLogin ?  [
					<Login
						email={this.handleChangeEmail}
						passwordChange={this.handleChangePassword}
						submitState={this.submitState}
						signUpClick={this.showRegister}
						ref={this.warning}/>
					]: null
				}

				{/* #Dashboard Screen */
					this.state.showScreen1 ? [
					<Dashboard
						totalBudget={this.state.Budget}
					/>
					] : null
				}
			</div>
		);
	}
}

export default App;
