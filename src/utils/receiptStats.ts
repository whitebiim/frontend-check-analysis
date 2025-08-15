// import { Receipt } from '../types/receipt';

// // Функция для фильтрации чеков по дате
// const getReceiptsByDate = (receipts: Receipt[], date: Date): Receipt[] => {
//   const dateStr = date.toISOString().split('T')[0];
//   return receipts.filter(receipt => receipt.CreatedAt.includes(dateStr));
// };

// // Основная функция для получения статистики
// export const getDailyStats = (receipts: Receipt[]) => {
//   const today = new Date();
//   const yesterday = new Date(today);
//   yesterday.setDate(yesterday.getDate() - 1);

//   const todayReceipts = getReceiptsByDate(receipts, today);
//   const yesterdayReceipts = getReceiptsByDate(receipts, yesterday);

//   // Функция для расчёта разницы в процентах
//   const getPercentageDiff = (current: number, previous: number) => {
//     if (previous === 0) return 100;
//     return ((current - previous) / previous) * 100;
//   };

//   // Статистика за сегодня
//   const todayStats = {
//     totalRevenue: todayReceipts.reduce((sum, r) => sum + r.Items.reduce((s, i) => s + i.Sum, 0), 0),
//     totalReceipts: todayReceipts.length,
//     totalCustomers: new Set(todayReceipts.map(r => r.User)).size
//   };

//   // Статистика за вчера
//   const yesterdayStats = {
//     totalRevenue: yesterdayReceipts.reduce((sum, r) => sum + r.Items.reduce((s, i) => s + i.Sum, 0), 0),
//     totalReceipts: yesterdayReceipts.length,
//     totalCustomers: new Set(yesterdayReceipts.map(r => r.User)).size
//   };

//   // Расчёт средних значений
//   const averageCheckToday = todayStats.totalReceipts > 0 
//     ? todayStats.totalRevenue / todayStats.totalReceipts 
//     : 0;
  
//   const averageCheckYesterday = yesterdayStats.totalReceipts > 0 
//     ? yesterdayStats.totalRevenue / yesterdayStats.totalReceipts 
//     : 0;

//   return {
//     totalRevenue: {
//       value: parseFloat(todayStats.totalRevenue.toFixed(2)),
//       diff: parseFloat(getPercentageDiff(todayStats.totalRevenue, yesterdayStats.totalRevenue).toFixed(1))
//     },
//     averageCheck: {
//       value: parseFloat(averageCheckToday.toFixed(2)),
//       diff: parseFloat(getPercentageDiff(averageCheckToday, averageCheckYesterday).toFixed(1))
//     },
//     totalReceipts: {
//       value: todayStats.totalReceipts,
//       diff: parseFloat(getPercentageDiff(todayStats.totalReceipts, yesterdayStats.totalReceipts).toFixed(1))
//     },
//     totalCustomers: {
//       value: todayStats.totalCustomers,
//       diff: parseFloat(getPercentageDiff(todayStats.totalCustomers, yesterdayStats.totalCustomers).toFixed(1))
//     }
//   };
// };