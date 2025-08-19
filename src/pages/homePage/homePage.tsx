
import React from 'react';
import { Header } from '../../components/layout/header/header';
import { Sidebar } from '../../components/layout/sidebar/sidebar';
import { DailyStats } from '../../components/stats/DailyStats';

import { MonthlySales } from '../../components/homePage/monthlySales';
import { SumReceiptAverage } from '../../components/homePage/sumReceipt';
import { CountReceiptAverage } from '../../components/homePage/countReceipt';
import { PaymentType } from '../../components/homePage/typePay';
import { YearlySalesComparison } from '../../components/homePage/yearlySalesComparison';

import './homePage.css';

// import Chart from 'chart.js/auto'; 
// import { Bar } from 'react-chartjs-2'; 


export const HomePage = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header pageTitle="Главная страница" />
        <div className="content-area">
          {/* первая строка блочков */}
          <div className="dashboard-row">
            <div className="stats-block">
              <h3>Ежедневная статистика</h3>
              
              <div className="stats-content">
              <DailyStats />
              </div>
            </div>
            <div className="chart-block medium">
              <h3>Динамика продаж за год</h3>
              <div className="chart-container">
                <YearlySalesComparison />
         
              </div>
            </div>
          </div>

          {/* вторая строка */}
          <div className="dashboard-row">
            <div className="chart-block wide">
                {/* тут потом доделать большой график */}
                 <MonthlySales />
            </div>
          </div>

          {/* третья строка */}
          <div className="dashboard-row">
            <div className="chart-block small">
              <h3>Тип оплаты</h3>
              <div className="chart-container">
                <PaymentType/>
              </div>
            </div>
            <div className="chart-block small">
              <h3>Средний чек</h3>
              <div className="chart-container">
                <SumReceiptAverage />
              </div>
            </div>
            <div className="chart-block small">
              <h3>Количество чеков</h3>
              <div className="chart-container">
                {/* тут потом доделать  */}

                <CountReceiptAverage/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
