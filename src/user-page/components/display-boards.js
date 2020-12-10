// External modules
import React from 'react';
import styled from 'styled-components';

const BoardsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const BoardContainer = styled.div`
    width: 200px;
    height: 100px;
    background-color: blue;
`;

const DisplayBoards = (props) => {
    const { boardData } = props;
    return(
        <BoardsContainer>
            { boardData.map(board =>  <DisplaySingleBoard board={board}/> ) }
        </BoardsContainer>
    )
}

const DisplaySingleBoard = (props) => {
    const { board } = props;
    return(
        <BoardContainer>
            {/*TODO: Figure out what board object contains before populating this area*/}
        </BoardContainer>
    )
}

export default DisplayBoards;