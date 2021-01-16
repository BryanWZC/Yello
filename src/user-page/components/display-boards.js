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
    cursor: ${props => props.active ? 'auto' : 'pointer'};

    &:hover {
        width: ${props => props.active ? '200px' : '220px'};
        height: ${props => props.active ? '100px' : '110px'};
        margin: ${props => props.active ? '0 50px 50px 0' : '-5px 40px 40px -10px;'};
    }

    @media (min-width: 850px) {
        &:nth-child(3n + 3) {
            margin-right: 0;
        }
    }

    @media (max-width: 850px) {
        &:nth-child(2n + 2) {
            margin-right: 0;
        }
    }

    @media (max-width: 530px) {
        margin-right: 0;

        &:hover {
            margin: ${props => props.active ? '0 0 50px 0' : '-5px 0 45px -10px;'};
        }
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
    pointer-events: none;
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
    const { boardData, handleSetActive, menuActive, openRenameOverlay, handleDelete } = props;
    return(
        <BoardsContainer>
            { boardData.map(board =>  <DisplaySingleBoard 
                openRenameOverlay={openRenameOverlay} 
                board={board} 
                key={board._id} 
                handleSetActive={handleSetActive} 
                menuActive={menuActive}
                handleDelete={handleDelete}
            /> ) }
        </BoardsContainer>
    )
}

const DisplaySingleBoard = (props) => {
    const { handleSetActive, menuActive, openRenameOverlay, handleDelete } = props;
    const [loadedBackground, setLoadedBackground] = useState(false);
    const styleDisplay = !loadedBackground ? { display: 'none' } : {}
    const { _id, title, thumb, blurHash } = props.board;
    return(
        <BoardContainer
            active={menuActive}
        >
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
            <ActionMenu 
                id={_id} 
                title={title} 
                handleSetActive={handleSetActive} 
                menuActive={menuActive} 
                openRenameOverlay={openRenameOverlay}
                handleDelete={handleDelete}
            />
        </BoardContainer>
    )
}

export default DisplayBoards;