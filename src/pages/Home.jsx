import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Loader from '../components/Loader';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const { searchValue } = useContext(SearchContext);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState({
    name: 'популярности',
    sortProperty: 'rating'
  });

  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const order = sortBy.sortProperty.includes('-') ? 'asc' : 'desc';
  const sort = sortBy.sortProperty.replace('-', '');
  const search = searchValue ? `search=${searchValue}` : '';

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://628e5476368687f3e7150b3c.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=${order}&${search}`
      )
      .then(res => {
        setPizzas(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortBy, searchValue, currentPage]);

  const skeletons = [...new Array(12)].map((_, i) => <Loader key={i} />);

  const pizzasToRender = pizzas
    .filter(pizza =>
      pizza.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map(pizza => <PizzaBlock key={pizza.id} {...pizza} />);

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
        {isLoading ? skeletons : pizzasToRender}
      </div>
      <Pagination onChangePage={num => setCurrentPage(num)} />
    </div>
  );
};

export default Home;
