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
  ChartOptions,
  ScriptableContext
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

  const chartData = {
    labels: Array.from({ length: receiptData.payload.validReceipt.length }, (_, i) => `${i + 1}`),
    datasets: [
      {
        label: 'Валидные чеки          ',
        data: receiptData.payload.validReceipt,
        borderColor: '#10B981',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          if (!context.chart.chartArea) return;
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
          return gradient;
        },
        borderWidth: 2,
        pointRadius: 2,
        pointBackgroundColor: '#10B981',
        pointHoverRadius: 4,
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Невалидные чеки',
        data: receiptData.payload.invalidReceipt,
        borderColor: '#EF4444',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          if (!context.chart.chartArea) return;
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
          gradient.addColorStop(0, 'rgba(239, 68, 68, 0.4)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
          return gradient;
        },
        borderWidth: 2,
        pointRadius: 2,
        pointBackgroundColor: '#EF4444',
        pointHoverRadius: 4,
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
          padding: 5,
          usePointStyle: true,
          boxWidth: 20,
          pointStyle: 'circle',
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
        display: true,
        text: 'Валидные и невалидные чеки',
        font: {
          size: 16,
          family: "'Titillium Web', sans-serif"
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          font: {
            size: 14,
            family: "'Titillium Web', sans-serif"
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
            size: 14,
            family: "'Titillium Web', sans-serif"
          }
        },
        beginAtZero: false, 
      }
    }
  };

  return (
    <div className="chart-wrapper">
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