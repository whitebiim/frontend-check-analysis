import './monthlySales.css';
import React, { useState } from 'react';
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
  Filler,
  ChartOptions,
  ChartTypeRegistry
} from 'chart.js';
import type { ScriptableContext } from 'chart.js';
import monthlyData from '../../data/monthlySales.json';

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

export const MonthlySales = () => {
  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 
    'Май', 'Июнь', 'Июль', 'Август',
    'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];
  
  const [selectedMonth, setSelectedMonth] = useState<string>(months[new Date().getMonth()]);

  const chartData = {
    labels: Array.from({ length: monthlyData.payload.sums.length }, (_, i) => ` ${i + 1}`),
    datasets: [
      {
        label: 'Сумма продаж',
        data: monthlyData.payload.sums,
        borderColor: '#5D5FEF',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
          gradient.addColorStop(0, 'rgba(67, 121, 238, 0.8)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
          return gradient;
        },
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#4379EE',
        pointHoverRadius: 6,
        tension: 0.3,
        fill: true,
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
            family: "'Titillium Web', sans-serif"
          },
          padding: 5
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return ` ${context.parsed.y.toLocaleString()} ₽`;
          }
        }
      },
      title: {
        display: true,
        text: `Продажи за ${selectedMonth}`,
        font: {
          size: 16
         
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          // text: 'Дни месяца',
          font: {
            size: 14
          }
        },
        grid: {
          display: false,
        }
      },
      y: {
        title: {
          display: true,
          text: 'Сумма (₽)',
          font: {
            size: 14
          }
        },
        beginAtZero: false,
      }
    }
  };

  return (
    <div className="monthly-sales-chart">
      <div className="chart-header">
        <h3>Продажи за месяц</h3>
        <select 
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="month-select"
        >
          {months.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
      
      <div className="chart-container" style={{ height: '400px', width: '100%' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};