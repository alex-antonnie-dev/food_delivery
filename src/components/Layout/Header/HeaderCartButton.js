import classes from './HeaderCartButton.module.css';
import CartIcon from '../../Cart/CartIcon';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../../store/Cart_Context';

const HeaderCartButton = (props) => {
    const [btnBump, setBtnBump] = useState(false);
    const cartCtx = useContext(CartContext);
    // console.log(cartCtx.items);
    const numberOfItems = cartCtx.items.reduce((curNumber, item) => {
        return(
            curNumber + item.amount
        )
    }, 0);

    useEffect(() => {
        if(cartCtx.items.length === 0){
            return;
        }
        setBtnBump(true);
        const setTimer = setTimeout(() => {
            setBtnBump(false);
        }, 300);
        // return () => {
        //     clearTimeout(setTimer);
        // }
    },[cartCtx.items])
    
    const btnClass = `${classes.button} ${ btnBump ? classes.bump : ''}`;
    return(
        <button className={btnClass} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon /></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfItems}</span>
        </button>
    )
}

export default HeaderCartButton;