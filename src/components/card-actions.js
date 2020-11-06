import React from 'react';
import styled from 'styled-components';

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
`;

const Delete = styled.button`
    width: 100%;
    cursor: pointer;
`;

const CardActions = (props) => {
    const { offsets, handleCardDelete, setOffsetsCardOnBlur } = props;
    return(
        <Container 
            id='card-action-menu'
            offsets={offsets}
        >
            <Title>Card actions</Title>
            <Delete 
                id='card-action-menu'
                onClick={handleCardDelete}
            >
                Delete
            </Delete>
        </Container>
    );
}

export { CardActions }