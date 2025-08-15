import React from 'react';
import dailyStatsReceipts from '../../data/dailyStatsReceipts.json';
import RevenueIcon from '../../assets/icons/stats/revenue.svg';
import ReceiptIcon from '../../assets/icons/stats/receipt.svg';
import CartIcon from '../../assets/icons/stats/cart.svg';
import InvalIcon from '../../assets/icons/stats/inval.svg';
import CustomersIcon from '../../assets/icons/stats/customers.svg';
import './DailyStatsReceipts.css';

interface MetricItem {
  id: string;
  title: string;
  value: number;
  change: number;
  icon: string;
  currency?: string;
}

export const DailyStatsReceipts = () => {
  const metrics: MetricItem[] = [
    {
      id: 'valid',
      title: 'Валидные чеки',
      value: dailyStatsReceipts.data.valid,
      change: dailyStatsReceipts.data.changes.valid,
      icon: RevenueIcon,
   
    },
    {
      id: 'invalid',
      title: 'Невалидные чеки',
      value: dailyStatsReceipts.data.invalid,
      change: dailyStatsReceipts.data.changes.invalid,
      icon: InvalIcon,
     
    },
    {
      id: 'receipts_count',
      title: 'Всего чеков',
      value: dailyStatsReceipts.data.receipts_count,
      change: dailyStatsReceipts.data.changes.receipts_count,
      icon: CartIcon
    }
  ];

  return (
    <div className="daily-stats-receipts">
      <div className="stats-grid">
        {metrics.map((metric) => (
          <div key={metric.id} className="stat-card">
            <div className="stat-icon">
              <img src={metric.icon} alt={metric.title} />
            </div>
            
            <div className="stat-value">
              {metric.value.toLocaleString()}
              {metric.currency && <span> {metric.currency}</span>}
            </div>
            <div className="stat-title">{metric.title}</div>
            <div className={`stat-change ${metric.change >= 0 ? 'positive' : 'negative'}`}>
              {metric.change >= 0 ? '↑' : '↓'} {Math.abs(metric.change)}%
              <span> чем вчера</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};