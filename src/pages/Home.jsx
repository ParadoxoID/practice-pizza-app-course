import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizza } from '../redux/slices/pizzaSlice';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import Loader from '../components/Loader';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);

  const onChangeCategory = id => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = num => {
    dispatch(setCurrentPage(num));
  };

  const getPizzas = async () => {
    const mockURL = 'https://628e5476368687f3e7150b3c.mockapi.io/pizzas';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const search = searchValue ? `search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        mockURL,
        sortBy,
        category,
        order,
        search,
        currentPage
      })
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(o => o.sortProperty === params.sortProperty);

      console.log('filters', params);
      dispatch(
        setFilters({
          ...params,
          sort
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const skeletons = [...new Array(12)].map((_, i) => <Loader key={i} />);
  const pizzasToRender = items
    .filter(p => p.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map(pizza => <PizzaBlock key={pizza.id} {...pizza} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Ошибка при выполнении запроса</h2>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzasToRender}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
