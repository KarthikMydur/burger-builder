import React from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuidControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErroHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-oders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.4,
    bacon: 0.7
}

class BurgerBuilder extends React.Component {
    constructor( props ) {
        super( props);
        this.state = {
            ingredients: null,
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false
        }
    }

    componentDidMount () {
        axios.get('https://react-burger-builder-ae428.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: true})
            })
    }

    updatePurchaseState (ingredients) {
         const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
            this.setState({purchasable: sum>0})
    }
    
    
    handleAdd = (type)  => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
            updatedIngredient[type] = updatedCount;
            const priceAddition = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice + priceAddition;
            this.setState({
                totalPrice: newPrice,
                ingredients: updatedIngredient
            })
            this.updatePurchaseState(updatedIngredient);
    }
    handleRemove = (type)  => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
            updatedIngredient[type] = updatedCount;
            const priceDeduction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;
            this.setState({
                totalPrice: newPrice,
                ingredients: updatedIngredient
            })
            this.updatePurchaseState(updatedIngredient);
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
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                address: {
                name: 'Karthik Mydur',
                    street: 'TestStreet 1',
                    zipCode: '96541',
                    country: 'India'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasable: false})
                
            })
            .catch(err => {
                this.setState({loading: false, purchasable: false})  
            })
    }
    
    render(){
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null
        let burger = this.state.error ? <p>ingredients can't be loaded..!!!</p> : <Spinner />
        
        if(this.state.ingredients) {
             burger = (
                 <Aux>
                        <Burger ingredients={this.state.ingredients} />
                        <BuildControls 
                            ingredientAdded = {this.handleAdd}
                            ingredientRemoved = {this.handleRemove}
                            purchasable={this.state.purchasable}
                            disabled = {disableInfo}
                            Ordered = {this.handlePurchase}
                            price = {this.state.totalPrice}/>
                 </Aux>
             );
                orderSummary =  <OrderSummary ingredients = {this.state.ingredients}
                            price={this.state.totalPrice}
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

export default withErroHandler( BurgerBuilder,axios );