import React, { Component } from 'react';
import './App.scss';
import './custom.scss';
import Login from './Login/Login.js';
import { idText } from 'typescript';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showResult: true,
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
    let prevState = this.state;
    prevState.showResult = false;
    this.setState({
      prevState,
    })
    console.log(prevState);
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
          {this.state.showResult ? [
            <Login emailChange={this.handleChangeEmail} passwordChange={this.handleChangePassword}/>,
            <button onClick={this.submitState}>
              LOGIN
            </button>
          ]
            : null
          }


        </div>
      </div>
    );
  }
}

export default App;
