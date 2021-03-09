import React, {Fragment, useState} from 'react'
import {Scatter} from 'react-chartjs-2';

import classes from './Scatterchart.module.css';
import Checkbox from '../input/Checkbox';

function Scatterchart(props) {

    const [sdCheck, setsdCheck] = useState(false);
    const [fxCheck, setfxCheck] = useState(false);

    let x = props.x;
    let y = props.y;
    let fx = props.fx;
    let xfx = props.xfx
    if(isNaN(fx[0])){
        fx = [];
    }
    let lis = [], lis2 = [];
    for(let i=0;i<x.length;i++){
        lis.push({x: x[i],y: y[i]});
    }
    for(let i=0;i<xfx.length;i++){
        lis2.push({x: xfx[i], y: fx[i]});
    }

    let sampleData = {}, valuexfx = {};

    if(sdCheck){
        sampleData = {
            type: 'line',
            fill: null
        };
    }
    if(fxCheck){
        valuexfx = {
            type: 'line',
            fill: null
        }
    }


    const data = {
        datasets: [{
            label: 'Sample Data Sets',
            data: lis,
            backgroundColor: 'red',
            pointRadius: 4,
            pointHoverRadius: 6,
            hoverBackgroundColor: 'orange',
            borderColor: 'red',
            ...sampleData
        },{
            label: "Value of f(X)",
            data: lis2,
            backgroundColor: 'blue',
            pointRadius: 4,
            pointHoverRadius: 6,
            hoverBackgroundColor: 'rgba(205,19,242)',
            borderColor: 'rgba(19,19,242)',
            ...valuexfx
        }]
    }

    const options = {
        scales: {
            // xAxes: [{
            //     //type: 'linear',
            //     //position: 'bottom'
            //     ticks: {
            //         min: 0,
            //         max: 150,
            //         stepSize: 10
            //     }
            // }],
            // yAxes: [{
            //     ticks: {
            //         min: 0,
            //         max: 150,
            //         stepSize: 10
            //     }
            // }]
        }
    }

    return (
        <Fragment>
            <Scatter data={data} options={options} />
            <div className={classes.check}>
                <Checkbox 
                    className={classes.box}
                    value="Connect Sample Data Values"
                    checked={sdCheck}
                    onChange={() => setsdCheck(!sdCheck)}/>
                <Checkbox 
                    className={classes.box}
                    value="Connect value of f(x) Values"
                    checked={fxCheck}
                    onChange={() => setfxCheck(!fxCheck)}/>
            </div>
        </Fragment>
    )
}

export default Scatterchart;
