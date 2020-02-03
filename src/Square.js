import React from 'react';

function Square(props) {
    return (
        <div style={{ border: "1px solid red", flex: "1"}}>
            { props.number }
        </div >
    );

}


export default Square;