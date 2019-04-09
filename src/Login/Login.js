import React from 'react';

const login = (props) =>  {
    return (
        <div>
            <form>
                <div>
                    <input placeholder="USERNAME"></input>
                </div>
                <div>
                    <input placeholder="PASSWORD"></input>
                </div>
                <div>
                    Sign Up | Forgot Password
                </div>
                <button>LOGIN</button>
            </form>
        </div>
    );
};

export default login;