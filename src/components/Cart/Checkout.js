import classes from './Checkout.module.css';
import {useState,useRef} from 'react';

const Checkout = (props) => {
    const [formValidity, setFormValidity] = useState({
        name:true,
        street:true,
        postal:true,
        city:true
    });

    const nameRef   = useRef();
    const streetRef = useRef();
    const postalRef = useRef();
    const cityRef   = useRef();

    const isEmpty = (value) => value === '';
    const isFiveChars = (value) => value.trim().length >= 5;

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName   = nameRef.current.value;
        const enteredStreet = streetRef.current.value;
        const enteredPostal = postalRef.current.value;
        const enteredCity   = cityRef.current.value;

        const enteredNameIsValid    = !isEmpty(enteredName);
        const enteredStreetIsValid  = !isEmpty(enteredStreet);
        const enteredCityIsValid    = !isEmpty(enteredCity);
        const enteredPostalIsValid  = isFiveChars(enteredPostal);

        setFormValidity({
            name:enteredNameIsValid,
            city:enteredCityIsValid,
            postal:enteredPostalIsValid,
            street:enteredStreetIsValid
        })

        const formIsValid = enteredCityIsValid && enteredNameIsValid && enteredPostalIsValid && enteredStreetIsValid;

        if(!formIsValid){
            return;
        }

        props.onConfirm({
            name:enteredName,
            city:enteredCity,
            postal:enteredPostal,
            street:enteredStreet
        });

    };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${!formValidity.name ? classes.invalid : ''}`}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameRef} type='text' id='name' />
        {!formValidity.name && <p>Invalid name</p>}
      </div>
      <div className={`${classes.control} ${!formValidity.street ? classes.invalid : ''}`}>
        <label htmlFor='street'>Street</label>
        <input ref={streetRef} type='text' id='street' />
        {!formValidity.street && <p>Invalid street</p>}

      </div>
      <div className={`${classes.control} ${!formValidity.postal ? classes.invalid : ''}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postalRef} type='text' id='postal' />
        {!formValidity.postal && <p>Invalid postal</p>}

      </div>
      <div className={`${classes.control} ${!formValidity.city ? classes.invalid : ''}`}>
        <label htmlFor='city'>City</label>
        <input ref={cityRef} type='text' id='city' />
        {!formValidity.city && <p>Invalid city</p>}

      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>
            Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;