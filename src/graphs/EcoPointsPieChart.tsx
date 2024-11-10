// src/components/graphs/EcoPointsPieChart.js
import { Pie } from '@ant-design/plots';

function EcoPointsPieChart() {
    // Demo data for eco points distribution
    const data = [
        {
            type: 'Electricity Bills',
            value: 300,
        },
        {
            type: 'Water Bills',
            value: 250,
        },
        {
            type: 'General Bills',
            value: 180,
        },
        {
            type: 'Marketplace',
            value: 120,
        },
    ];

    const config = {
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
        legend: {
            position: 'bottom',
            layout: 'horizontal',
            flipPage: false,
            itemSpacing: 20,
            alignItems: 'center',
            maxRow: 1,
            marker: {
                symbol: 'circle',
            },
            pageNavigator: {
                marker: {
                    style: {
                        inactiveFill: '#000',
                    },
                },
            },
        },
        title: {
            text: 'Eco Points Distribution',
            style: {
                fontSize: 16,
                fontWeight: 600,
            },
        },
    };

    return <Pie {...config} />;
}

export default EcoPointsPieChart;
