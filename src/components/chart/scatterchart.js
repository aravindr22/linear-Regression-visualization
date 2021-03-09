import React from 'react'
import {Scatter} from 'react-chartjs-2';

function scatterchart(props) {

    let x = props.x;
    let y = props.y;
    let fx = props.fx;
    if(isNaN(fx[0])){
        fx = [];
    }
    let lis = [], lis2 = [];
    for(let i=0;i<x.length;i++){
        lis.push({x: x[i],y: y[i]});
        lis2.push({x: x[i], y: fx[i]});
    }
    const data = {
        datasets: [{
            label: 'Sample Data Sets',
            data: lis,
            backgroundColor: 'red',
            pointRadius: 4,
            pointHoverRadius: 6,
            hoverBackgroundColor: 'orange'
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
        <Scatter data={data} options={options} />
    )
}

export default scatterchart;
