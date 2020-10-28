import React from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from 'react-beautiful-dnd';
import Card from './card';

function Board(){
    return(
        <DragDropContext>
            <Card />
        </DragDropContext>
    );
}

ReactDOM.render(<Board />, document.getElementById('root'));