import React from 'react';
import Categories from './Categories/Categories';
import Sort from './Sort/Sort';
import PizzaBlock from './PizzaBlock/PizzaBlock';
import Paginate from './Paginate/Paginate';
import NotFound from '../NotFound/NotFound';
import styles from './Home.module.scss';

import Skeleton from './PizzaBlock/Skeleton';
import { useSelector, useDispatch } from 'react-redux';
import { saveUrlParams } from '../../store/reducers/homeSlice';
import { fetchPizza } from '../../store/reducers/pizzaSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { allSorts } from './Sort/Sort';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMounted = React.useRef(false);

    const { categoryId, sortId, searchValue, currentPage } = useSelector(// @ts-ignore
     state => state.home);
    const { items, status } = useSelector(// @ts-ignore
        state => state.pizza);

    // If there was a first render, write the sort parameters to a string.
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortBy: sortId.property,
                category: categoryId,
                page: currentPage
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [sortId, categoryId, currentPage, navigate]);

    // When the page is reloaded, the data from the url is put into redux and cancels the fetch request according to the old parameters.
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = allSorts.find((obj) => obj.property === params.sortBy);
            const obj = {
                categoryId: params.category,
                sortId: sort,
                currentPage: params.page,
            }
            dispatch(saveUrlParams(obj));
        }
    }, [dispatch]);

    // Get pizzas
    React.useEffect(() => {
        const sortBy = `?sortBy=${sortId.property}`;
        const selectedСategory = categoryId > 0 ? `&category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
        const page = `&page=${currentPage}&limit=4`;

        dispatch(
            // @ts-ignore
            fetchPizza({
                sortBy,
                selectedСategory,
                search,
                page
            }));

    }, [dispatch, sortId.property, categoryId, searchValue, currentPage]);

    return (
        <div className={styles.Home}>
            <div className={styles.choice}>
                <Categories />
                <Sort />
            </div>
            <h2 className={styles.title}>All pizzas:</h2>
            <div className={styles.items}>
                {status === 'error'
                    ? <NotFound />
                    : status === 'loading'
                        ? [...new Array(4)].map((_, i) => <Skeleton key={i} />) //fake array
                        : items.map((item: any) => <PizzaBlock key={item.id} {...item} />)
                }
            </div>
            <Paginate />
        </div>

    );
}

export default Home; 