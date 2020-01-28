import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';




class Checkout extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             ingredients: null,
             totalPrice : 0
        }
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for( let  param of query.entries()){
            if(param[0] === "price"){
                price = param[1];
                continue;
            }
            ingredients[param[0]] = +param[1]
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutCancelledhandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled = {this.checkoutCancelledhandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData {...props} ingredients={this.state.ingredients} price={+this.state.totalPrice} />)}
                />

            </div>
        )
    }
}

export default Checkout
