import React, { Component } from 'react';
import Firestore from "./Firestore/Firestore.js";
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
      username: '',
      showLogin: true,
      showScreen1: false,
    }
  }

  handleChangeUsername = (evt) => {
    this.setState({
      username: evt.target.value
    })
  }

  submitState = () => {
    let prevState = this.state;
    let addDBitem = () => {
      const db = Firestore.firestore();
      db.settings({
        timestampsInSnapshots: true
      });
      const userRef = db.collection('users').add({
        username: prevState.username,
      });
    } 

    if(prevState.username != '') {
      prevState.showLogin = false;
      prevState.showScreen1 = true;
      this.setState({
        prevState,
      },
      addDBitem) 
    } 
  }

  render() {
    let userData;
    return (
      <div className="App">
        {
          this.state.showLogin ? 
            <Login username={this.handleChangeUsername} submitState={this.submitState}/>
          : null
        }
        {/* #Screen 1 */}
        {
          this.state.showScreen1 ? [
            <Dashboard />,
            this.state.username,
          ] : null
        }
      </div>
    );
  }
}

export default App;
