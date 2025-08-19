import React from 'react';
import { Header } from '../../components/layout/header/header';
import { Sidebar } from '../../components/layout/sidebar/sidebar';
import { DailyStatsReceipts } from '../../components/stats/DailyStatsReceipts';
import { ReceiptValidityChart } from '../../components/validInvalidReceipt/validInvalidReceipt';
import { ValidChecksTable } from '../../components/table/validChecksTable';

import './validPage.css';

export const ValidPage = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header pageTitle="Валидные чеки" />
        <div className="valid-content-area">
          {/* Первая строка */}
          <div className="valid-row">
            <div className="valid-stats-block">
              <h3>Ежедневная статистика</h3>
              <div className="valid-stats-content">
                <div className="stats-grid-wrapper">
                   <DailyStatsReceipts />
                   </div>
              </div>
            </div>
            <div className="valid-chart-block">
              <h3>График чеков</h3>
              <div className="valid-chart-container">
                <ReceiptValidityChart />
              </div>
            </div>
          </div>
                <ValidChecksTable /> 
        </div>
      </div>
    </div>
  );
};