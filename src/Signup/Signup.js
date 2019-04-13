import React from 'react';

const signup = (props) =>  {
    return (
    <div className="Signup">
        <div className="Bloc">
            <div className="Singup-Header text-center">
                <span className="Close-Singup" onClick={props.closeSignupScreen}>X</span>
                <h3>SIGN UP</h3>
            </div>
            <form className="Signup-Form">
                <div>
                    <input type="text" className="text-center" placeholder="EMAIL ADDRESS"></input>
                </div>
                
                <div>
                    <input onChange={props.passwordChange} className="text-center" type="password" placeholder="PASSWORD"></input>
                </div>

                <div>
                    <input onChange={props.passwordChange} className="text-center" type="password" placeholder="VERIFY PASSWORD"></input>
                </div>
                
                <button className="SubmitUserData" onClick={props.submitState}>
                    Register
                </button>
            </form>
        </div>
    </div>
    );
};

export default signup;