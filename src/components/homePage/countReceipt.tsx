import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import './countReceipt.css';
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
import receiptData from '../../data/countReceipt.json'; 

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

export const CountReceiptAverage = () => {
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
      gradient.addColorStop(0, 'rgba(60, 216, 86, 0.8)'); 
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
      setGradient(gradient);
    }
  }, []);

  const chartData = {
    labels: Array.from({ length: receiptData.payload.countReceipt.length }, (_, i) => ` ${i + 1}`),
    datasets: [
      {
        label: 'Кол-во чеков в день     ',
        data: receiptData.payload.countReceipt,
        borderColor: '#3CD856',
        backgroundColor: gradient,
        borderWidth: 1,
        pointRadius: 3,
        pointBackgroundColor: '#3CD856',
        pointHoverRadius: 5,
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Среднее кол-во',
        data: Array(receiptData.payload.countReceipt.length).fill(receiptData.payload.countReceiptAverage),
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
          font: {
            size: 11,
            family: "'Titillium Web', sans-serif"
          },
          padding: 2,
          usePointStyle: true, 
          boxWidth: 20,
          pointStyle: 'circle',      
          boxHeight: 8 
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
        text: `Количество чеков за ${selectedMonth}`,
        font: {
          size: 14
        },
        padding: {
          bottom: 20 
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true
          // ,
          // text: 'Дни месяца'
        },
        grid: {
          display: false,
        }
      },
      y: {
        title: {
          display: true,
          text: 'Кол-во (шт)'
        },
        beginAtZero: false,
      }
    }
  };

  return (
    <div className="average-receipt-chart">
      <div className="chart-controls">
      <h3 className="chart-title">Количество чеков</h3>
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