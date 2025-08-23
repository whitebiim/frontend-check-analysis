import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import './typePay.css';
import cardIcon from '../../assets/icons/typepay/card.svg';
import cashIcon from '../../assets/icons/typepay/nal.svg';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ChartOptions
} from 'chart.js';
import paymentData from '../../data/typePay.json';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const PaymentType = () => {
    const months = [
      'Январь', 'Февраль', 'Март', 'Апрель', 
      'Май', 'Июнь', 'Июль', 'Август',
      'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    
    const [selectedMonth, setSelectedMonth] = useState<string>(months[new Date().getMonth()]);
  
    const data = {
      labels: ['Наличные', 'Карта'],
      datasets: [
        {
          label: 'Сумма оплат',
          data: [paymentData.payload.cash, paymentData.payload.card],
          backgroundColor: [
            'rgba(60, 216, 86, 0.7)' , 
            'rgba(91, 187, 255, 0.7)'
          ],
          borderColor: [
            'rgba(60, 216, 86, 1)',
            'rgba(91, 187, 255, 1)'
          ],
          borderWidth: 1,
          borderRadius: 4
        }
      ]
    };
  
    const options: ChartOptions<'bar'> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
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
          text: `                   Тип оплаты за ${selectedMonth}`,
          
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
          grid: {
            display: false,
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Сумма (₽)'
          }
        }
      }
    };
  
    return (
      <div className="payment-type-chart">
        <div className="chart-controls">
          <h3 className="chart-title">Тип оплаты</h3>
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
        
        <div className="chart-content">
          <div className="chart-container">
            <Bar data={data} options={options} />
          </div>
          
          <div className="change-info">
            <div className="change-item">
              <div className="payment-method">
                <img src={cashIcon} alt="Наличные" className="payment-icon" />
                <div className="payment-details">
                  <div className="payment-label">Наличные</div>
                  <div className={`change-value ${paymentData.payload.cashChange >= 0 ? 'positive' : 'negative'}`}>
                    {paymentData.payload.cashChange >= 0 ? '↑' : '↓'} {Math.abs(paymentData.payload.cashChange)}%
                  </div>
                </div>
              </div>
            </div>
            <div className="change-item">
              <div className="payment-method">
                <img src={cardIcon} alt="Карта" className="payment-icon" />
                <div className="payment-details">
                  <div className="payment-label">Карта</div>
                  <div className={`change-value ${paymentData.payload.cardChange >= 0 ? 'positive' : 'negative'}`}>
                    {paymentData.payload.cardChange >= 0 ? '↑' : '↓'} {Math.abs(paymentData.payload.cardChange)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };