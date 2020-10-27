import React from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from 'react-beautiful-dnd';
import Card from './card';

function Index(){
    return(
        <DragDropContext>
            <Card />
        </DragDropContext>
    );
}

ReactDOM.render(<Index />, document.getElementById('root'));