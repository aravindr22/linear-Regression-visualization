import React from 'react'
import {Scatter} from 'react-chartjs-2';

function scatterchart(props) {

    let x = props.x;
    let y = props.y;
    let lis = [];
    for(let i=0;i<x.length;i++){
        lis.push({x: x[i],y: y[i]});
    }
    const data = {
        datasets: [{
            label: 'Sample Data Sets',
            data: lis,
            backgroundColor: 'red',
            pointRadius: 4,
            pointHoverRadius: 6,
            hoverBackgroundColor: 'orange'
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
