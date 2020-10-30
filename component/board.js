import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Cards, AddNewCard } from './card';
import axios from 'axios';

/**
 * Styles
 */
const Container = styled.div`
    display: flex;
`;

const Board = () => {
    const [boardData, setBoardData] = useState(null); 
    const [cardTitle, setCardTitle] = useState('');
    const [listTitle, setListTitle] = useState('');

    useEffect(() =>{ updateBoardCardData() });

    /**
     * get board data
     */
    const updateBoardCardData = async () => {
        if(!boardData) {
            const boardId = '5f9baa9c967e361fb4c7041e';
            const board = (await axios('/get-board?boardId=' + boardId)).data;
            const cardIds = await Promise.all(board.cardIds.map(async (cardId) => {
                const card = (await axios('/get-card?cardId=' + cardId)).data;
                const listIds = await Promise.all(card.listIds.map(async (listId) => (await axios('/get-list?listId=' + listId)).data));
                return { ...card, listIds };
            }));
            setBoardData({...board, cardIds});
        }
    };

    /**
     * Handles change for card title text for new card 
     * @param {Object} e - event object 
     */
    function setTitleText(e) { setCardTitle(e.target.value) };

    /**
     * Handles click for new card which adds a new card entry to board model in db and causes a board re-render along with state resets.
     */
    async function handleAddCardClick(e) { 
        if(cardTitle && boardData) {
            const title = cardTitle.trim();
            if(boardData.cardIds.filter(card => card.title === title).length) return;
            const newCard = (await axios.post('/post-card', { boardId: boardData._id, cardTitle: title })).data;
            setBoardData({ ...boardData, cardIds: [ ...boardData.cardIds, newCard ] })
            setCardTitle('');
        }
    };

    /**
     * Handles change for list item title for new list item
     * @param {Object} e - event object 
     */
    function setListTitleText(e) { setListTitle(e.target.value) };

    /**
     * Handles click for new list Item to be added. Db will be updated and new list item rendered.
     * @param {Object} e - event object 
     */
    async function handleAddListClick(e) { 
        if(listTitle && boardData) {
            const cardId = e.target.getAttribute('data-card');
            const newList = (await axios.post('/post-list-item', { cardId, listTitle: listTitle.trim() })).data;
            
            const newCardIds = boardData.cardIds.map(card => 
                card._id === cardId ?
                    {...card, listIds: [...card.listIds, newList]} :
                    card
            )
            setBoardData({ ...boardData, cardIds: newCardIds });

            // reset text inputs
            setListTitle("");
            Array.from(document.querySelectorAll("input[type=text]"))
                .forEach( input => (input.value = ''));
        }
    };

    /**
     * Handles onDragEnd event. 
     */
    function onDragEnd(){

    }

    return(
        <Container>
            <DragDropContext
                onDragEnd={null} // TODO add a function to persist state for drag end
            >
                <Cards
                    handleAddListClick={handleAddListClick}
                    setListTitleText={setListTitleText}
                    cardObjArr={boardData ? boardData.cardIds : []} 
                    listTitle={listTitle}
                />
            </DragDropContext>
            <AddNewCard
                handleAddCardClick={handleAddCardClick} 
                setTitleText={setTitleText} 
                length={boardData ? boardData.length : 0}
                cardTitle={cardTitle}
            />
        </Container>
    );
}

ReactDOM.render(<Board />, document.getElementById('root'));