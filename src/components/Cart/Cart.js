import React, { useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/Cart_Context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const ctx = useContext(CartContext);
    const totalAmount = `$${ctx.total.toFixed(2)}`;
    const hasItems = ctx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        ctx.removeItem(id);
     };
    const cartItemAddHandler = (item) => {
        ctx.addItem({...item, amount:1})
     };

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    const cartItem = <ul className={classes['cart-item']}>
        {ctx.items.map((item) => <CartItem key={item.id} {...item} 
        onRemove={cartItemRemoveHandler.bind(null, item.id)} 
        onAdd={cartItemAddHandler.bind(null, item)}></CartItem>)}</ul>
    return (
        <Modal onClose={props.onHideCart}>
            {cartItem}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onCancel={props.onHideCart}/>}
            {!isCheckout && modalActions}
            
        </Modal>
    )
}

export default Cart;