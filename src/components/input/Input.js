import React,{Fragment, useState} from 'react';
import {parse} from 'papaparse';

import classes from './Input.module.css';

function Input(props) {

    const [highlited, setHighlited] = useState(false);
    const [csvdata, setcsvdata] = useState([])

    let cssClass = [classes.drop,classes.notdropped];
    if(highlited){
        cssClass = [classes.drop,classes.dropped];
    }

    return (
        <Fragment>
            <div>
                <h1>Drop The Sample Data CSV File Here</h1>
            </div>
            <div className={cssClass.join(' ')}
                onDragEnter={() => {
                    setHighlited(true);
                }}
                onDragLeave={() => {
                    setHighlited(false);
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    setHighlited(false);

                    Array.from(e.dataTransfer.files).forEach(async (file) => {
                        const text = await file.text();
                        const result = parse(text);
                        props.setcsvdata((csvdata) => [...result.data]);    
                        props.setupdated(true);                    
                    })
                }}
            >
                Drag n Drop Here
            </div>
        </Fragment>
    )
}

export default Input;
