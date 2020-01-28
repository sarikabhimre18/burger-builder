import React from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientSummay  = Object.keys(props.ingredients).map(igKey => {
        return (
        <li key={igKey}>
            <span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
        </li>);
    });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A dilicious burger with following ingredients:</p>
            <ul>
                {ingredientSummay}
            </ul>
            <p>Total Price : <strong>{props.total.toFixed(2)}$</strong></p>
            <p>Continue to Checkout</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
        </Aux>
    )
}


export default OrderSummary

