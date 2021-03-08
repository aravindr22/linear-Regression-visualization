import React from 'react';
import {Line} from 'react-chartjs-2';

function linechart(props) {
    const data = {
        labels: props.x,
        datasets: [
            {
                data: props.y,
                backgroundColor: 'red',
                pointRadius: 4,
                pointHoverRadius: 6,
                hoverBackgroundColor: 'orange',
                showLine: true,
                fill: null,
                borderColor: 'rgba(247, 69, 93)'
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
