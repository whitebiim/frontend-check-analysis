import React from 'react';
import { Header } from '../../components/layout/header/header';
import { Sidebar } from '../../components/layout/sidebar/sidebar';
import './homePage.css';
import mockReceipts from '../../mocks/mocks-data';

import Chart from 'chart.js/auto'; 
import { Bar } from 'react-chartjs-2'; 


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
                {/* тут потом доделать */}
              </div>
            </div>
            <div className="chart-block medium">
              <h3>Динамика продаж</h3>
              <div className="chart-container">
                {/* тут потом доделать  */}
              </div>
            </div>
          </div>

          {/* вторая строка */}
          <div className="dashboard-row">
            <div className="chart-block wide">
              <h3>Продажи за месяц</h3>
              <div className="chart-container">
                {/* тут потом доделать большой график */}
              </div>
            </div>
          </div>

          {/* третья строка */}
          <div className="dashboard-row">
            <div className="chart-block small">
              <h3>Тип оплаты</h3>
              <div className="chart-container">
                {/* тут потом доделать */}
              </div>
            </div>
            <div className="chart-block small">
              <h3>Средний чек</h3>
              <div className="chart-container">
                {/* тут потом доделать  */}
              </div>
            </div>
            <div className="chart-block small">
              <h3>Количество чеков</h3>
              <div className="chart-container">
                {/* тут потом доделать  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};