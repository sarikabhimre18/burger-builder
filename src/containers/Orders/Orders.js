import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             orders: [],
             loading: false
        }
    }
    

    componentDidMount(){
        axios.get('orders.json').then(response => {
            const fetchedOrders = [];
            for( let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                })
            }
            this.setState({orders : fetchedOrders, loading: false})
        }).catch(err => {

        })
    }

    render() {
        return (
            <div>
                {
                    this.state.orders.map((order) => {
                       return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
                    })
                }
            </div>
        )
    }
}

export default  withErrorHandler(Orders, axios);
