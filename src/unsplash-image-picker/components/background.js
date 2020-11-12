// External modules
import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

// Internal modules - selectors
import * as select2 from '../selectors/selectors';

// Internal modules - slices
import { disableImageSearch } from '../slices/background-slice';

// Internal modules - components
import { Images } from './images';
import { Search } from './search';
import { ArrowIndex } from './arrow-index.js';

const ItemContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 210px;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    border: none;
    border-radius: 5px;
    padding: 8px;
    background-color: #f4f5f7;
    box-shadow: 0 8px 16px -4px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);

    &:focus {
        outline: none;
    }
`;

const Title = styled.h3`
    width: 100%;
    margin-bottom: 8px;
    overflow-wrap: break-word;
`;

const CloseButton = styled.button`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    width: 25px;
    background-color: transparent;
    right: 8px;
    border: none;
    cursor: pointer;
    outline: none;

    &:hover > img {
        opacity: 0.5;
    }
`;

const CloseIcon = styled.img`
    width: 25px;
    height: 25px;
    fill: #333333;
`;

const Background = (props) => {
    const dispatch = useDispatch();
    const selectionImageLoaded = useSelector(select2.backgroundSelectionImageLoaded);
    return(
        <ItemContainer>
            <Title>Photos by Unsplash</Title>
            <Search />
            <Images />
            { selectionImageLoaded ? <ArrowIndex /> : null }
            <CloseButton 
                onClick={() => dispatch(disableImageSearch())}
            >
                <CloseIcon src='./svg/close.svg'/>
            </CloseButton>
        </ItemContainer>
    );
}

export { Background };