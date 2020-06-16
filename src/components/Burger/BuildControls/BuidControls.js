import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}

]

const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctlr => (
            <BuildControl 
            key={ctlr.label} 
            label={ctlr.label} 
            added={() => props.ingredientAdded(ctlr.type)}
            removed = {() => props.ingredientRemoved(ctlr.type)}
            disabled={props.disabled[ctlr.type]}/>
        ))}
        <button className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.Ordered}>ORDER NOW</button>
    </div>
);

export default BuildControls;