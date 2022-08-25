import React, { FC } from 'react';

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые'
];

interface CategoriesProps {
  value: number;
  onChangeCategory: (num: number) => void;
}

const Categories: FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((category, idx) => (
          <li
            key={idx}
            onClick={() => onChangeCategory(idx)}
            className={value === idx ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
