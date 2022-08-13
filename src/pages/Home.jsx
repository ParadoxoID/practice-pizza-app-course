import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Loader from '../components/Loader';
import PizzaBlock from '../components/PizzaBlock';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortBy, setSortBy] = useState({
    name: 'популярности',
    sortProperty: 'rating'
  });

  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const order = sortBy.sortProperty.includes('-') ? 'asc' : 'desc';
  const sort = sortBy.sortProperty.replace('-', '');

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://628e5476368687f3e7150b3c.mockapi.io/pizzas?${category}&sortBy=${sort}&order=${order}`
      )
      .then(res => {
        setPizzas(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortBy]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={i => setCategoryId(i)}
        />
        <Sort value={sortBy} onChangeSortType={type => setSortBy(type)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(12)].map((_, i) => <Loader key={i} />)
          : pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
};

export default Home;
