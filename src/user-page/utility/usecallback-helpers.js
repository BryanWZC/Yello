/**
 * Closes the add board overlay
 * @param {Object} e - Event object
 * @param {Object} props - properties object containing useState function(s) and state
 */
export const closeAddBoardOverlayCB = (e, props) => {
    const { setDisplayAddBoard } = props;
    if(e.currentTarget === e.target) setDisplayAddBoard(false);
}

/**
 * Opens rename overlay
 * @param {Object} props - properties object containing useState function(s) and state
 */
export const openRenameOverlayCB = (props) => {
    const { setDisplayRenameBoard, menuActive, setMenuActive } = props;
    setDisplayRenameBoard(menuActive);
    setMenuActive(false); // closes action menu
}

/**
 * closes rename overlay
 * @param {Object} props - properties object containing useState function(s) and state
 */
export const closeRenameOverlayCB = (e, props) => {
    const { setDisplayRenameBoard } = props;
    if(e.currentTarget === e.target) setDisplayRenameBoard(false);
}

/**
 * handles set active menu with current clicked board details
 * @param {Object} e - Event object
 * @param {Object} props - properties object containing useState function(s) and state
 */
export const handleSetActiveCB = (e, props) => {
    const { menuActive, setMenuActive } = props;
    if(!menuActive) setMenuActive({ id: e.target.getAttribute('data-id'), title: e.target.getAttribute('data-title') });
    else setMenuActive(false);
}

/**
 * handles deleting of a board on view and in db 
 * @param {Object} props - properties object containing useState function(s) and state
 */
export const handleDeleteBoardCB = async (props) => {
    const { deleteBoard, menuActive, setBoardData, setMenuActive } = props;
    const newBoards = await deleteBoard(menuActive);
    setBoardData(newBoards);
    setMenuActive(false); // closes action menu
}