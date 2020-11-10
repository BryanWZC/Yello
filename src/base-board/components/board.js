// React modules
import React, { useEffect } from 'react';

// Redux modules 
import { useDispatch, useSelector } from 'react-redux';
import { getBoardData, onDragEnd } from '../slices/board-slice';
import { cardMenuStateReset } from '../slices/card-menu-slice';

// Other external modules
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

// Internal modules
import * as select from '../selectors/selectors';
import { Cards, AddNewCard } from './card';
import { ListItemExpand } from './list-item-expand';
import { CardActions } from './card-actions';

// Styles
const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

const OverflowContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: auto;
`;

export const Board = () => {
    const dispatch = useDispatch();

    useEffect(() =>{ 
        dispatch(getBoardData('5fa8d598d232815edce351c7'));
    }, [dispatch]);

    return(
        <React.Suspense>
            <Container
                onClick={(e) => {
                    e.persist();
                    if(e.currentTarget.getAttribute('id') === 'card-action-menu') return;
                    dispatch(cardMenuStateReset());
                }}
            >
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
            </Container>
        </React.Suspense>
    );
}