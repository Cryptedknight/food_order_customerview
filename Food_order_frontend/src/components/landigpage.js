import React,  {Component} from 'react';
import {Grid, Cell} from 'react-mdl';

class Landing extends Component{
    render(){
        return(
            <div style={{width: '100%', margin:'auto'}}>
            <Grid className="landing-grid">
            <Cell col={12}>
            <img src="http://pluspng.com/img-png/png-menu-restaurant-sample-menu-restaurant-white-lodge-300.png"
            alt="restaurant"
            className="restaurant"></img>

            <div className="banner-text">
            <h1>Food-Order</h1>
            <hr />
            <p>You don’t always want to go out to a restaurant. Sometimes, you just want to stay indoors and <br/>
                have the food come to you, thereby saving you the effort of dressing up (or at all). </p>
            </div>
            </Cell>
            </Grid>
            </div>
        )
    }
}
export default Landing;
