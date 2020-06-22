import React, { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-oders';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault()
        //console.log(this.props.ingredients);
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                this.setState({loading: false})
                this.props.history.push('/')
                
            })
            .catch(err => {
                this.setState({loading: false})  
            })
        
    }

    render(){
        let form = (
            <form>
                    <input type='text' className={classes.Input} name='name' placeholder='Your name' />
                    <input type='email' className={classes.Input} name='email' placeholder='Your email' />
                    <input type='text' className={classes.Input} name='street' placeholder='Your street' />
                    <input type='text' className={classes.Input} name='postal' placeholder='Your postal code' />    
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />
        }
        return(
            
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                    {form}
                <Button btnType='Success' clicked={this.orderHandler} >ORDER</Button>
            </div>
        )
    }
}

export default ContactData;