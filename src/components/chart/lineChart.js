import React from 'react';
import {Line} from 'react-chartjs-2';

function linechart(props) {
    const data = {
        labels: props.x,
        datasets: [
            {
                label: "Sample Data Set",
                
                data: props.y,
                backgroundColor: 'red',
                pointRadius: 4,
                pointHoverRadius: 6,
                hoverBackgroundColor: 'orange',
                showLine: true,
                fill: null,
                borderColor: 'rgba(247, 69, 93)'
            },
            {
                label: "Value of f(X)",
                data: props.fx,
                backgroundColor: 'blue',
                pointRadius: 4,
                pointHoverRadius: 6,
                hoverBackgroundColor: 'rgba(205,19,242)',
                showLine: true,
                fill: null,
                borderColor: 'rgba(19,19,242)'
            }
        ]
    }
    const options = {
        scales: {
            xAxes: [{                
                ticks: {
                    min: 0
                }
            }],
            yAxes: [{
                ticks: {
                    min: 0,
                    stepSize: 10
                }
            }]
        }
    }

    return (
        <Line data={data} options={options} />
    )
}

export default linechart;
