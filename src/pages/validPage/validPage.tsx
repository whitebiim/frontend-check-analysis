import React from 'react';
import { Header } from '../../components/layout/header/header';
import { Sidebar } from '../../components/layout/sidebar/sidebar';
import { DailyStatsReceipts } from '../../components/stats/DailyStatsReceipts';
import { ReceiptValidityChart } from '../../components/validInvalidReceipt/validInvalidReceipt';

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

          {/* Вторая строка */}
          <div className="valid-row">
            <div className="valid-list-block">
              <h3>Список валидных чеков</h3>
              <div className="valid-list-container">
                {/* Здесь будет таблица чеков */}
                <table className="product-table">
                  <thead>
                    <tr>
                      <th>Id клиента</th>
                      <th>Статус</th>
                      <th>Дата</th>
                      <th>Сумма, ₽</th>
                      <th>О чеке</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center' }}>
                        <div className="valid-placeholder">Таблица валидных чеков</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="valid-details-block">
              <h3>Подробнее о чеке</h3>
              <div className="valid-details-container">
                {/* Здесь будет детальная информация */}
                <div className="valid-details-card">
                  <div className="valid-detail-label">Товар:</div>
                  <div className="valid-detail-value">-</div>
                  
                  <div className="valid-detail-label">Кол-во, шт:</div>
                  <div className="valid-detail-value">-</div>
                  
                  <div className="valid-detail-label">Цена:</div>
                  <div className="valid-detail-value">-</div>
                  
                  <div className="valid-detail-label">Сумма:</div>
                  <div className="valid-detail-value">-</div>
                </div>
                  </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};