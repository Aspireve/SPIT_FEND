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
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function WaterTrend() {
    const waterData = [2500, 2300, 2400, 2200, 2100, 2000];
    const averageValue = waterData.reduce((a, b) => a + b) / waterData.length;
    const averageData = Array(6).fill(averageValue);

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Water Consumption (L)',
                data: waterData,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgb(53, 162, 235)',
                tension: 0.3
            },
            {
                label: 'Average Consumption',
                data: averageData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderDash: [5, 5], // Creates a dashed line
                tension: 0
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
                text: 'Monthly Water Consumption'
            }
        },

        scales: {
            x: {
                border: {
                    width: 3,  // Makes x-axis bolder
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
                    width: 3,  // Makes y-axis bolder
                    color: 'black'
                },
                ticks: {
                    color: 'black',
                    font: {
                        weight: 'bold'
                    },
                    count: window.innerWidth < 768 ? 5 : 10, // Set 5 ticks for mobile, 10 for desktop
                    stepSize: window.innerWidth < 768 ? 100 : 50,
                },
                suggestedMax: Math.max(...waterData) * 1.2
            }
        }
    };

    return (
        <div style={{
            height: window.innerWidth < 768 ? '325px' : '300px', // Taller on mobile
            width: window.innerWidth < 768 ? '100%' : '80%', // Wider on desktop
        }}>
            {/* @ts-ignore */}
            <Line options={options} data={data} />
        </div>
    );
}

export default WaterTrend;
