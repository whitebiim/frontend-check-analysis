import React, { useState, useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import './yearlySalesComparison.css';

import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  ChartOptions
} from 'chart.js';
import salesData from '../../data/yearlySalesComparison.json';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const YearlySalesComparison = () => {
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 1, currentYear - 2, currentYear - 3];
  const [selectedYear, setSelectedYear] = useState<number>(years[0]);
  const chartRef = useRef<any>(null);

  const months = [
    'Янв', 'Фев', 'Мар', 'Апр', 
    'Май', 'Июн', 'Июл', 'Авг',
    'Сен', 'Окт', 'Ноя', 'Дек'
  ];

  const [gradients, setGradients] = useState<{
    currentYear: CanvasGradient | null;
    selectedYear: CanvasGradient | null;
  }>({
    currentYear: null,
    selectedYear: null
  });

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.canvas.getContext('2d');
      if (ctx) {
       
        const gradientCurrent = ctx.createLinearGradient(0, 0, 0, 300);
        gradientCurrent.addColorStop(0, 'rgba(66, 182, 246, 0.3)');
        gradientCurrent.addColorStop(1, 'rgba(255, 255, 255, 0)');
       
        const gradientSelected = ctx.createLinearGradient(0, 0, 0, 300);
        gradientSelected.addColorStop(0, 'rgba(60, 216, 86, 0.3)');
        gradientSelected.addColorStop(1, 'rgba(255, 255, 255, 0)');

        setGradients({
          currentYear: gradientCurrent,
          selectedYear: gradientSelected
        });
      }
    }
  }, [selectedYear]);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: `${currentYear}`,
        data: salesData.payload.currentYear,
        borderColor: '#0095FF',
        backgroundColor: gradients.currentYear || 'rgba(93, 95, 239, 0.1)',
        borderWidth: 2,
        pointRadius: 2,
        pointBackgroundColor: '#0095FF',
        pointHoverRadius: 5,
        tension: 0.3,
        fill: true, 
      },
      {
        label: `${selectedYear}`,
        data: salesData.payload.otherYear,
        borderColor: '#3CD856',
        backgroundColor: gradients.selectedYear || 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        pointRadius: 2,
        pointBackgroundColor: '#3CD856',
        pointHoverRadius: 4,
        tension: 0.3,
        fill: true,
        borderDash: [5, 5],
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
            size: 11,
            family: "'Titillium Web', sans-serif"
          },
          padding: 5,
          usePointStyle: true,
          boxWidth: 20,
          pointStyle: 'circle',      
          boxHeight: 6  
          
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1E293B',
        bodyColor: '#1E293B',
        borderColor: '#E2E8F0',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
        callbacks: {
          label: (context) => {
            return ` ${context.dataset.label}: ${context.parsed.y.toLocaleString('ru-RU')} ₽`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
            family: "'Titillium Web', sans-serif"
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(226, 232, 240, 0.5)'
        },
        ticks: {
          font: {
            size: 10,
            family: "'Titillium Web', sans-serif"
          },
          callback: (value) => {
            if (typeof value === 'number') {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
              return value;
            }
            return value;
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    layout: {
      padding: {
        top: 5,
        bottom: -5,
        left: 0,
        right: -5
      }
    }
  };

  return (
    <div className="yearly-sales-wrapper">
      <div className="chart-controls">
         <h3 className="chart-title">Динамика продаж</h3>    
         
          <select 
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="yearly-select-dropdown"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
       
      <div className="yearly-chart-container">
        <Line 
          ref={chartRef}
          data={chartData} 
          options={options} 
        />
      </div>
    </div>
  );
};