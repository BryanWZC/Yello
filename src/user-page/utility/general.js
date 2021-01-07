// External modules
import axios from 'axios';

/**
 * Returns to main user page
 */
export const returnHome = async () => window.location.href = ((await axios.get('/board/return/home')).data.url);