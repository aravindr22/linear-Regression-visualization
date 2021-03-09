import React, {useState} from 'react';

import classes from './chartInput.module.css';

export const ChartInput = (props) => {

    const [val, setVal] = useState(0);
    return (
        <div className={classes.bar}>
            <input 
                style={{"width": "8rem", "height": "2.5rem"}} 
                type="number" 
                value={val}
                onChange={(e) => setVal(e.target.value)}/>
            <button 
                className={classes.button} 
                type="button"
                onClick={() => {
                    props.setAddVal(val);
                    props.setAdded(true);
                    setVal(0);
                }}>
                    Click to Add
                </button>
        </div>
    )
}

export default ChartInput;