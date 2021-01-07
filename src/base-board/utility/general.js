// External modules
import { useSelector } from 'react-redux';
import axios from 'axios';

// Internal modules
import * as select from '../selectors/selectors';

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

/**
 * Returns to main user page
 */
export const returnHome = async () => window.location.href = ((await axios.get('/board/return/home')).data.url);
