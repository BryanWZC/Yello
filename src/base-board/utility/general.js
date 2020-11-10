import * as select from '../selectors/selectors';
import { useSelector } from 'react-redux';

/**
 * Gets card data object from state using card id
 * @param {String} cardId - current card id 
 */
export const getCardFromId = (cardId) => {
    const cardIndex = useSelector(select.cardIds).map(card => card._id).indexOf(cardId);
    return useSelector(select.cardIds)[cardIndex];
}

/**
 * Get item data object from state using item id
 * @param {String} cardId - current card id
 * @param {String} itemId - current item id
 */
export const getItemFromId = (cardId, itemId) => {
    const card = getCardFromId(cardId);
    const itemIndex = card.listIds.map(item => item._id).indexOf(itemId);
    return card.listIds[itemIndex];
}