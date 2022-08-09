import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';

import './scss/app.scss';

const App = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    axios
      .get('https://628e5476368687f3e7150b3c.mockapi.io/pizzas')
      .then(res => setPizzas(res.data));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map(pizza => (
              <PizzaBlock key={pizza.id} {...pizza} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
