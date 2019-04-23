import React from 'react';

const dashboard = (props) =>  {
    return (
    <div className="Dashboard">
        <div className="Logo">
            <span>$</span>
            <h1>BudgetApp</h1>
        </div>

        <div className="CurrentStats">
            <h3>Current Status</h3>
        </div>

        <div value={props.text}>

        </div>
    </div>
    );
};

export default dashboard;