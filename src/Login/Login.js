import React from 'react';

const login = (props) =>  {
    return (
    <div className="Intro">
        <div className="Logo">
            <span>$</span>
            <h1>BudgetApp</h1>
        </div>
        <form className="LoginForm">
            <div>
                <input onChange={props.username} className="text-center" type="text" placeholder="USERNAME"></input>
            </div>
            {/*
            <div>
                <input onChange={props.passwordChange} className="text-center" type="password" placeholder="PASSWORD"></input>
            </div>
            <div className="SignUp">
                <button>Sign Up</button> | <button>Forgot Password</button>
            </div>
            */}
            <button className="SubmitUserData" onClick={props.submitState}>
                LOGIN
              </button>
        </form>
    </div>
    );
};

export default login;