import React from 'react';
import dailyStatsProduct from '../../data/dailyStatsProduct.json';
import RevenueIcon from '../../assets/icons/stats/revenue.svg';
import ReceiptIcon from '../../assets/icons/stats/receipt.svg';
import CartIcon from '../../assets/icons/stats/cart.svg';
import ProdIcon from '../../assets/icons/stats/prod.svg';
import CustomersIcon from '../../assets/icons/stats/customers.svg';
import './DailyStatsProduct.css';

interface MetricItem {
  id: string;
  title: string;
  value: number;
  change: number;
  icon: string;
  currency?: string;
}

export const DailyStatsProduct = () => {
  const metrics: MetricItem[] = [
    {
      id: 'revenue',
      title: 'Общая выручка',
      value: dailyStatsProduct.data.revenue,
      change: dailyStatsProduct.data.changes.revenue,
      icon: RevenueIcon,
   
    },
    {
      id: 'product_count',
      title: 'Продано товаров',
      value: dailyStatsProduct.data.product_count,
      change: dailyStatsProduct.data.changes.product_count,
      icon: ProdIcon,
     
    },
    {
      id: 'product_count_receipt',
      title: 'Товаров в чеке',
      value: dailyStatsProduct.data.product_count_receipt,
      change: dailyStatsProduct.data.changes.product_count_receipt,
      icon: CartIcon
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
            <span> чем вчера</span>
          </div>
        </div>
      ))}
     
    </div>
  );
};