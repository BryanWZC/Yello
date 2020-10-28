import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from 'react-beautiful-dnd';
import Card from './card';
import axios from 'axios';

const Board = () => {
    const [boardData, setBoardData] = useState(null);
    const [titlePlaceholder, setTitlePlaceholder] = useState(true);
    const [cardTitle, setCardTitle] = useState(null);
    const [listTitle, setListTitle] = useState(null);
    
    useEffect(() => {
        if(!boardData){
            // TODO change boardTitle and boardId such that they can work for all combinations
            const boardId = 'boardId=5f98ce7c1b3fd7292815e527';
            const query = '/get-board?' + boardId;
            axios(query).then(res => setBoardData(res.data));
        }
    });

    // callbacks for cards
    function setTitleText(e) { setCardTitle(e.target.value) };

    // TODO make card items render according to number of cards in boardData. iterate that board data downwards towards the items
    function handleAddCardClick() {
        if(cardTitle && boardData){
            const boardId = boardData._id;
            setTitlePlaceholder(false);
            axios.post('/card-title', {
                boardId, 
                cardTitle,
            });
        }
    }

    // callbacks for items
    function setListTitleText(e) { setListTitle(e.target.value) };

    // TODO finish function from server.js for post request. Also make list items render according to number of list items within each card item
    function handleAddListClick() {
        if(listTitle && boardData){
            const boardId = boardData._id;
            axios.post('/card-list', {
                boardId,
                listTitle,
            })
        }
    };

    return(
        <DragDropContext>
            <Card 
                boardData={boardData} 
                handleAddCardClick={handleAddCardClick}
                setTitleText={setTitleText}
                titlePlaceholder={titlePlaceholder}
                cardTitle={cardTitle}
                listTitle={listTitle}
                setListTitleText={setListTitleText}
                handleAddListClick={handleAddListClick}
                />
        </DragDropContext>
    );
}

ReactDOM.render(<Board />, document.getElementById('root'));