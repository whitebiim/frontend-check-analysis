import React from 'react';
import topProductName from '../../data/topProductName.json';
import './ProductName.css';

interface CategoryItem {
  name: string;
  percentage: number;
  position: number;
}

export const ProductName = () => {
  const categories: CategoryItem[] = Object.entries(topProductName.topProductsNames)
    .map(([name, percentage], index) => ({
      name,
      percentage,
      position: index + 1
    }));

  return (
    <div className="categories-list">
      {categories.map((category) => (
        <div key={category.name} className="category-item">
          <div className="category-position">{category.position}.</div>
          <div className="category-name">{category.name}</div>
          <div className="category-percentage">
            {category.percentage}%
          </div>
        </div>
      ))}
    </div>
  );
};