import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const Burger = (props) => {
    let transformIngredints = Object.keys(props.ingredients)
        .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey+i} type={igKey} />
        });
    }).reduce((arr, el) => {
        return arr.concat(el)
    },[]);

    if(transformIngredints.length===0){
        transformIngredints = <p>Please start adding ingredients</p>
    }

    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformIngredints}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default Burger
