// External modules
import axios from 'axios';

/**
 * Makes a call to the server to update background value in db for board doc
 * @param  {Object} { boardId, backgroundLink } - Object containing current board id and background link for update
 * @return {Null} 
 */
export async function updateBackground({ title, boardId, backgroundLink, thumb, blurHash }) {
    await axios.post('/board/post/background', { title, boardId, backgroundLink, thumb, blurHash });
}