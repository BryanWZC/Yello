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
    const [placeholderDisplay, setDisplay] = useState(true);
    const [text, setText] = useState('');

    // callbacks for AddList
    const handleAddListClick = () => !text ? '' : setDisplay(false);
    const setTitleText = (e) => setText(e.target.value)

    return(
        <React.Fragment>
            <AddList 
                handleClick={handleAddListClick} 
                handleChange={setTitleText} 
                display={placeholderDisplay}
                text={text}/>
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