import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './topProductTypeDiag.css';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend,
  ChartOptions
} from 'chart.js';
import topProductType from '../../data/topProductType.json';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ProductCategoriesChart = () => {
  const categories = Object.entries(topProductType.topProductsTypes);
  
  const colors = [
    '#3CD856', 
    '#3CD8D0', 
    '#0095FF', 
    '#BF83FF',
    '#FA5A7D' 
  ];

  const chartData = {
    labels: categories.map(([name]) => name),
    datasets: [
      {
        data: categories.map(([_, percentage]) => percentage),
        backgroundColor: colors,
        borderColor: '#FFFFFF',
        borderWidth: 2,
        hoverOffset: 15
      }
    ]
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}%`;
          }
        }
      }
    },
    cutout: '60%' 
  };

  return (
    <div className="product-categories-chart">
   
      <div className="chart-container">
        <Doughnut data={chartData} options={options} />
      </div>
      
   
      <div className="chart-center-info">
        <div className="total-percentage">100%</div>

      </div>
    </div>
  );
};