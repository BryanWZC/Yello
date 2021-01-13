// External modules
import React from 'react';
import styled from 'styled-components';

const OverlayContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: rgba(0,0,0,.64);
    z-index: 100;
`;

const RenameBoardContainer = styled.div`
    position: absolute;
    width: 400px;
    border: none;
    border-radius: 5px;
    padding: 16px;
    background-color: #f4f5f7;
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
    const { handleClick, currentBoard, returnHome } = props;
    return(
        <OverlayContainer onClick={ handleClick }>
            <RenameBoardContainer>
                <RenameBoardForm action='/user/post/renameBoard' method='post'>
                    <RenameBoardTitle>Rename Board: {currentBoard.title}</RenameBoardTitle>
                    <RenameBoardInput 
                        type='text'
                        autoComplete='off'
                        name='boardTitle'
                        required
                    />
                    <input type='hidden' name='boardId' value={currentBoard.id}/>
                    <SubmitRename 
                        type='submit'
                        value='Submit'
                    />
                </RenameBoardForm>
            </RenameBoardContainer>
        </OverlayContainer>
    )
}

export default RenameBoardOverlay;