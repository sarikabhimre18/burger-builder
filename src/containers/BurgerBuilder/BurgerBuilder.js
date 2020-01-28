import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INCGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

class BurgerBuilder extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             ingredients: null,
             totalPrice: 0.0,
             purchasable: false,
             purchasing: false,
             loading: false,
             error: false

        }
    }

    updatePurchaseState(){
        const ingredients = {...this.state.ingredients};
        const sum = Object.keys(ingredients).map((igKey)=>{
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum = sum + el;
        },0);

        this.setState({
            purchasable : sum>0
        })
    }

    addIngredientHandler = (type) => {
        let ingredients = {...this.state.ingredients};
        ingredients[type] = ingredients[type] + 1
        const priceAddition = INCGREDIENT_PRICE[type];
        this.setState((prevState)=>({
            ingredients : ingredients,
            totalPrice : prevState.totalPrice + priceAddition
        }),()=>{
            this.updatePurchaseState();
        })
    }

    removeIngredientHandler = (type) => {
        let ingredients = {...this.state.ingredients};
        if(ingredients[type]<=0)
        { 
            return;
        }
        ingredients[type] = ingredients[type] - 1;
        const priceDeduction = INCGREDIENT_PRICE[type];
        this.setState((prevState)=>({
            ingredients : ingredients,
            totalPrice : prevState.totalPrice - priceDeduction
        }),()=>{
            this.updatePurchaseState();
        })
        
        
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () =>{
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        //alert('You Continue')
        
        const queryParam = [];
        for (let i in this.state.ingredients){
            queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParam.push('price='+this.state.totalPrice)

        const queryString = queryParam.join("&")
        this.props.history.push({
            pathname: 'checkout',
            search: '?' + queryString, 
        })
    }

    componentDidMount = () => {
        axios.get('/ingredients.json').then(response => {
            console.log(response.data)
            this.setState({
                ingredients : response.data
            })
        }).catch(error => {
            this.setState({
                error : true
            })
        })
    }
    

    render() {
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingrediwnt can't be loaded</p> : <Spinner />
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        if(this.state.ingredients){
            burger = <Aux><Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler} 
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                /></Aux>;
            
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients} 
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                total={this.state.totalPrice}
                />

        }
        if(this.state.loading)
        {
            orderSummary = <Spinner />
        }
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
                
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);
