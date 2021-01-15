// External modules
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

// Other internal modules
import * as select from '../selectors/selectors';
import { handleCardDelete, toggleRenameOverlay } from '../slices/card-menu-slice';

const Container = styled.div`
    position: absolute;
    width: 160px;
    height: 200px;
    left: ${props => props.offsets.left}px;
    top: ${props => props.offsets.top}px;
    display: flex;
    flex-direction: column;
    border: none;
    border-radius: 5px;
    padding: 8px;
    background-color: #ffffff;
    box-shadow: 0 8px 16px -4px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);

    &:focus {
        outline: none;
    }
`;

const Title = styled.p`
    text-align: center;
    width: 100%;
    padding-bottom: 4px;
    border-bottom: 1px solid rgba(9,30,66,.13);
    pointer-events: none;
    font-weight: bold;
`;

const Option = styled.button`
    width: 100%;
    cursor: pointer;
    border: none;
    background-color: transparent;
    padding: 4px 0;
    outline: none;

    &:hover {
        background: rgba(0,0,0,.04);
    }
`;

const CardActions = (props) => {
    const dispatch = useDispatch();
    const offsets = useSelector(select.CardMenuOffsets);

    return(
        <Container id='card-action-menu' offsets={offsets}>
            <Title>Card actions</Title>
            <Option onClick={() => dispatch(toggleRenameOverlay())}>
                Rename
            </Option>
            <Option id='card-action-menu' onClick={() => dispatch(handleCardDelete())}>
                Delete
            </Option>
        </Container>
    );
}

export { CardActions }