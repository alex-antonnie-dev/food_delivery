import React, {useReducer} from "react";
import CartContext from "./Cart_Context";

const defaultCartState = {
    items : [],
    amount : 0
}

const cartReducer = (state, action) => {
    let updatedItems = [];
    if(action.type === 'ADD'){
        const updatedTotalAmount = state.amount + action.item.price * action.item.amount;
        // console.log('action', action, state);
        const existingItemIndex = state.items.findIndex((item) => item.id == action.item.id);

        let existingCartItem = state.items[existingItemIndex];
        if(existingCartItem){
            const updateItem = {...existingCartItem, amount : existingCartItem.amount + action.item.amount};
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updateItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }
        return {
            items : updatedItems,
            amount : updatedTotalAmount
        }
    } else if(action.type === 'REMOVE'){
        const existingItemIndex = state.items.findIndex((item) => item.id === action.id);
        let existingCartItem = state.items[existingItemIndex];
        const updatedTotalAmount = state.amount - existingCartItem.price;
        if(existingCartItem.amount == 1){
            updatedItems = state.items.filter((item) => {
                return( item.id !== action.id);
            });
        } else {
            let updatedItem = {...existingCartItem, amount : existingCartItem.amount - 1};

            updatedItems      = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }

        return {
            items : updatedItems,
            amount : updatedTotalAmount
        }

    } else if(action.type == 'CLEAR'){
        return defaultCartState;

    }
    return defaultCartState;
}


const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCart = (item) => {
        dispatchCartAction({type : 'ADD', item : item});
    }

    const removeItemFromCart = (id) => {
        dispatchCartAction({type : 'REMOVE', id: id});
    }

    const clearCart = () => {
        dispatchCartAction({type : 'CLEAR'})
    }

    const cartContext = {
        items : cartState.items,
        total : cartState.amount,
        addItem : addItemToCart,
        removeItem : removeItemFromCart,
        clearCart : clearCart
    }
    return(
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
    )
}

export default CartProvider;