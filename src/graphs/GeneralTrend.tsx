// src/components/graphs/GeneralTrend.js
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function GeneralTrend() {
    // Calculate average (575 in this case)
    const purchaseData = [500, 600, 450, 700, 550, 650];
    const average = purchaseData.reduce((a, b) => a + b) / purchaseData.length;
    const averageData = Array(6).fill(average);

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Eco-Friendly Purchases ($)',
                data: purchaseData,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgb(75, 192, 192)',
                tension: 0.3
            },
            {
                label: 'Average',
                data: averageData,
                borderColor: 'rgb(255, 0, 0)',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                tension: 0,
                borderDash: [5, 5]
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: window.innerWidth < 768 ? 0.8 : 2,
        plugins: {
            title: {
                display: true,
                text: 'Monthly Eco-Friendly Purchases'
            }
        },
        scales: {
            x: {
                border: {
                    width: 3,
                    color: 'black'
                },
                ticks: {
                    color: 'black',
                    font: {
                        weight: 'bold'
                    }
                }
            },
            y: {
                border: {
                    width: 3,
                    color: 'black'
                },
                ticks: {
                    color: 'black',
                    font: {
                        weight: 'bold'
                    },
                    count: window.innerWidth < 768 ? 5 : 10,
                    stepSize: window.innerWidth < 768 ? 20 : 10,
                },
                suggestedMax: Math.max(...purchaseData) * 1.2
            }
        }
    };

    return (
        <div style={{
            height: window.innerWidth < 768 ? '325px' : '300px',
            width: window.innerWidth < 768 ? '100%' : '80%'
        }}>
            {/* @ts-ignore */}
            <Line options={options} data={data} />
        </div>
    );
}

export default GeneralTrend;
