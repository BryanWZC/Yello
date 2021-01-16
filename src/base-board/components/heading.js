// External modules
import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

// Internal modules 
import * as select from '../selectors/selectors';
import { enableImageSearch } from '../../unsplash-image-picker/slices/background-slice';
import { returnHome } from '../utility/general';

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
    width: 30%;
    display: flex;
    justify-content: flex-start;
    white-space: nowrap;
`;

const BoardTitle = styled.h3`
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    
    @media (max-width: 850px) {
        font-size: 16px;
    }

    @media (max-width: 530px) {
        font-size: 14px;
    }

`;

const MiddleContainer = styled.div`
    width: 30%;
    display: flex;
    justify-content: center;
`;

const RightContainer = styled.div`
    width: 30%;
    display: flex;
    justify-content: flex-end;
`;

const Title = styled.h2`
    align-text: center;
    color: #fff;
    cursor: pointer;

    &:hover {
        color: #CED1DA;
    }
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

    @media (max-width: 850px) {
        font-size: 16px;
    }

    @media (max-width: 530px) {
        font-size: 12px;
    }

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
                <Title onClick={returnHome}>Yello</Title>
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