import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import './sumReceipt.css';
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
import receiptData from '../../data/sumReceipt.json'; 
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

export const SumReceiptAverage = () => {
  const chartRef = useRef<any>(null);
  const [gradient, setGradient] = useState<CanvasGradient>();
  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 
    'Май', 'Июнь', 'Июль', 'Август',
    'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];
  
  const [selectedMonth, setSelectedMonth] = useState<string>(months[new Date().getMonth()]);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, chartRef.current.height);
      gradient.addColorStop(0, 'rgba(66, 182, 246, 0.5)'); 
      gradient.addColorStop(1, 'rgba(93, 95, 239, 0.01)');
      setGradient(gradient);
    }
  }, []);

  const chartData = {
    labels: Array.from({ length: receiptData.payload.sumReceipt.length }, (_, i) => ` ${i + 1}`),
    datasets: [
      {
        label: 'Средний чек',
        data: receiptData.payload.sumReceipt,
        borderColor: '#5D5FEF',
        backgroundColor: gradient,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#5D5FEF',
        pointHoverRadius: 5,
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Средний чек',
        data: Array(receiptData.payload.sumReceipt.length).fill(receiptData.payload.sumReceiptAverage),
        borderColor: '#EF4444',
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.datasetIndex === 0) {
              return ` День ${context.dataIndex + 1}: ${context.parsed.y.toLocaleString()} ₽`;
            }
            return ` Среднее: ${context.parsed.y.toLocaleString()} ₽`;
          }
        }
      },
      title: {
        display: true,
        text: `Средний чек за ${selectedMonth}`,
        font: {
          size: 14
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Дни месяца'
        },
        grid: {
          display: false,
        }
      },
      y: {
        title: {
          display: true,
          text: 'Сумма (₽)'
        },
        beginAtZero: false,
      }
    }
  };

  return (
    <div className="average-receipt-chart">
      <div className="chart-controls">
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