import {prettyDateString} from "./date-utils";
import {averagePrice, lowestPrice, highestPrice} from "./stats-utils";

export const productHistoryToLineData = (history) => {
    const data = {
        labels: [],
        datasets: [
            {
                label: 'Price',
                fill: false,
                lineTension: 0.3,
                backgroundColor: 'rgba(75,192,192,0.7)',
                borderColor: 'rgb(79,195,247)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgb(79,195,247)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgb(79,195,247)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            },
            {
                label: 'Average Price',
                fill: false,
                lineTension: 0.3,
                backgroundColor: 'rgba(75,192,192,0.7)',
                borderColor: 'rgb(255,162,35)',
                borderCapStyle: 'butt',
                borderDash: [10, 5],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgb(255,162,35)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgb(79,195,247)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            },
            {
                label: 'Lowest Price',
                fill: false,
                lineTension: 0.3,
                backgroundColor: 'rgba(75,192,192,0.7)',
                borderColor: 'rgb(153,255,156)',
                borderCapStyle: 'butt',
                borderDash: [10, 5],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgb(153,255,156)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgb(79,195,247)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            },
            {
                label: 'Highest Price',
                fill: false,
                lineTension: 0.3,
                backgroundColor: 'rgba(75,192,192,0.7)',
                borderColor: 'rgb(255,0,0)',
                borderCapStyle: 'butt',
                borderDash: [10, 5],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgb(255,0,0)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgb(79,195,247)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            },
        ]
    };

    const avgPrice = averagePrice(history).toFixed(2);
    const lowPrice = lowestPrice(history).toFixed(2);
    const highPrice = highestPrice(history).toFixed(2);

    history.forEach((dataPoint, index) => {
        data.labels.push(prettyDateString(dataPoint.date));
        data.datasets[0].data.push(dataPoint.price);
        data.datasets[1].data.push(avgPrice);
        data.datasets[2].data.push(lowPrice);
        data.datasets[3].data.push(highPrice);
    });

    return data;
};
