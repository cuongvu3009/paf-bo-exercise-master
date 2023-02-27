import React, { useState } from 'react';
import data from '../../api/categories.json';

const Category = () => {
  const [categories, setCategories] = useState(Object.entries(data));

  return (
    <div className='category-dropdown'>
      <select>
        {categories.map((cat) => {
          return (
            <option
              value={cat[1].title}
              key={cat[1].id}
              className='category-item'
            >
              {cat[1].title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Category;
