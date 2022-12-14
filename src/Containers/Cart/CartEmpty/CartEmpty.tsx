import React from 'react';
import styles from './CartEmpty.module.scss';

import { Link } from 'react-router-dom';

export const CartEmpty: React.FC = () => {
    return (
        <div className={styles.CartEmpty}>
            <h2>Cart empty <span>😕</span></h2>
            <p>
            Make your choice on the main page.
            </p>
            <img src="./img/empty-cart.png" alt="Not found" />
            <Link to="/">
                <button className='button button--black'>To main</button>
            </Link>
        </div>
    );
}

export default CartEmpty;