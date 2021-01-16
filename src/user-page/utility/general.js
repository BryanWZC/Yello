// External modules
import axios from 'axios';

/**
 * Fetch board data from db
 */
export const getBoardData = async () => (await axios.get('/user/get/boardData')).data; 

/**
 * Returns to main user page
 */
export const returnHome = async () => window.location.href = ((await axios.get('/user/return/home')).data.url);

/**
 * Handles submit for the renaming boards
 * @param {Object} e  - event object
 * @param {Object} props  - object containing other usecallback functions and board details
 */
export const handleSubmitRename = async(e, props) => {
    const { handleUpdateBoards, onSubmitRename, boardId, title } = props;
    e.preventDefault();
    const newBoards = (await axios.post('/user/post/renameBoard', { boardId: boardId, boardTitle: title })).data;
    handleUpdateBoards(newBoards);
    onSubmitRename();
}

/**
 * Deletes board when click on delete option on action menu
 * @param {Object} menuActive - object containing current board id
 */
export const deleteBoard = async (menuActive) => {
    await axios.post('/user/post/deleteBoard', { boardId: menuActive.id });
    await returnHome();
};