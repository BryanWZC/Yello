import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import axios from 'axios';
import { Cards, AddNewCard } from './card';
import { ListItemExpand } from './list-item-expand';

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

    useEffect(() =>{ updateBoardCardData() });

    /**
     * get board data
     */
    const updateBoardCardData = async () => {
        if(!boardData) {
            const boardId = '5f9d5c2e09192860108dc639';
            const board = (await axios('/get-board?boardId=' + boardId)).data;
            const cardIds = await Promise.all(board.cardIds.map(async (cardId) => {
                const card = (await axios('/get-card?cardId=' + cardId)).data;
                const listIds = await Promise.all(card.listIds.map(async (listId) => (await axios('/get-item-title-only?listId=' + listId)).data));
                return { ...card, listIds };
            }));
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
            const cardId = e.target.getAttribute('id');
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
     * Handles onDragEnd event. Updates state and db.
     */
    async function onDragEnd(res){
        const { type, source, destination } = res;
        if(!destination) return;
        if(
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;
        
        if(type === 'card'){
            const newCardOrder = Array.from(boardData.cardIds);
            const draggedCard = newCardOrder.splice(source.index, 1)[0];
            newCardOrder.splice(destination.index, 0, draggedCard);

            setBoardData({ ...boardData, cardIds: newCardOrder });

            const newCardIds = newCardOrder.map(card => card._id);
            await axios.post('/update-card-order', { boardId: boardData._id , newCardIds });
        }

        if(type === 'list'){
            const cards = Array.from(boardData.cardIds);
            const cardIds = cards.map(card => card._id);

            const startCardIndex = cardIds.indexOf(source.droppableId);
            const endCardIndex = cardIds.indexOf(destination.droppableId);

            const draggedItem = cards[startCardIndex].listIds.splice(source.index, 1)[0];
            cards[endCardIndex].listIds.splice(destination.index, 0, draggedItem);
            
            setBoardData({...boardData, cardIds: cards});

            const startCardListIds = cards[startCardIndex].listIds.map(item => item._id);
            const endCardListIds = cards[endCardIndex].listIds.map(item => item._id);

            await axios.post('/update-list-order', {
                startCard: { _id: source.droppableId, listIds: startCardListIds },
                endCard: { _id: destination.droppableId, listIds: endCardListIds },
            });
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
    function overlayOnClick(e) { 
        if(!e.target.getAttribute('id')) setInputExpand('');
        if(e.target.getAttribute('data-return')) setItemData(null);
    }

    /**
     * Set item data on change and resets input expansion
     * @param {Object} e - event object 
     */
    async function handleItemData(e){ 
        const content = e.target.innerText;
        if(!e.target.getAttribute('id')) setInputExpand('');
        if(content.trim() === '') e.target.innerHTML = "<pre id='item-content-input'></pre>";

        if(content.trim() !== itemData.content){
            await axios.post('/update-item-content', { ...itemData, content }); 
            setItemData({ ...itemData, content });
        }
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