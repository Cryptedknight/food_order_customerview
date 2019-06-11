import React, { Component } from 'react';
import {Card, CardBody, CardTitle, CardSubtitle, CardImg, CardText, Button, CardGroup, Col, Row} from 'reactstrap';
import Cart from './Cart/cart';
import {DISHES} from '../shared/dishes';
import axios from 'axios';
import './MenuComponent.css';
class Menu extends Component {
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.state={ 
            dishSelected: [],
            dishes: DISHES,
            order: [],
        }
    }
   
    onSelect(selected)
    {
        const index = this.state.dishSelected.indexOf(selected);
        if(index<0)
        {
            this.state.dishSelected.push(selected);
        }
        else{
            var dishes = this.state.dishes;
            const ind = dishes.findIndex(dish => dish.id===selected);
            dishes[ind].qty+=1;
            this.setState({dishes: dishes});
        }
        this.setState({dishSelected: this.state.dishSelected}); //TO UPDATE in Cart we need to call this function
    }

    orderIt(dish)
    {
        const x = this.state.dishSelected.indexOf(dish.id);
        if(x>=0)
        {
            return 1;
        }
        else{
            return 0;
        }
    }


    handleChange(dishSelectedUpdated,order,selected)
    {
        if(order===1)
        {

            const dishes=this.state.dishes.filter(dish => this.orderIt(dish));
            axios.post('http://localhost:3001/order',{orders: dishes})
            .then((response) => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });

            this.setState({dishSelected: [], dishes: DISHES});
            
            setTimeout(() => {
                axios.get('http://localhost:3001/count')
                .then((response) => {
                    const ord = response.data;
                    alert("Your order no. is " + ord);
                })
                .catch(error => {
                    console.log(error);
                });
            }, 100);  
        }
        else
        {
            console.log("Order Updated");
            var dishes = this.state.dishes;
            const ind = dishes.findIndex(dish => dish.id===selected);
            dishes[ind].qty-=1;
            var qty = dishes[ind].qty;
            if(qty < 1)
            {
                const ind = this.state.dishSelected.indexOf(selected);
                dishSelectedUpdated.splice(ind,1);
                this.setState({dishSelected: dishSelectedUpdated});
                dishes[ind].qty=1;
            }
            this.setState({dishes: dishes});
        }
                
    }

    render() {
        const menu = this.state.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-4">
                    <Card key={dish.id} className="dcard col-12 m-1">
                        <CardImg top width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardSubtitle>{dish.category}</CardSubtitle>
                        <CardText>{dish.description}</CardText>
                        <CardText className="price">Rs. {dish.price}</CardText>
                        <Button className="dcard button" id={"button"+dish.id} onClick={() => this.onSelect(dish.id)}>Add to Cart</Button>
                        </CardBody>
                    </Card>
                </div>
            );
        });

    return (
        <div>
            <Row className="menu">
                <Col  md="9">
                    <CardGroup>
                        { menu } 
                    </CardGroup> 
                </Col>
                <Col className="dishcart" md="3">
                    <h3>Order Summary</h3>
                    <Cart dishSelected={this.state.dishSelected} handleChange={this.handleChange}/>
                </Col>
            </Row>
        </div>
    );
  }
}
export default Menu;
