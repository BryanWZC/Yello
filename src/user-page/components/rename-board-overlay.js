// External modules
import React, { useState } from 'react';
import styled from 'styled-components';

// Internal modules
import { handleSubmitRename } from '../utility/general';

const OverlayContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: absolute;
    background-color: rgba(0,0,0,.64);
    z-index: 100;
`;

const RenameBoardContainer = styled.div`
    position: absolute;
    width: 400px;
    top: 250px;
    border: none;
    border-radius: 5px;
    padding: 16px;
    background-color: #f4f5f7;

    @media (max-width: 530px) {
        width: 290px;
    }
`;

const RenameBoardForm = styled.form`
    width: 100%;
    height: 100%;
`;

const RenameBoardTitle = styled.label`
    width: 100%;
    font-size: 16px;
`;

const RenameBoardInput = styled.input`
    height: 32px;
    margin-top: 16px;
    margin-bottom: 8px;
    border: none;
    border-radius: 4px;
    background-color: #ffffff;
    padding: 4px;
    width: 100%;
    cursor: text;
    overflow-wrap: break-word;
    font-family: 'Open Sans',sans-serif;
    font-size: 13px;

    &:focus {
        outline: none;
    }
`;

const SubmitRename = styled.input`
    margin-bottom: 16px;
    width: 80px;
    height: 25px;
    border: none;
    border-radius: 5px;
    padding: 4px 8px;
    color: #fff;
    background-color: #16C172;
    cursor: pointer;
    outline: none;
    text-align: center;
`;

const RenameBoardOverlay = (props) => {
    const { handleClick, currentBoard, handleUpdateBoards, onSubmitRename } = props;
    const [title, setTitle] = useState(null);
    const boardId = currentBoard.id;
    return(
        <OverlayContainer onClick={ handleClick }>
            <RenameBoardContainer>
                <RenameBoardForm action='/user/post/renameBoard' method='post'>
                    <RenameBoardTitle>Rename Board: {currentBoard.title}</RenameBoardTitle>
                    <RenameBoardInput 
                        type='text'
                        autoComplete='off'
                        name='boardTitle'
                        onChange={ (e) => setTitle(e.target.value) }
                        autoFocus
                        required
                    />
                    <SubmitRename 
                        type='submit'
                        value='Submit'
                        onClick={ async(e) => await handleSubmitRename(e, { handleUpdateBoards, onSubmitRename, boardId, title })}
                    />
                </RenameBoardForm>
            </RenameBoardContainer>
        </OverlayContainer>
    )
}

export default RenameBoardOverlay;