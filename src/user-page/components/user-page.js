// External modules
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Internal modules
import AddBoardOverlay from './add-board-overlay';
import DisplayBoards from './display-boards';
import RenameBoardOverlay from './rename-board-overlay';
import { returnHome, deleteBoard, getBoardData } from '../utility/general';
import { closeAddBoardOverlayCB, closeRenameOverlayCB, handleDeleteBoardCB, handleSetActiveCB, openRenameOverlayCB } from '../utility/usecallback-helpers';

const UserContainer = styled.div`
    width: 100%;
    min-height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const HeaderContainer = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    margin-bottom: 24px;
    background-color: #343330;
    justify-content: center;
`;

const Heading = styled.h1`
    font-size: 36px;
    color: #FFD400;
    cursor: pointer;

    &:hover {
        color: #FFE047;
    }
`;

const DataContainer = styled.div`
    width: 710px;
    height: 100% - 40px;
    display: flex;
    flex-direction: column;
`;

const BoardsTitle = styled.h1`
    margin-bottom: 12px;
    font-size: 36px;
`;

const AddBoardButton = styled.button`
    width: 160px;
    height: 32px;
    border: none;
    border-radius: 4px;
    padding: 0 15px;
    margin-bottom: 48px;
    background-color: #FFD400;
    outline: none;
    cursor: pointer;

    &:hover {
        background-color: #E0BB00;
    }
`;

const TransparentOverlay = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 4;
`;

const UserPage = (props) => {
    const [ boardData, setBoardData ] = useState([]);
    const [ displayAddBoard, setDisplayAddBoard ] = useState(false);
    const [ displayRenameBoard, setDisplayRenameBoard ] = useState(false);
    const [ menuActive, setMenuActive ] = useState(false);

    useEffect(() => { 
        getBoardData().then(data => setBoardData(data)); 
    }, []);

    const closeAddBoardOverlay = useCallback(
        (e) => closeAddBoardOverlayCB(e, { setDisplayAddBoard }));

    const openRenameOverlay = useCallback(
        () => openRenameOverlayCB({ setDisplayRenameBoard, setMenuActive, menuActive }), [setDisplayRenameBoard, menuActive]);

    const closeRenameOverlay = useCallback(
        (e) => closeRenameOverlayCB(e, { setDisplayRenameBoard }));

    const onSubmitRename = useCallback(
        () => setDisplayRenameBoard(false));

    const handleSetActive = useCallback(
        (e) => handleSetActiveCB(e, { menuActive, setMenuActive }), [setMenuActive, menuActive]);

    const handleDeleteBoard = useCallback(
        async () => await handleDeleteBoardCB({ deleteBoard, menuActive, setBoardData, setMenuActive }), [deleteBoard, setMenuActive, menuActive]);

    const handleUpdateBoards = useCallback((data) => setBoardData(data), [setBoardData]);

    return(
        <UserContainer>
            { displayAddBoard && <AddBoardOverlay handleClick={ closeAddBoardOverlay }/>}
            { displayRenameBoard && <RenameBoardOverlay 
                handleClick={ closeRenameOverlay } 
                currentBoard={ displayRenameBoard } 
                handleUpdateBoards={ handleUpdateBoards }
                onSubmitRename={onSubmitRename}
            />}
            <HeaderContainer>
                <Heading onClick={returnHome}>Yello</Heading>
            </HeaderContainer>
            <DataContainer>
                <BoardsTitle>Your Boards</BoardsTitle>
                <AddBoardButton onClick={ () => setDisplayAddBoard(true) }>+ Add another Board</AddBoardButton>
                <DisplayBoards 
                    boardData={boardData} 
                    handleSetActive={handleSetActive} 
                    menuActive={menuActive} 
                    openRenameOverlay={openRenameOverlay}
                    handleDelete={handleDeleteBoard}
                />
            </DataContainer>
            { menuActive && <TransparentOverlay onClick={() => setMenuActive(false)}/> }
        </UserContainer>
    );
}

export default UserPage;