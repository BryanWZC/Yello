// React modules
import React, { useEffect } from 'react';

// Redux modules 
import { useDispatch, useSelector } from 'react-redux';
import { getBoardData, onDragEnd } from '../slices/board-slice';
import { cardMenuStateReset } from '../slices/card-menu-slice';

// Other external modules
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

// Internal modules - base-background feature
import * as select from '../selectors/selectors';
import { Heading } from './Heading';
import { Cards, AddNewCard } from './card';
import { ListItemExpand } from './list-item-expand';
import { CardActions } from './card-actions';

// Internal modules - unsplash-image-picker feature
import * as select2 from '../../unsplash-image-picker/selectors/selectors';
import { Background } from '../../unsplash-image-picker/components/background';

// Styles
const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.background});
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

export const Board = () => {
    const dispatch = useDispatch();

    useEffect(() =>{ 
        dispatch(getBoardData('5fac744a04935533f4035e58'));
    }, [dispatch]);

    return(
        <React.Fragment>
            <Container
                onClick={(e) => {
                    e.persist();
                    if(e.currentTarget.getAttribute('id') === 'card-action-menu') return;
                    dispatch(cardMenuStateReset());
                }}
                background={ useSelector(select.background) }
            >
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
            </Container>
        </React.Fragment>
    );
}