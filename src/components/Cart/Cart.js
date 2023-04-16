import React, { useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/Cart_Context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit]       = useState(false);
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

    const submitOrderData = async (userData) => {
        try{
            setIsSubmitting(true);
            const response = await fetch('https://react-http-cb4db-default-rtdb.firebaseio.com/orders.json',{
                method:'post',
                body:JSON.stringify({user: userData, orderItems : ctx.items})
            });
    
            if(!response.ok){
                throw new Error('Something went wrong');
            }
        }
        catch(e){
            console.log(e.message);
        }
        finally{
            setIsSubmitting(false);
            setDidSubmit(true);
            ctx.clearCart();
        }


    }

    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    const cartItem = <ul className={classes['cart-item']}>
        {ctx.items.map((item) => <CartItem key={item.id} {...item} 
        onRemove={cartItemRemoveHandler.bind(null, item.id)} 
        onAdd={cartItemAddHandler.bind(null, item)}></CartItem>)}</ul>;
    
    const cartContent = <>
        {cartItem}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderData} onCancel={props.onHideCart}/>}
        {!isCheckout && modalActions}
    </>;    
    return (
        <Modal onClose={props.onHideCart}>
        {isSubmitting && <p>Submitting your data....</p>}
        {!isSubmitting && !didSubmit && cartContent}
        {didSubmit && <p>Order submitted successfully</p>}    
            
        </Modal>
    )
}

export default Cart;