// External modules
import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

// Internal modules 
import * as select from '../selectors/selectors';
import { enableImageSearch } from '../../unsplash-image-picker-guest/slices/background-slice';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    margin-bottom: 16px;
    padding: 0 8px;
    background-color: rgba(0,0,0,.32);
`;

const LeftContainer = styled.div`
    display: flex;
`;

const BoardTitle = styled.h3`
    align-text: center;
    color: #fff;
`;

const MiddleContainer = styled.div`

`;

const RightContainer = styled.div`

`;

const Title = styled.h2`
    align-text: center;
    color: #fff;
`;

const BackgroundButton = styled.button`
    border: none;
    cursor: pointer;
    background: none;
    color: #fff;
    outline: none;
    height: 100%;
    padding: 0 4px;

    &:hover {
        color: #CED1DA;
    }
`;

const BackgroundText = styled.h3`
    align-text: center;
    pointer-events: none;
`;

const Heading = (props) => {
    const dispatch = useDispatch();
    const boardTitle = useSelector(select.boardData).title || '';
    
    return(
        <Container>
            <LeftContainer>
                <BoardTitle>Board: {boardTitle}</BoardTitle>
            </LeftContainer>
            <MiddleContainer>
                <Title>Yello</Title>
            </MiddleContainer>
            <RightContainer>
                <BackgroundButton onClick={() => dispatch(enableImageSearch())}>
                    <BackgroundText>Change Background</BackgroundText>
                </BackgroundButton>
            </RightContainer>
        </Container>
    );
}

export { Heading };