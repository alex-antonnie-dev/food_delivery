import React,{useRef, useState} from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(amountRef.current.value);
        const enteredAmount = amountRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
            setAmountIsValid(false);
            return;
        } else {
            props.onAddCart(enteredAmountNumber);
        }
    }

    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <Input ref={amountRef} label='Amount' input={{id:'amount_'+props.id, type: 'number', min : 1, max: 5, step:1, defaultValue:1}}/>
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount</p>}
        </form>
    )
}

export default MealItemForm;