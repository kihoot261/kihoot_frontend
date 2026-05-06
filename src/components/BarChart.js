import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import variables from '../styles/utils/_variables.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ labels, inputs, notes, label }) => {
    const data = {
        labels: labels,
        datasets: [
            {
                label: label,
                data: inputs,
                backgroundColor: variables.kihoot_green,
                borderColor: variables.kihoot_gold,
                borderWidth: 1
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Progreso',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.parsed.y;
                        const note = notes[context.dataIndex];
                        return note !== '' ? `${label}: ${value} - ${note}` :`${label}: ${value}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;   