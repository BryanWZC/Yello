// External modules
import React, { useState } from 'react';
import styled from 'styled-components';
import { Blurhash } from 'react-blurhash';

// Internal modules
import { sortRecentBoard } from '../utility/sort-recent-board';
import ActionMenu from './action-menu';

const BoardsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

const BoardContainer = styled.div`
    width: 200px;
    height: 100px;
    position: relative;
    display: flex;
    margin-right: 50px;
    margin-bottom: 50px;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        width: 220px;
        height: 110px;
        margin: -5px 40px 40px -10px;
    }

    &:nth-child(3n + 3) {
        margin-right: 0;
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
    pointer-event: none;
`;

const Overlay = styled.div`
    position: absolute;
    border-radius: 8px;
    z-index: 1;
    background-color: rgba(0,0,0,0.3);
    width: 100%;
    height: 100%;
    pointer-events: none;
`;

const Title = styled.h1`
    width: 168px;
    position: absolute;
    z-index: 2;
    color: #fff;
    font-size: 16px;
    pointer-events: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
`;

const Clickable = styled.div`
    position: absolute;
    border-radius: 8px;
    z-index: 3;
    width: 100%;
    height: 100%;
`;

const DisplayBoards = (props) => {
    const { boardData } = props;
    console.log(boardData)
    return(
        <BoardsContainer>
            { boardData.map(board =>  <DisplaySingleBoard board={board} key={board._id}/> ) }
        </BoardsContainer>
    )
}

const DisplaySingleBoard = (props) => {
    const [loadedBackground, setLoadedBackground] = useState(false);
    const styleDisplay = !loadedBackground ? { display: 'none' } : {}
    const { _id, title, thumb, blurHash } = props.board;
    return(
        <BoardContainer>
            {!loadedBackground && 
                blurHash &&
                <Blurhash
                    hash={blurHash}
                    width={'100%'}
                    height={'100%'}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                />
            }
            <Overlay/>
            <Image style={styleDisplay} src={thumb} onLoad={() => setLoadedBackground(true)}/>
            <Title>{title}</Title>
            <Clickable onClick={async () => {
                await sortRecentBoard(_id);
                window.location.href = `/board/${_id}`;
            }}/>
            <ActionMenu />
        </BoardContainer>
    )
}

export default DisplayBoards;