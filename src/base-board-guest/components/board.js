// React modules
import React, { useEffect } from 'react';

// Redux modules 
import { useDispatch, useSelector } from 'react-redux';
import { getBoardData, onDragEnd } from '../slices/board-slice';
import { cardMenuStateReset } from '../slices/card-menu-slice';

// Other external modules
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

// Internal modules - slices
import { closeCardInput } from '../slices/board-slice';

// Internal modules - base-background feature
import * as select from '../selectors/selectors';
import { Heading } from './heading';
import { Cards, AddNewCard } from './card';
import { ListItemExpand } from './list-item-expand';
import { CardActions } from './card-actions';
import BackgroundImage from './background-image';

// Internal modules - unsplash-image-picker feature
import * as select2 from '../../unsplash-image-picker-guest/selectors/selectors';
import { Background } from '../../unsplash-image-picker-guest/components/background';

// Styles
const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(${props => props.background}) no-repeat center center fixed;
    background-size: cover;
`;

const OverflowContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(100% - 50px);
    overflow: auto;
    top: 50px;
`;

const BlurHashCanvas = styled.canvas`
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
`;

export const Board = () => {
    const dispatch = useDispatch();
    
    useEffect(() =>{
        dispatch(getBoardData());
    }, [dispatch]);

    return(
        <React.Fragment>
            <Container
                onClick={(e) => {
                    e.persist();
                    const id = e.target.getAttribute('id');
                    if(id !== 'add-card-input') dispatch(closeCardInput());
                    if(id !== 'card-action-menu') dispatch(cardMenuStateReset());
                }}
            >
                <BackgroundImage />
                <Heading />
                <OverflowContainer>
                    <DragDropContext onDragEnd={(res) => dispatch(onDragEnd(res))}>
                        <Cards />
                    </DragDropContext>
                    <div>
                        { useSelector(select.renderAddCard) ? <AddNewCard /> : null }
                    </div>
                    { useSelector(select.displayCardMenu) ? <CardActions /> : null }
                </OverflowContainer>
                { useSelector(select.displayItemMenu) ? <ListItemExpand /> : null }
                { useSelector(select2.backgroundDisplayImageSearch) ? <Background /> : null }
                <BlurHashCanvas id='blurHash'></BlurHashCanvas>
            </Container>
        </React.Fragment>
    );
}