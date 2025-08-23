import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import './productInReceipt.css';

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
  ChartOptions
} from 'chart.js';
import productData from '../../data/productInReceipt.json';

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

export const ProductCountChart = () => {
  const chartRef = useRef<any>(null);
  const [gradient, setGradient] = useState<CanvasGradient>();

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, chartRef.current.height);
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
      gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
      setGradient(gradient);
    }
  }, []);

  const chartData = {
    labels: Array.from({ length: productData.payload.countProduct.length }, (_, i) => `${i + 1}`),
    datasets: [
      {
        label: 'Товаров в чеке',
        data: productData.payload.countProduct,
        borderColor: '#8B5CF6',
        backgroundColor: gradient,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#8B5CF6',
        pointHoverRadius: 6,
        tension: 0.4,
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
            size: 12,
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
        callbacks: {
          title: (context) => `День ${context[0].label}`,
          label: (context) => {
            const value = context.parsed.y;
            return ` ${value} ${getProductWord(value)}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          // text: 'Дни месяца',
          font: {
            size: 12
          }
        },
        grid: {
          display: false,
        }
      },
      y: {
        title: {
          display: true,
          text: 'Количество товаров',
          font: {
            size: 12
          }
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: (value) => `${value} шт`
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    }
  };

  const getProductWord = (count: number) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'товаров';
    if (lastDigit === 1) return 'товар';
    if (lastDigit >= 2 && lastDigit <= 4) return 'товара';
    return 'товаров';
  };

  return (
    <div className="product-count-chart">

      <div className="chart-container">
        <Line 
          ref={chartRef}
          data={chartData} 
          options={options} 
        />
      </div>
    </div>
  );
};