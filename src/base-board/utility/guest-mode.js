// External modules 
import { nanoid } from 'nanoid';

// board-slice.js

/**
 * Starting boardData for guest accounts
 */
export const guestBoard = {
    _id: nanoid(10),
    title: 'Guest board',
    background: 'https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE4MTM1M30',
    blurHash: 'LB8r2VMfm-s.1GsWQ.RjR+ofnPWB',
    cardIds: [
        {
            _id: nanoid(10),
            title: 'Add more cards!',
            listIds: [
                {
                    _id: nanoid(10),
                    title: 'Add more list items!',
                    content: '',
                },
                {
                    _id: nanoid(10),
                    title: 'Or click me to edit content!',
                    content: '',
                },
                {
                    _id: nanoid(10),
                    title: 'Or change my background! (See top right...)',
                    content: '',
                }
            ]
        },
    ]
};

/**
 * Creates a new card object to be updated to state
 * @param  {String} title - List title to add
 * @return {Object}       - New card object to be added to state
 */
export const addNewCard = (title) => {
    return {
        _id: nanoid(10),
        title,
        listIds: [],
    }
};

/**
 * Creates a new list object to be updated to state
 * @param  {String} listTitle - List title to add 
 * @return {Object}          - New list Object to be added to state
 */
export const addNewListItem = (listTitle) => {
    return {
        _id: nanoid(10),
        title: listTitle,
        content: '',
    }
};