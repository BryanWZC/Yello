import axios from 'axios';

/**
 * Checks if the start and end droppable ids and indexes are the same
 * @param  {Object} source      - object containing source data 
 * @param  {Object} destination - object containing destination data
 * @return {Boolean}            - true if start and end ids and indexes are same            
 */
function checkIdIndexSame(source, destination) {
    return (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
        );
}

/**
 * Gets updated cardId arrays on drag end for card movements. Used for state management.
 * @param  {Object} boardData      - boardData object for state management  
 * @param  {Object} source         - contains start drag data
 * @param  {Object} destination    - contains end drag data
 * @return {Array}                 - array of updated cardIds 
 */
function getUpdatedCardIds(boardData, source, destination) {
    const newCardOrder = Array.from(boardData.cardIds);
    const draggedCard = newCardOrder.splice(source.index, 1)[0];
    newCardOrder.splice(destination.index, 0, draggedCard);
    return newCardOrder;
}

/**
 * Make a call to server and update card order on drag end. 
 * @param {String} boardId     - current board id 
 * @param {Array} newCardOrder - updated cardId array 
 */
async function updateDBCardOrder(boardId, newCardOrder) {
    const newCardIds = newCardOrder.map(card => card._id);
    await axios.post('/update-card-order', { boardId , newCardIds });
}

/**
 * Gets updated cardId arrays on drag end for list movements. Used for state management.
 * @param  {Object} boardData   - current board object 
 * @param  {Object} source      - contains start drag data
 * @param  {Object} destination - contains end drag data
 * @return {Array}              - updated cardId array
 */
function getUpdatedCardIdsForList(boardData, source, destination) {
    const cardIds = Array.from(boardData.cardIds);
    const cardIdsOnly = cardIds.map(card => card._id);

    const startCardIndex = cardIdsOnly.indexOf(source.droppableId);
    const endCardIndex = cardIdsOnly.indexOf(destination.droppableId);

    const draggedItem = cardIds[startCardIndex].listIds.splice(source.index, 1)[0];
    cardIds[endCardIndex].listIds.splice(destination.index, 0, draggedItem);
    return cardIds;
}

/**
 * Make a call to server and update list order on drag end.
 * @param {Array} cardIds - array containing card objects with list objects within
 * @param  {Object} source      - contains start drag data
 * @param  {Object} destination - contains end drag data
 */
async function updateDBListOrder(cardIds, source, destination) {
    const startCardListIds = cardIds[startCardIndex].listIds.map(item => item._id);
    const endCardListIds = cardIds[endCardIndex].listIds.map(item => item._id);
    
    await axios.post('/update-list-order', {
        startCard: { _id: source.droppableId, listIds: startCardListIds },
        endCard: { _id: destination.droppableId, listIds: endCardListIds },
    });
}

export {
    checkIdIndexSame, getUpdatedCardIds, updateDBCardOrder,
    getUpdatedCardIdsForList, updateDBListOrder
}