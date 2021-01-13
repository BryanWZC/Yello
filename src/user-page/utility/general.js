// External modules
import axios from 'axios';

/**
 * Returns to main user page
 */
export const returnHome = async () => window.location.href = ((await axios.get('/user/return/home')).data.url);

/**
 * Deletes board when click on delete option on action menu
 */
export const deleteBoard = async (menuActive) => {
    await axios.post('/user/post/deleteBoard', { boardId: menuActive.id });
    await returnHome();
};