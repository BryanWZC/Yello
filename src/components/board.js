// React modules
import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";

// Redux modules 
import { configureStore, unwrapResult } from '@reduxjs/toolkit'; 
import rootReducer from '../reducers/reducers';
import { getBoardData, setCardTitleText, handleAddCard } from '../reducers/boardReducers';
import { Provider, useDispatch, useSelector } from 'react-redux';

// Other external modules
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import axios from 'axios';

// Internal modules
import { Cards, AddNewCard } from './card';
import { ListItemExpand } from './list-item-expand';
import { CardActions } from './card-actions';
import { getBoard, getBoardAllCards } from './helpers/board-state-helpers';
import { findIfTitleExists, addNewCard } from './helpers/board-add-card-helpers';
import { 
    addNewListItem, 
    getNewCardIds, 
    inputFieldReset } from './helpers/board-add-list-helpers';
import { 
    checkIdIndexSame, getUpdatedCardIds, 
    updateDBCardOrder, getUpdatedCardIdsForList, 
    updateDBListOrder } from './helpers/board-drag-helpers';

// Styles
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
    const [offsets, setOffsets] = useState(null);

    const dispatch = useDispatch();

    useEffect(() =>{ 
        updateBoardCardData();
        dispatch(getBoardData('5f9fc3462df3c70d34dc28ca'));
    }, [dispatch]);
    /**
     * get board data
     */

    const updateBoardCardData = async () => {
        if(!boardData) {
            const boardId = '5f9fc3462df3c70d34dc28ca';
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
    function setTitleText(e) { 
        setCardTitle(e.target.value);
        dispatch(setCardTitleText(e));
    };
    
    /**
     * Handles click for new card which adds a new card entry to board model in db and causes a board re-render along with state resets.
     */
    async function handleAddCardClick() { 
        if(cardTitle && boardData) {
            const title = cardTitle.trim();
            
            if(findIfTitleExists(boardData, title)) return;

            const newCard = await addNewCard(boardData._id, title);
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
            const newList = await addNewListItem(cardId, listTitle);
            const newCardIds = getNewCardIds(boardData, newList, cardId);
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
            const data = getUpdatedCardIdsForList(boardData, source, destination);
            const { cardIds, startCardIndex, endCardIndex } = data;
            setBoardData({...boardData, cardIds });
            await updateDBListOrder(cardIds, {...source, startCardIndex}, {...destination, endCardIndex});
        }
    };

    /**
     * On card ellipsis click, make the card action menu visible 
     * @param {Object} e - event object
     */
    function setOffsetsCard(e) { 
        if(offsets) return setOffsets(null), setTemp('');
        if(e.target === e.currentTarget) {
            setOffsets({left: e.target.offsetLeft, top: e.target.offsetTop + 40}); 
            setTemp({
                cardId: e.target.getAttribute('data-cardid'),
                boardId: e.target.getAttribute('data-boardid'),
            });
        }
    };

    /**
     * Reset offset state and hide the card action menu when click everywhere except the card action menu. PLaced globally on the global container.
     */
    function setOffsetsCardOnBlur(e) { 
        if(offsets && e.target.getAttribute('id') !== 'card-action-menu') setOffsets(null), setTemp(''); 
    };

    /**
     * Handles card delete upon button click on card action menu
     */
    async function handleCardDelete() {
        const { boardId, cardId } = temp;
        const newCardIds = boardData.cardIds.filter(card => card._id !== cardId);

        setBoardData({...boardData, cardIds: newCardIds});
        await axios.post('delete-card', { boardId, cardId });
        setOffsets(null);
        setTemp('');
    }

    /**
     * Displays a card with list item details and overlays the main page when clicked
     * @param {Object} e - event object
     */
    async function handleItemClick(e) {
        const id = e.target.getAttribute('data-itemid');
        const cardId = e.target.getAttribute('data-cardid');
        const item = (await axios.get('/get-item?listId=' + id)).data;
        setItemData({...item, cardId});
        setOffsets(null);
    };

    /**
     * Handles overlay on click to clear out and reveal Board component
     * @param {Object} e - event object 
     */
    async function overlayOnClick(e) { 
        if(!e.target.getAttribute('id')) setInputExpand('');
        if(e.target.getAttribute('data-return')) setItemData(null), setTemp('');
    };

    /**
     * Set item data on change and resets input expansion. Same method used for textarea and submit button
     * @param {Object} e - event object 
     */
    async function handleItemData(e){ 
        let target, content;
        if(!e.target.getAttribute('id')) setInputExpand('');

        // Checks if textarea or submit button
        if(e.target.getAttribute('role') === 'textarea') target = e.target;
        else target = document.querySelector('div#item-content-input');

        content = target.innerText.trim();
        
        if(content === '') target.innerHTML = "<pre id='item-content-input'></pre>";
        if(temp !== content) await axios.post('/update-item-content', { ...itemData, content });
        setTemp(content);
    };

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
    };

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
            <Container
                onClick={setOffsetsCardOnBlur}
            >
                <DragDropContext
                    onDragEnd={onDragEnd}
                >
                    <Cards
                        handleAddListClick={handleAddListClick}
                        setListTitleText={setListTitleText}
                        handleItemClick={handleItemClick}
                        cardObjArr={boardData ? boardData.cardIds : []} 
                        listTitle={listTitle}
                        inputExpand={inputExpand}
                        setOffsetsCard={setOffsetsCard}
                        boardId={boardData ? boardData._id : null}
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
                {offsets ?
                    <CardActions 
                        offsets={offsets}
                        handleCardDelete={handleCardDelete}
                        setOffsetsCardOnBlur={setOffsetsCardOnBlur}
                    /> :
                    null
                }
            </Container>
        </React.Suspense>
    );
}

const store = configureStore({
    reducer: rootReducer,
});

ReactDOM.render(
    <Provider store={store}>
        <Board />
    </Provider>, 
    document.getElementById('root')
);
