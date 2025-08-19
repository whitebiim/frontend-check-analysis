
import React from 'react';
import { Header } from '../../components/layout/header/header';
import { Sidebar } from '../../components/layout/sidebar/sidebar';
import { DailyStatsReceipts } from '../../components/stats/DailyStatsReceipts';
import { ReceiptValidityChart } from '../../components/validInvalidReceipt/validInvalidReceipt';
import { InValidChecksTable } from '../../components/table/invalidChecksTable';

import './invalidPage.css';

export const InvalidPage = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header pageTitle="Невалидные чеки" />
        <div className="invalid-content-area">
          <div className="invalid-row">
            <div className="invalid-stats-block">
              <h3>Ежедневная статистика</h3> 
              <div className="invalid-stats-content">
                <div className="stats-grid-wrapper">
                 <DailyStatsReceipts />
                 </div>
             
              </div>
            </div>
            <div className="invalid-chart-block">
              <h3>График чеков</h3>
              <div className="invalid-chart-container">
                <ReceiptValidityChart />
              </div>
            </div>
          </div>
        <InValidChecksTable /> 
        </div>
      </div>
    </div>
  );
};