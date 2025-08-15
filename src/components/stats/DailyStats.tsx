import React from 'react';
import dailyStats from '../../data/dailyStats.json';
import RevenueIcon from '../../assets/icons/stats/revenue.svg';
import ReceiptIcon from '../../assets/icons/stats/receipt.svg';
import CartIcon from '../../assets/icons/stats/cart.svg';
import CustomersIcon from '../../assets/icons/stats/customers.svg';
import './DailyStats.css';

interface MetricItem {
  id: string;
  title: string;
  value: number;
  change: number;
  icon: string;
  currency?: string;
}

export const DailyStats = () => {
  const metrics: MetricItem[] = [
    {
      id: 'revenue',
      title: 'Общая выручка',
      value: dailyStats.data.revenue,
      change: dailyStats.data.changes.revenue,
      icon: RevenueIcon,
      currency: '₽'
    },
    {
      id: 'avg_receipt',
      title: 'Средний чек',
      value: dailyStats.data.avg_receipt,
      change: dailyStats.data.changes.avg_receipt,
      icon: ReceiptIcon,
      currency: '₽'
    },
    {
      id: 'receipts_count',
      title: 'Всего чеков',
      value: dailyStats.data.receipts_count,
      change: dailyStats.data.changes.receipts_count,
      icon: CartIcon
    },
    {
      id: 'customers',
      title: 'Клиенты',
      value: dailyStats.data.customers,
      change: dailyStats.data.changes.customers,
      icon: CustomersIcon
    }
  ];

  return (
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
            <span> чем вчера </span>
          </div>
        </div>
      ))}
      <div className="last-updated">
        Обновлено: {new Date(dailyStats.updated).toLocaleTimeString()}
      </div>
    </div>
  );
};