import React from 'react';

const login = (props) =>  {
    return (
        <form className="LoginForm">
            <div>
                <input onChange={props.emailChange} className="text-center" type="text" placeholder="EMAIL ADDRESS"></input>
            </div>
            <div>
                <input onChange={props.passwordChange} className="text-center" type="password" placeholder="PASSWORD"></input>
            </div>
            <div className="SignUp">
                <button>Sign Up</button> | <button>Forgot Password</button>
            </div>
        </form>
    );
};

export default login;