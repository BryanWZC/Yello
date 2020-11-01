import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import axios from 'axios';
import { Cards, AddNewCard } from './card';
import { ListItemExpand } from './list-item-expand';

import { getBoard, getBoardAllCards } from './helpers/board-state-helpers';
import { findIfTitleExists, addNewCard } from './helpers/board-add-card-helpers';
import { addNewListItem, getNewCardIds, inputFieldReset } from './helpers/board-add-list-helpers';
import { checkIdIndexSame, getUpdatedCardIds, updateDBCardOrder,
    getUpdatedCardIdsForList, updateDBListOrder } from './helpers/board-drag-helpers';

/**
 * Styles
 */
const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

const Board = () => {
    const [boardData, setBoardData] = useState(null); 
    const [cardTitle, setCardTitle] = useState('');
    const [listTitle, setListTitle] = useState('');
    const [renderAddCard, setRenderAddCard] = useState(false);
    const [inputExpand, setInputExpand] = useState(''); // TODO SET THE STATES FOR THESE SUCH THAT WHEN YOU CLICK ON AN INPUT OR TEXTAREA, THE ADD BUTTON POPS UP FROM BELOW AND STYLES CHANGE
    const [itemData, setItemData] = useState(null);
    const [temp, setTemp] = useState(''); //used for any temp stores

    useEffect(() =>{ updateBoardCardData() });
    /**
     * get board data
     */
    const updateBoardCardData = async () => {
        if(!boardData) {
            const boardId = '5f9dc19603c6526b6c3ac32b';
            const board = await getBoard(boardId);
            const cardIds = await getBoardAllCards(board);
            setBoardData({...board, cardIds});
            setRenderAddCard(true)
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
    async function handleAddCardClick() { 
        if(cardTitle && boardData) {
            const title = cardTitle.trim();
            
            if(findIfTitleExists(boardData, title)) return;

            const newCard = addNewCard(boardData._id, title);
            const newCardIds = [ ...boardData.cardIds, newCard ];
            setBoardData({ ...boardData, cardIds: newCardIds });
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
            const cardId = e.target.getAttribute('id');
            const newList = addNewListItem(cardId, listTitle.trim());
            const newCardIds = getNewCardIds(boardData, newList);
            setBoardData({ ...boardData, cardIds: newCardIds });
            setListTitle('');
            inputFieldReset();
        }
    };
    
    /**
     * Handles onDragEnd event. Updates state and db.
     */
    async function onDragEnd(res){
        const { type, source, destination } = res;
        if(!destination) return;
        if(checkIdIndexSame(source, destination)) return;
        if(type === 'card'){
            const cardIds = getUpdatedCardIds(boardData, source, destination);
            setBoardData({ ...boardData, cardIds });
            await updateDBCardOrder(boardData._id, cardIds);
        }
        if(type === 'list'){
            const cardIds = getUpdatedCardIdsForList(boardData, source, destination);
            setBoardData({...boardData, cardIds });
            await updateDBListOrder(cardIds, source, destination);
        }
    }

    /**
     * Displays a card with list item details when clicked
     * @param {Object} e - event object
     */
    async function handleItemClick(e) {
        const id = e.target.getAttribute('data-itemid');
        const cardId = e.target.getAttribute('data-cardid')
        const item = (await axios.get('/get-item?listId=' + id)).data;
        setItemData({...item, cardId});
    }

    /**
     * Handles overlay on click to clear out and reveal Board component
     * @param {Object} e - event object 
     */
    async function overlayOnClick(e) { 
        if(!e.target.getAttribute('id')) setInputExpand('');
        if(e.target.getAttribute('data-return')) setItemData(null), setTemp('');
    }

    /**
     * Set item data on change and resets input expansion. Same method used for textarea and submit button
     * @param {Object} e - event object 
     */
    async function handleItemData(e){ 
        let target, content, innerHTML;
        if(!e.target.getAttribute('id')) setInputExpand('');

        // Checks if textarea or submit button
        if(e.target.getAttribute('role') === 'textarea') target = e.target;
        else target = document.querySelector('div#item-content-input');

        content = target.innerText;
        innerHTML = target.innerHtml;
        
        if(content.trim() === '') innerHTML = "<pre id='item-content-input'></pre>";
        if(temp !== content) await axios.post('/update-item-content', { ...itemData, content });
        setTemp(content);
    }

    /**
     * Handles item deletes from the db and state
     */
    async function handleItemDelete(){
        const cardId = itemData.cardId;
        const itemId = itemData._id;
        
        const newCardIds = boardData.cardIds;
        const cardIndex = newCardIds.reduce((acc, card, index) => card._id === cardId ? index : acc, 0);
        const itemIndex = newCardIds[cardIndex].listIds.reduce((acc, item, index) => item._id === itemId ? index : acc, 0);

        newCardIds[cardIndex].listIds.splice(itemIndex, 1);

        setBoardData({ ...boardData, cardIds: newCardIds });
        setItemData(null);
        await axios.post('/delete-item', { cardId, itemId });
    }

    /**
     * Switch to expand input box and change styles for each one when clicked
     * @param {Object} e - event object 
     */
    function handleInputExpand(e){ setInputExpand(e.target.getAttribute('id')) };

    /**
     * Switch to expand textarea for adding item content specifically and change styles 
     */
    function handleTextareaExpand(){ setInputExpand('item-content-input') };

    return(
        <React.Suspense>
            <Container>
                <DragDropContext
                    onDragEnd={onDragEnd}
                >
                    <Cards
                        handleAddListClick={handleAddListClick}
                        setListTitleText={setListTitleText}
                        handleItemClick={handleItemClick}
                        cardObjArr={boardData ? boardData.cardIds : []} 
                        listTitle={listTitle}
                    />
                </DragDropContext>
                {renderAddCard ? 
                    <AddNewCard
                        handleAddCardClick={handleAddCardClick} 
                        setTitleText={setTitleText} 
                        length={boardData ? boardData.length : 0}
                        cardTitle={cardTitle}
                    /> :
                    null
                }
                {itemData ?
                    <ListItemExpand 
                        itemData={itemData} 
                        cardArray={boardData.cardIds}
                        handleItemData={handleItemData}
                        overlayOnClick={overlayOnClick}
                        handleTextareaExpand={handleTextareaExpand}
                        inputExpand={inputExpand}
                        handleItemDelete={handleItemDelete}
                    /> :
                    null
                }
            </Container>
        </React.Suspense>
    );
}

ReactDOM.render(<Board />, document.getElementById('root'));