// External modules
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Internal modules
import AddBoardOverlay from './add-board-overlay';
import DisplayBoards from './display-boards';
import RenameBoardOverlay from './rename-board-overlay';
import { returnHome } from '../utility/general';

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
        axios.get('/user/get/boardData').then(data => setBoardData(data.data));
    }, []);

    const closeAddBoardOverlay = useCallback(
        (e) => {
            if(e.currentTarget === e.target) setDisplayAddBoard(false);
        },[setDisplayAddBoard, displayAddBoard]);


    const openRenameOverlay = useCallback(() => {
        setDisplayRenameBoard(menuActive);
        setMenuActive(false); // closes action menu
    }, [setDisplayRenameBoard, displayRenameBoard, menuActive]);

    const closeRenameOverlay = useCallback(
        (e) => {
            if(e.currentTarget === e.target) setDisplayRenameBoard(false);
    },[setDisplayRenameBoard, displayRenameBoard]);

    const handleSetActive = useCallback((e) => {
        if(!menuActive) setMenuActive({ id: e.target.getAttribute('data-id'), title: e.target.getAttribute('data-title') });
        else setMenuActive(false);
    }, [setMenuActive, menuActive]);

    return(
        <UserContainer
        >
            { displayAddBoard && <AddBoardOverlay handleClick={ closeAddBoardOverlay } />}
            { displayRenameBoard && <RenameBoardOverlay handleClick={ closeRenameOverlay } currentBoard={displayRenameBoard}/>}
            <HeaderContainer>
                <Heading onClick={returnHome}>Yello</Heading>
            </HeaderContainer>
            <DataContainer>
                <BoardsTitle>Your Boards</BoardsTitle>
                <AddBoardButton onClick={ () => setDisplayAddBoard(true) }>+ Add another Board</AddBoardButton>
                <DisplayBoards boardData={boardData} handleSetActive={handleSetActive} menuActive={menuActive} openRenameOverlay={openRenameOverlay}/>
            </DataContainer>
            { menuActive && <TransparentOverlay onClick={() => setMenuActive(false)}/> }
        </UserContainer>
    );
}

export default UserPage;