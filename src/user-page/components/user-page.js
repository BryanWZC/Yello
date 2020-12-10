// External modules
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Internal modules
import AddBoardOverlay from './add-board-overlay';
import DisplayBoards from './display-boards';

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
`;

const DataContainer = styled.div`
    width: 700px;
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
    background-color: #FFD400;
    outline: none;
    cursor: pointer;

    &:hover {
        background-color: #E0BB00;
    }
`;

const UserPage = (props) => {
    const [ boardData, setBoardData ] = useState([]);
    const [ displayAddBoard, setDisplayAddBoard ] = useState(false);

    useEffect(() => {
        axios.get('/user/get/boardData').then(data => setBoardData(data.data));
    }, []);

    function handleOverlayClick(e) {
        if(e.currentTarget === e.target) {
            setDisplayAddBoard(false);
        }
    }

    return(
        <UserContainer>
            { displayAddBoard && <AddBoardOverlay handleOverlayClick={ handleOverlayClick } />}
            <HeaderContainer>
                <Heading>Yello</Heading>
            </HeaderContainer>
            <DataContainer>
                <BoardsTitle>Your Boards</BoardsTitle>
                <AddBoardButton onClick={ () => setDisplayAddBoard(true) }>+ Add another Board</AddBoardButton>
                <DisplayBoards boardData={boardData} />
            </DataContainer>
        </UserContainer>
    );
}

export default UserPage;