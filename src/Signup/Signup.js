import React from 'react';

const signup = (props) =>  {
    return (
    <div className="A">
        <div className="Logo">
            <span>$</span>
            <h1>BudgetApp</h1>
        </div>
        <form className="B">
            <div>
                <input type="text" placeholder="TESTE"></input>
            </div>
            
            <div>
                <input onChange={props.passwordChange} className="text-center" type="password" placeholder="PASSWORD"></input>
            </div>
            <div className="SignUp">
                <button>Sign Up</button> | <button>Forgot Password</button>
            </div>
            
            <button className="SubmitUserData" onClick={props.submitState}>
                LOGIN
              </button>
        </form>
    </div>
    );
};

export default signup;