import React, { Component } from 'react';
import './App.scss';
import './custom.scss';
import Login from './Login/Login.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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

  submitState = () => {
    console.log(this.state.email);
    console.log(this.state.password);
  }
  render() {
    let userData;
    return (
      <div className="App">
        <div className="Intro">

          <div className="Logo">
            <span>$</span>
            <h1>BudgetApp</h1>
          </div>

          <Login
            emailChange={this.handleChangeEmail}
            passwordChange={this.handleChangePassword}
          />
          <button onClick={this.submitState}>
            LOGIN
          </button>

        </div>
      </div>
    );
  }
}

export default App;
