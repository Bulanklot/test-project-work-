import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
export const TableChart = ({labels,rate} ) => {
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Курс',
                data: rate,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(153, 102, 255, 0.8)'

                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',

                ],
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    color: "#000000",
                    font: {
                        size: 14,
                        weight: "600"
                    }
                },
            },
            x: {
                ticks: {
                    color: "#000000",
                    font: {
                        size: 14,
                        weight: "600"
                    }
            }

        }},
        plugins: {
            legend: {
                display: false,
                position: 'top',
                onClick:()=>{}
            },
            tooltip: {
                enabled: true
            }
        }
    }
    return <Bar data={data} options={options} />;
}