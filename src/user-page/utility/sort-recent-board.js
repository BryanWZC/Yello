// External modules
import axios from 'axios';

export const sortRecentBoard = async (id) => {
    await axios.post('/user/post/recentBoard', { boardId: id });
};