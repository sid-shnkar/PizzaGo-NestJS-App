import { Fragment, useRef, useState } from 'react';
import { Prompt } from 'react-router-dom';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './PizzaForm.module.css';

const PizzaForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);

  const pizzaNameInputRef = useRef();
  const pizzaPriceInputRef = useRef();
  const pizzaIsVegInputRef=useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredPizzaName = pizzaNameInputRef.current.value;
    const enteredPizzaPrice = pizzaPriceInputRef.current.value;
    const enteredPizzaIsVeg=pizzaIsVegInputRef.current.value;

    // optional: Could validate here

    props.onAddPizza({ pizzaName: enteredPizzaName, price: +enteredPizzaPrice, 
      isVeg: enteredPizzaIsVeg === 'yes' ? true : false });
  }

  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message={(location) =>
          'Are you sure you want to leave? All your entered data will be lost!'
        }
      />
      <Card>
        <form
          onFocus={formFocusedHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor='name'>Pizza name</label>
            <input type='text' id='pizzaName' ref={pizzaNameInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='number'>Price</label>
            <input type='number' id='price' ref={pizzaPriceInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='text'>Vegetarian yes/no</label>
            <input type='text' id='isVeg' ref={pizzaIsVegInputRef} />
          </div>
          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className='btn'>Add Pizza</button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default PizzaForm;
