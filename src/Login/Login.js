import React from 'react';

const login = (props) =>  {
    return (
    <div className="Intro">
        <div className="Logo">
            <span>$</span>
            <h1>BudgetApp</h1>
        </div>
        <form className="LoginForm">
            {/*<div className="FormGroup" onClick={props.formClick}>
                <label className={props.focused ? 'FormLabel focused' : 'FormLabel'}>What is your name?</label>
                
            </div>*/}
            <div>
                <input onChange={props.email} className="text-center" type="text" placeholder="EMAIL ADDRESS"></input>
            </div>
            
            <div>
                <input onChange={props.passwordChange} className="text-center" type="password" placeholder="PASSWORD"></input>
            </div>

            <div>
                <p className="loginWarning mt-3" ref={props.warning}>Incorrect user or password</p>
            </div>

            <div className="SignUp">
                <button onClick={props.signUpClick}>Sign Up</button> | <button>Forgot Password</button>
            </div>
            
            <button className="SubmitUserData" onClick={props.submitState}>
                LOGIN
              </button>
        </form>
    </div>
    );
};

export default login;