import React from "react";
import ReactDOM from "react-dom";
import Card from './card';
import Test from './test';

function Index(){
    return(
        <div>
            <Test />
        </div>
    );
}

ReactDOM.render(<Index />, document.getElementById('root'));