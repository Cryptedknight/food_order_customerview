import React from 'react';

const RenderHeading = (props) =>
    {
        if(props.dishSelected.length>0)
        {
            return null;
        }
        else
        {
            return(<h5>Ouch! No dishes selected?</h5>);
        }
    }

export default RenderHeading;