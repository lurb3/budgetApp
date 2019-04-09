import React from 'react';

const login = (props) =>  {
    return (
        <div>
            <form>
                <div>
                    <input onChange={props.emailChange} className="text-center" type="text" placeholder="EMAIL ADDRESS"></input>
                </div>
                <div>
                    <input onChange={props.passwordChange} className="text-center" type="password" placeholder="PASSWORD"></input>
                </div>
                <div>
                    Sign Up | Forgot Password
                </div>
            </form>
        </div>
    );
};

export default login;