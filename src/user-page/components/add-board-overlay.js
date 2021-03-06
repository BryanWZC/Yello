// External modules
import React from 'react';
import styled from 'styled-components';

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

const AddBoardContainer = styled.div`
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

const AddBoardForm = styled.form`
    width: 100%;
    height: 100%;
`;

const AddBoardTitle = styled.label`
    width: 100%;
    font-size: 16px;
`;

const AddBoardInput = styled.input`
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

const SubmitBoard = styled.input`
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

const AddBoardOverlay = (props) => {
    const { handleClick } = props;
    return(
        <OverlayContainer onClick={ handleClick }>
            <AddBoardContainer>
                <AddBoardForm action='/user/post/addBoard' method='post'>
                    <AddBoardTitle>New Board Title</AddBoardTitle>
                    <AddBoardInput
                        type='text'
                        autoComplete='off'
                        name='boardTitle'
                        autoFocus
                        required
                    />
                    <SubmitBoard 
                        type='submit'
                        value='Submit'
                    />
                </AddBoardForm>
            </AddBoardContainer>
        </OverlayContainer>
    )
}

export default AddBoardOverlay;