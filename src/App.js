import React, { Component } from 'react';
import Firestore from "./Firestore/Firestore.js";
import './App.scss';
import './custom.scss';
import './Login/Login.scss';
import './Dashboard/Dashboard.scss';
import './Signup/Signup.scss';
import './UserData/UserData.scss';
import Login from './Login/Login.js';
import Dashboard from './Dashboard/Dashboard.js';
import Signup from './Signup/Signup.js';
import UserData from './UserData/UserData.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showLogin: true,
			showScreen1: false,
			showRegister: false,
		}
	}

	handleChangeLogin = (evt) => {
		this.setState({
			login: evt.target.value
		})
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

	handleChangeIncome = (evt) => {
		this.setState({
			income: evt.target.value
		})
	}

	handleFormClick = () => {
		let prevState = this.state;
		if(prevState.focused) {
			prevState.focused = false;
		} else {
			prevState.focused = true;
		}
		this.setState({
			prevState,
		})
	}

	showRegister = () => {
		let prevState = this.state;
		prevState.showRegister = true;
		prevState.showLogin = false;
		this.setState({
			prevState,
		});
	}

	showUserDataScreen = () => {
		let prevState = this.state;
		prevState.showUserDataScreen = true;
		prevState.userDataVisible = true;
		this.setState({
			prevState,
		})
	}

	closePopup = (screen) => {
		let prevState = this.state;
		if(screen === 'signup') { //REFACTOR THIS ASAP
			prevState.showRegister = false;
			prevState.showLogin = true;
			this.setState({
				prevState,
			})
		} 
		if(screen === 'userData') {
			prevState.showUserDataScreen = false;
			prevState.userDataVisible = false;
			this.setState({
				prevState,
			})
		}
	}

	saveUserData = (e) => {
		e.preventDefault();
		let prevState = this.state;
		let data = {
			income: prevState.income,
		}
		fetch("https://gustavomonteiro.pt/budgetapp/api/saveUserData.php", {
			method: 'POST',
			body: JSON.stringify(data),
		})
		/*.then(res => res.json())
		.then(function(data){
			let login = data;
			console.log(login);
		})*/
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
				prevState.userDataVisible = false;
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

			let newUserData = {
				userlogin: prevState.login,
				useremail: prevState.email,
			}
			fetch("https://gustavomonteiro.pt/budgetapp/api/saveNewUser.php", {
				method: 'POST',
				body: JSON.stringify(newUserData),
			})
		});

		this.setState({
			login:'',
			email: '',
			showLogin: true,
			showScreen1: false,
			userDataVisible: false,
			showRegister: false,
		});
	}

	render() {
		return (
			<div className="App">
				{/* #Register Screen */
					this.state.showRegister ? [
						<Signup
							login={this.handleChangeLogin}
							email={this.handleChangeEmail}
							passwordChange={this.handleChangePassword}
							closeSignupScreen = {() => this.closePopup('signup')}
							closePopup = {() => this.closePopup('signup')}
							registerUser = {this.registerNewUser}
						/>
					] : null
				}

				{/* #Login Screen */
					this.state.showLogin ?  [
					<Login
						/*formClick = {this.handleFormClick}
						focused = {this.state.focused}*/
						email={this.handleChangeEmail}
						passwordChange={this.handleChangePassword}
						submitState={this.submitState}
						signUpClick={this.showRegister}
						ref={this.warning}/>
					]: null
				}

				{/* #Dashboard Screen */
					this.state.showScreen1 ? [
						<UserData
							visible = {this.state.userDataVisible}
							closePopup = {() => this.closePopup('userData')}
							closeUserDataScreen = {() => this.closePopup('userData')}
							income = {this.handleChangeIncome}
							saveData = {this.saveUserData}
						/>,
						<Dashboard
							totalBudget = {this.state.Budget}
							userDataClick = {this.showUserDataScreen} 
						/>
					] : null
				}
			</div>
		);
	}
}

export default App;
