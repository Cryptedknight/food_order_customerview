import React, {Component} from 'react';
import {Card, CardTitle, CardText,Button} from 'reactstrap';
import './cart.css';
class RenderDishes extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            dishes: this.props.dishes,
        }
    }

    componentDidMount()
    {
        this.setState({dishes: this.props.dishes});
    }

    checkIndex(dish)
    {
        var index=this.props.dishSelected.indexOf(dish.id);
        return (index>=0);
    }

    removeDish(index)
    {
        var par=this.props.dishSelected;
        this.props.handleChange(par,0,index);
    }

    render()
    {
        var sum=0;
        var menu = this.state.dishes.map((dish) => {
                if (this.checkIndex(dish)) 

                {   sum+=Math.round(dish.qty*dish.price*100)/100;
                    return (
                    <div key={dish.id} className="col-12 m-1">
                        <Card className="ccard" key={dish.id}>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>Quantity: {dish.qty}</CardText>
                        <CardText>Rs. {Math.round(dish.qty*dish.price*100)/100}</CardText>
                        <Button className="ccard" onClick={()=>this.removeDish(dish.id)}>Remove from Cart</Button>
                        </Card>
                    </div>
                    );
                }
                else{
                    return null;
                }
            });
        if(sum>0) {menu.push(<div><br></br><h4>Total: Rs. {Math.round(sum * 100) / 100}</h4><br></br></div>);}
        return menu;
    }
}

export default RenderDishes;