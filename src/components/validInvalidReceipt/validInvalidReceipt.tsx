import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import './validInvalidReceipt.css';
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
import receiptData from '../../data/validInvalidReceipt.json';

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

export const ReceiptValidityChart = () => {
  const chartRef = useRef<any>(null);
  const [gradientValid, setGradientValid] = useState<CanvasGradient>();
  const [gradientInvalid, setGradientInvalid] = useState<CanvasGradient>();

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.ctx;
      
      const gradientValid = ctx.createLinearGradient(0, 0, 0, 400);
      gradientValid.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
      gradientValid.addColorStop(1, 'rgba(255, 255, 255, 0.7)');
      setGradientValid(gradientValid);
      
      const gradientInvalid = ctx.createLinearGradient(0, 0, 0, 400);
      gradientInvalid.addColorStop(0, 'rgba(239, 68, 68, 0.3)');
      gradientInvalid.addColorStop(1, 'rgba(255, 255, 255, 0.7)');
      setGradientInvalid(gradientInvalid);
    }
  }, []);

  const chartData = {
    labels: Array.from({ length: receiptData.payload.validReceipt.length }, (_, i) => `${i + 1}`),
    datasets: [
      {
        label: 'Валидные чеки',
        data: receiptData.payload.validReceipt,
        borderColor: '#10B981',
        backgroundColor: gradientValid,
        borderWidth: 2,
        pointRadius: 2,
        pointBackgroundColor: '#10B981',
        pointHoverRadius: 6,
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Невалидные чеки',
        data: receiptData.payload.invalidReceipt,
        borderColor: '#EF4444',
        backgroundColor: gradientInvalid,
        borderWidth: 2,
        pointRadius: 2,
        pointBackgroundColor: '#EF4444',
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
            size: 14
          },
          padding: 20,
          usePointStyle: true,
          boxWidth: 8,  
        boxHeight: 8 
       
        }
      },
  
      tooltip: {
        callbacks: {
          label: (context) => {
            return ` ${context.dataset.label}: ${context.parsed.y}`;
          }
        }
      },
      title: {
        display: false
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Дни месяца',
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
          text: 'Количество чеков',
          font: {
            size: 14
          }
        },
        beginAtZero: true,
      }
    }
  };

  return (
    <div className="chart-wrapper">
      <Line 
        ref={chartRef}
        data={chartData} 
        options={options} 
      />
    </div>
  );
};