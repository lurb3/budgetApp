import React, { Component } from 'react';
import './App.scss';
import './custom.scss';
import Login from './Login/Login.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Intro">
          <div className="Logo">
            <span>$</span>
            <h1>BudgetApp</h1>
          </div>
          <Login/>
        </div>
      </div>
    );
  }
}

export default App;
