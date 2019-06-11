import React from 'react';
import {Card, Button} from 'reactstrap';
const RenderSubmit = (props) =>
    {
        if(props.dishSelected.length>0)
        {
            return(
                <div>
                    <Card className="ccard">
                    <Button className="ccard button" onClick={() => props.handleChange(props.dishSelected,1,0)}>Place your order</Button>
                    </Card>
                </div>
            )
        }
        else
        {
            return null;
        }
    }
export default RenderSubmit;