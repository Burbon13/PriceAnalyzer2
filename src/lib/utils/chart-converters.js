import {prettyDateString} from "./date-utils";

export const productHistoryToLineData = (history) => {
    const data = {
        labels: [],
        datasets: [
            {
                label: 'Price',
                fill: false,
                lineTension: 0.3,
                backgroundColor: 'rgba(75,192,192,0.7)',
                borderColor: 'rgb(255,138,101)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgb(255,138,101)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgb(79,195,247)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            }
        ]
    };

    history.forEach((dataPoint, index) => {
        data.labels.push(prettyDateString(dataPoint.date));
        data.datasets[0].data.push(dataPoint.price);
    });

    return data;
};
