import React from 'react';
import { connect } from 'react-redux';
import Aux from '../Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuidControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErroHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-oders';

import * as actionTypes from '../../store/actions';



class BurgerBuilder extends React.Component {
    constructor( props ) {
        super( props);
        this.state = {
            purchasing: false,
            loading: false,
            error: false
        }
    }

    componentDidMount () {
        // axios.get('https://react-burger-builder-ae428.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     })
    }

    updatePurchaseState (ingredients) {
         const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
            return sum > 0;
    }

    handlePurchase =() => {
        //console.log('clicked');
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        //console.log('clicked');
        
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }
    
    render(){
        const disableInfo = {
            ...this.props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null
        let burger = this.state.error ? <p>ingredients can't be loaded..!!!</p> : <Spinner />
        
        if(this.props.ings) {
             burger = (
                 <Aux>
                        <Burger ingredients={this.props.ings} />
                        <BuildControls 
                            ingredientAdded = {this.props.onIngredientAdded}
                            ingredientRemoved = {this.props.onIngredientRemoved}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            disabled = {disableInfo}
                            Ordered = {this.handlePurchase}
                            price = {this.props.price}/>
                 </Aux>
             );
                orderSummary =  <OrderSummary ingredients = {this.props.ings}
                            price={this.props.price}
                            purchaseCancelled = {this.purchaseCancelHandler}
                            purchaseContinued = {this.purchaseContinueHandler} />;
        }
        if(this.state.loading) {
            orderSummary = <Spinner />
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                    {burger}
            </Aux>
        );  
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErroHandler( BurgerBuilder, axios ));