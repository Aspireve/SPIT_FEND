// src/components/graphs/ElectricityTrend.js
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

function ElectricityTrend() {
    // Calculate average (155 kWh in this case)
    const mainData = [150, 180, 170, 160, 140, 130];
    const averageValue = mainData.reduce((a, b) => a + b) / mainData.length;
    const averageData = Array(6).fill(averageValue);

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Electricity Consumption (kWh)',
                data: mainData,
                borderColor: '#eeef20',
                backgroundColor: '#eeef20',
                tension: 0.3
            },
            {
                label: 'Average Consumption',
                data: averageData,
                borderColor: 'rgb(255, 0, 0)',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
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
                text: 'Monthly Electricity Consumption'
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
                    // Use count property to control number of ticks
                    count: window.innerWidth < 768 ? 5 : 10, // Set 5 ticks for mobile, 10 for desktop
                    // Optional: use `stepSize` if you want specific intervals instead
                    stepSize: window.innerWidth < 768 ? 20 : 10,
                },
                suggestedMax: Math.max(...mainData) * 1.2
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

export default ElectricityTrend;
