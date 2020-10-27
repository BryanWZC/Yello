import React, { useState } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import AddList from './add-list';
import initialData from './initial-data';

const Container = styled.div`
    display: flex;
    max-width: 200px;
`;

const Card = () => {
    const [boardState, setBoardState] = useState('');

    return(
        <React.Fragment>
            <AddList />
            <Droppable droppableId='test'>
                {provided => 
                    <Container
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                    {provided.placeholder}
                </Container>
                }
            </Droppable>
        </React.Fragment>
    )
};

export default Card;