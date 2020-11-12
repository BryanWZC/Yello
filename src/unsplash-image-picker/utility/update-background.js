// External modules
import axios from 'axios';

/**
 * Makes a call to the server to update background value in db for board doc
 * @param  {Object} { boardId, backgroundLink } - Object containing current board id and background link for update
 * @return {Null} 
 */
export async function updateBackground({ boardId, backgroundLink }) {
    await axios.post('/post-background', { boardId, backgroundLink });
}