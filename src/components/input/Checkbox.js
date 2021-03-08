import React from 'react';

const Checkbox = props => (
    <div>
        <input 
            type="checkbox" 
            className={props.className} 
            checked={props.checked}
            onChange={props.onChange}
            />
        <span style={{"marginBottom": "50px"}}>{props.value}</span>
    </div>
)

export default Checkbox;
