// External modules
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

// Internal modules 
import { enableImageSearch } from '../../unsplash-image-picker/slices/background-slice'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    margin-bottom: 16px;
    padding: 0 8px;
`;

const Title = styled.h3`
    align-text: center;
`;

const BackgroundButton = styled.button`
    border: none;
    cursor: pointer;
    background: none;

    &:focus {
        outline: none;
    }
    &:hover {
        color: #CED1DA;
    }
`;

const BackgroundText = styled.h3`
    pointer-events: none;
`;

const Heading = (props) => {
    const dispatch = useDispatch();
    return(
        <Container>
            <Title>Yello</Title>
            <BackgroundButton onClick={() => dispatch(enableImageSearch())}>
                <BackgroundText>Change Background</BackgroundText>
            </BackgroundButton>
        </Container>
    );
}

export { Heading };