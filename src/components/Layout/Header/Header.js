import React from 'react';
import mealsImage from '../../../assets/images/1.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    return(
        <React.Fragment>
            <header className={classes.header}>
                <h1>Alex Meals</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt='table full of food'/>
            </div>
        </React.Fragment>
    )
}

export default Header;