import React, { Component } from 'react';
import './App.scss';
import './custom.scss';
import './Login/Login.scss';
import './Dashboard/Dashboard.scss';
import Login from './Login/Login.js';
import Dashboard from './Dashboard/Dashboard.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showLogin: true,
      showScreen1: false,
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
    if(prevState.email != '' || prevState.password != '') {
      prevState.showLogin = false;
      prevState.showScreen1 = true;
      this.setState({
        prevState,
      })
    } 
    console.log(prevState);
    console.log(this.state.email);
    console.log(this.state.password);
  }
  render() {
    let userData;
    return (
      <div className="App">
        {
          this.state.showLogin ? 
            <Login emailChange={this.handleChangeEmail} passwordChange={this.handleChangePassword} submitState={this.submitState}/>
          : null
        }
        {/* #Screen 1 */}
        {
          this.state.showScreen1 ? [
            <Dashboard />,
            this.state.email, this.state.password
          ] : null
        }
      </div>
    );
  }
}

export default App;
