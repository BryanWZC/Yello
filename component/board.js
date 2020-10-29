import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from 'react-beautiful-dnd';
import Cards from './card';
import axios from 'axios';

const Board = () => {
    const [boardData, setBoardData] = useState(null); 
    const [cardTitle, setCardTitle] = useState(null);
    const [titlePlaceholder, setTitlePlaceholder] = useState(true);
    const [listTitle, setListTitle] = useState(null);
    
    /**
     * get board data
     */
    const updateBoardCardData = async () => {
        if(!boardData) {
            const boardId = '5f9a78438bbf7560841d26e6';
            const board = (await axios('/get-board?boardId=' + boardId)).data;
            
            const cardIds = await Promise.all(boardObj.cardIds.map(async (cardId) => {
                const card = (await axios('/get-card?cardId=' + cardId)).data;
                const listIds = await Promise.all(card.listIds.map(async (listId) => (await axios('/get-list?listId=' + listId)).data));
                return { ...card, listIds };
            }));
            setBoardData({...board, cardIds});
        }
    };

    updateBoardCardData();

    /**
     * Handles change for card title text for new card 
     * @param {Object} e - event object 
     */
    function setTitleText(e) { setCardTitle(e.target.value) };

    /**
     * Handles click for new card which adds a new card entry to board model in db and causes a board re-render along with state resets.
     */
    async function handleAddCardClick() { 
        if(cardTitle && boardData) {
            const data = { boardId: boardData._id, cardTitle };
            await axios.post('/post-card-title', data)

            // TODO, SEE IF STATE UPDATES PROPERLY
            updateBoardCardData();
            setCardTitle(null);
            setTitlePlaceholder(false);
        }
    };

    /**
     * Handles change for list item title for new list item
     * @param {Object} e - event object 
     */
    function setListTitleText(e) { setListTitle(e.target.value) };

    /**
     * Handles click for new list Item to be added
     * @param {Object} e - event object 
     */
    function handleAddListClick(e) { 
        if(listTitle && boardData) {
            const data = { cardId: e.target['data-cardId'], listTitle };
            axios.post('/post-list-item', data);

            setListTitle(null);
        }
    };

    /**
     * Handles on blur event for new item input
     */
    function handleInputListOnBlur(){ setListTitle(null) };

    /**
     * Styles
     */
    const Container = styled.div`
        display: flex;
    `;

    return(
        <DragDropContext
            onDragEnd={} // TODO add a function to persist state for drag end
        >
            <Container>
                <Cards
                    handleAddCardClick={handleAddCardClick}
                    handleAddListClick={handleAddListClick}
                    handleInputListOnBlur={handleInputListOnBlur}
                    setTitleText={setTitleText}
                    titlePlaceholder={titlePlaceholder}
                    cardTitle={cardTitle}
                    listTitle={listTitle}
                    setListTitleText={setListTitleText}
                    cardObjArr={boardData ? boardData.cardIds : []} 
                />
            </Container>
        </DragDropContext>
    );
}

ReactDOM.render(<Board />, document.getElementById('root'));