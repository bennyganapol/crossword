import React from 'react';

function Square(props) {
    return (
        <span style={{border: "1px solid red", width: "45px"}}>
            {props.number}
        </span>
    );

} 


export default Square;