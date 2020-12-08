// External modules
import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

// Internal modules
import * as select2 from '../selectors/selectors';
import { fetchImageJson, IncreasePageByOne, DecreasePageByOne } from '../slices/background-slice';

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 4px;
`;

const ArrowLeftButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: inherit;
    border: none;
    cursor: pointer;
    background: none;
    outline: none;

    &:hover {
        fill: #CED1DA;
    }
`;

const ArrowRightButton = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 32px;
height: inherit;
border: none;
cursor: pointer;
background: none;
outline: none;

&:hover {
    fill: #CED1DA;
}
`;

const ArrowLeft = styled.img`
    width: 12px;
    height: 12px;
    pointer-events: none;
`;

const ArrowRight = styled.img`
    width: 12px;
    height: 12px;
    pointer-events: none;
`;

const PageCount = styled.h3`
    font-size: 12px;
`;

const ArrowIndex = (props) => {
    const dispatch = useDispatch();
    const page = useSelector(select2.backgroundPage);
    const totalPages = ( useSelector(select2.backgroundImageJson) || {} ).total_pages || 1;
    return(
        <Container>
            <ArrowLeftButton
                onClick={() => {
                    if(page > 1) {
                        dispatch(fetchImageJson(page - 1));
                        dispatch(DecreasePageByOne());
                    }
                }}
            >
                <ArrowLeft src='./svg/left-arrow.svg'/>
            </ArrowLeftButton>
            <PageCount>{page}</PageCount>
            <ArrowRightButton
                onClick={() => {
                    if(page < totalPages) {
                        dispatch(fetchImageJson(page + 1));
                        dispatch(IncreasePageByOne());
                    }
                }}
            >
                <ArrowRight src='./svg/right-arrow.svg'/>
            </ArrowRightButton>
        </Container>
    );
}

export { ArrowIndex };