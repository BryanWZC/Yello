// Internal modules - DB
const { User, Board, Card, List } = require('../db/model');

/**
 * Adds a new card object within the board object extracted from the database
 * @param  {Object} { boardId, cardTitle } - object containing board id and cardTitle
 * @return {null}
 */
async function addNewCard({ boardId, cardTitle }) {
    const queryTitle = { title: cardTitle };
    
    const newCard = await Card.create(queryTitle);
    const { _id, title, listIds } = newCard;

    await Board.findByIdAndUpdate(boardId, { $push: { cardIds: _id}}, { useFindAndModify: false }).exec();
    return { _id, title, listIds };
}

/**
 * Add a new list item to a card. Updates listId array in card and adds new entry for list in db.
 * @param {Object} { cardId, listTitle } - Object that contains cardId and listTitle 
 * @return {null}
 */
async function addNewListItem({ cardId, listTitle }) {
    const newList = await List.create({ title: listTitle });
    const { _id, title, content } = newList;

    await Card.findByIdAndUpdate(cardId, { $push: { listIds: _id }}, { useFindAndModify: false }).exec();
    return { _id, title, content };
}

/**
 * Updates the card order within a Board document after a card has been dragged to displace another card's location
 * @param  {Object} { boardId, source, destination } - parameters for getting board and updating cardId order
 * @return {null} 
 */
async function updateCardOrder({ boardId, newCardIds }) {
    await Board.findByIdAndUpdate(boardId, { cardIds: newCardIds }, { new: true, useFindAndModify: false }).exec();
}   

/**
 * Update start and end card positions for dragging and dropping functionality
 * @param {Object} { startCard, endCard } - parameters for start and end cards with data within
 */
async function updateListOrder({ startCard, endCard }) {
    await Card.findByIdAndUpdate(startCard._id, { listIds: startCard.listIds }, { useFindAndModify: false }).exec();
    if(startCard._id === endCard._id) return;
    await Card.findByIdAndUpdate(endCard._id, { listIds: endCard.listIds }, { useFindAndModify: false }).exec();
}

/**
 * Updates list item in db given new content
 * @param {Object} { _id, content } - object containing list item parameters to update 
 */
async function updateItemContent({ _id, content }) {
    await List.findByIdAndUpdate(_id, { content }, { useFindAndModify: false });
}

/**
 * Updates list item in db given new title
 * @param {Object} { _id, title } - object containing list item parameters to update
 */
async function updateItemTitle({ _id, title }) {
    await List.findByIdAndUpdate(_id, { title }, { useFindAndModify: false });
}

/**
 * Updates db to change title of card to new title
 * @param {Object} { _id, title } - object containing card id and new title 
 */
async function updateCardTitle({ cardId, cardTitle }) {
    return await Card.findByIdAndUpdate(cardId, { title: cardTitle }, { useFindAndModify: false, new: true }).lean().exec();
}

/**
 * Delete an item from db and updates card listIds array
 * @param {Object} { cardId, itemId } - cardId with itemId of to be deleted item
 */
async function deleteItem({ cardId, itemId }){
    await List.findByIdAndDelete(itemId, { useFindAndModify: false });
    await Card.findByIdAndUpdate(cardId, { $pull: { listIds: itemId } }, { useFindAndModify: false });
}

/**
 * Deletes a card from db and updates board cardIds array
 * @param {Object} { boardId, cardId } - Object containing board and card id 
 */
async function deleteCard({ boardId, cardId }) {
    await Card.findByIdAndDelete(cardId, { useFindAndModify: false });
    await Board.findByIdAndUpdate(boardId, { $pull: { cardIds: cardId } },{ useFindAndModify: false });
}

module.exports = {
    base:{
        addNewCard,
        addNewListItem,
        updateCardOrder,
        updateListOrder,
        updateItemContent,
        updateItemTitle,
        updateCardTitle,
        deleteItem,
        deleteCard,
    }
}