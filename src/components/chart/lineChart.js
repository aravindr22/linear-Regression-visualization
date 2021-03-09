import React from 'react';
import {Scatter} from 'react-chartjs-2';

function linechart(props) {

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

    const data = {
        datasets: [{
            label: 'Sample Data Sets',
            data: lis,
            type: 'line',
            fill: null,
            backgroundColor: 'red',
            pointRadius: 4,
            pointHoverRadius: 6,
            hoverBackgroundColor: 'orange',
            borderColor: 'rgba(247, 69, 93)'
            
        },{
            label: "Value of f(X)",
            data: lis2,
            type: 'line',
            fill: null,
            backgroundColor: 'blue',
            pointRadius: 4,
            pointHoverRadius: 6,
            hoverBackgroundColor: 'rgba(205,19,242)',
            borderColor: 'rgba(19,19,242)'
        }]
        // labels: props.x,
        // datasets: [
        //     {
        //         label: "Sample Data Set",                
        //         data: props.y,
        //         backgroundColor: 'red',
        //         pointRadius: 4,
        //         pointHoverRadius: 6,
        //         hoverBackgroundColor: 'orange',
        //         showLine: true,
        //         fill: null,
        //         borderColor: 'rgba(247, 69, 93)'
        //     },
        //     {
        //         label: "Value of f(X)",
        //         data: props.fx,
        //         backgroundColor: 'blue',
        //         pointRadius: 4,
        //         pointHoverRadius: 6,
        //         hoverBackgroundColor: 'rgba(205,19,242)',
        //         showLine: true,
        //         fill: null,
        //         borderColor: 'rgba(19,19,242)'
        //     }
        // ]
    }
    // const options = {
    //     scales: {
    //         xAxes: [{                
    //             ticks: {
    //                 min: 0
    //             }
    //         }],
    //         yAxes: [{
    //             ticks: {
    //                 min: 0,
    //                 stepSize: 10
    //             }
    //         }]
    //     }
    // }

    return (
        <Scatter data={data}  />
    )
}

export default linechart;
