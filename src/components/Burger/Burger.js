import React from 'react';
import classes from './Burger.module.css';
import BurgetIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transfermedIngredients = Object.keys(props.ingredients)
            .map(igKey => {
                
                return [...Array(props.ingredients[igKey])].map((_, i) => {
                    //console.log(igKey)
                    return <BurgetIngredient key={igKey + 1} type={igKey} />;
                });
            })
            .reduce((arr, el) => {
                return arr.concat(el)
            }, []);

    if (transfermedIngredients.length === 0) {
        transfermedIngredients = <p>Please start adding ingredients!!</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgetIngredient type='bread-top'/>
            {transfermedIngredients}
            <BurgetIngredient type='bread-bottom'/>
        </div>
    );
};

export default burger;