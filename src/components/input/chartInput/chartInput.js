import React from 'react';

import classes from './chartInput.module.css';

export const chartInput = () => {

    return (
        <div className={classes.bar}>
            <input style={{"width": "8rem", "height": "2.5rem"}} type="number" />
            <button className={classes.button} type="button">Click to Add</button>
        </div>
    )
}

export default chartInput;