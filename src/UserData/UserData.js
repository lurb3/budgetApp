import React from 'react';

const userdata = (props) =>  {
    return (
    <div className="userdata">
        <div className="closePopup" onClick={props.closePopup}></div>
        <div className="Bloc">
            <div className="userdata-Header text-center">
                <span className="Close-userdata" onClick={props.closeUserDataScreen}>X</span>
                <h3>User Data</h3>
            </div>
            <form className="userdata-Form">
                <div>
                    <input onChange={props.income} type="text" className="text-center" placeholder="INCOME"></input>
                </div>
                
                
                <button className="RegisterNewUser" onClick={props.saveData}>
                    Save Data
                </button>
            </form>
        </div>
    </div>
    );
};

export default userdata;