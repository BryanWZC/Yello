import axios from 'axios';

/**
 * Checks if the start and end droppable ids and indexes are the same
 * @param  {Object} source      - object containing source data 
 * @param  {Object} destination - object containing destination data
 * @return {Boolean}            - true if start and end ids and indexes are same            
 */
export function checkIdIndexSame(source, destination) {
    return (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    );
}

/**
 * Gets updated cardId arrays on drag end for card movements. Used for state management.
 * @param  {Array} cardIds         - cardIds array for state management  
 * @param  {Object} source         - contains start drag data
 * @param  {Object} destination    - contains end drag data
 * @return {Array}                 - array of updated cardIds 
 */
export function getUpdatedCardIds(cardIds, source, destination) {
    const newCardIds = [...cardIds];
    const draggedCard = newCardIds.splice(source.index, 1)[0];
    newCardIds.splice(destination.index, 0, draggedCard);
    return newCardIds;
}

/**
 * Make a call to server and update card order on drag end. 
 * @param {String} boardId     - current board id 
 * @param {Array} newCardIds   - updated cardId array 
 */
export async function updateDBCardOrder(boardId, newCardIds) {
    await axios.post('/board/update/card-order', { boardId , newCardIds });
}

/**
 * Handles logic for dragging items from one list to another
 * @param  {Object} cardIds        - object of card objects referenced by ids
 * @param  {Object} source         - contains start drag data
 * @param  {Object} destination    - contains end drag data
 * @return {Object}                - object containing start index, end index, start card and end card
 */
export function newCardIdsOnListDrag(cardIds, source, destination) {
    if(!destination) return;
    const startCardId = source.droppableId;
    const endCardId = destination.droppableId;

    const startIndex = cardIds.map(card => card._id).indexOf(startCardId);
    const endIndex = cardIds.map(card => card._id).indexOf(endCardId);

    const startListIds = [...cardIds[startIndex].listIds];
    const endListIds = [...cardIds[endIndex].listIds];
    const startItem = startListIds.splice(source.index, 1)[0];

    let startCard, endCard;
    if(startIndex === endIndex){
        startListIds.splice(destination.index, 0, startItem);
        startCard = { ...cardIds[startIndex], listIds: startListIds };
        endCard = startCard;
    }
    else{
        endListIds.splice(destination.index, 0, startItem);
        startCard = { ...cardIds[startIndex], listIds: startListIds };
        endCard = { ...cardIds[endIndex], listIds: endListIds };
    } 

    return { startIndex, endIndex, startCard, endCard };
} 

/**
 * Make a call to server and update list order on drag end. 
 * @param {Object} startCard - starting card object to update on db
 * @param {Object} endCard   - ending card object to update on db 
 */
export async function updateDBListOrder(startCard, endCard) {
    await axios.post('/board/update/list-order', { startCard, endCard });
}