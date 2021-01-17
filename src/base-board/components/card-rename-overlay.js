// External modules
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// Internal modules
import * as select from '../selectors/selectors';
import * as util from '../utility/general';
import { toggleRenameOverlay } from '../slices/card-menu-slice';
import { handleCardRename } from '../slices/board-slice';

const RenameContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: absolute;
    background-color: rgba(0,0,0,.64);
    z-index: 100;
`;

const RenameCardContainer = styled.div`
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

const RenameCardForm = styled.form`
    width: 100%;
    height: 100%;
`;

const RenameCardTitle = styled.label`
    width: 100%;
    font-size: 16px;
`;

const RenameCardInput = styled.input`
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

const CardRenameOverlay = (props) => {
    const [title, setTitle] = useState(null);
    const dispatch = useDispatch();
    const cardId = useSelector(select.renameOverlayActive);
    const card = util.getCardFromId(cardId);
    return(
        <RenameContainer onClick={(e) => e.currentTarget === e.target && dispatch(toggleRenameOverlay())}>
            <RenameCardContainer>
                <RenameCardForm action='/board/post/renameCard' method='post'>
                    <RenameCardTitle>Rename Card: {card.title}</RenameCardTitle>
                    <RenameCardInput 
                        type='text'
                        autoComplete='off'
                        name='cardTitle'
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <SubmitRename 
                        type='submit'
                        value='Submit'
                        onClick={(e) => {
                            e.preventDefault();
                            if(cardId && title) {
                                axios
                                    .post('/board/post/renameCard', { cardId: cardId, cardTitle: title })
                                    .then(async(res) => {
                                        const { _id: cardId, title: cardTitle } = res.data;
                                        dispatch(handleCardRename({ cardId, cardTitle }));
                                    });
                            }
                            dispatch(toggleRenameOverlay());
                        }}
                    />
                </RenameCardForm>
            </RenameCardContainer>
        </RenameContainer>
    );
}

export default CardRenameOverlay;