import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Droppable } from 'react-beautiful-dnd';
import AddTitle from './add-title';

const Container = styled.div`
    display: flex;
    max-width: 200px;
`;

const Card = () => {
    const [placeholderDisplay, setDisplay] = useState(true);
    const [text, setText] = useState('');

    // callbacks for AddList
    const handleAddListClick = () => {
        if(text){
            setDisplay(false);
            axios.post('/card-title', {
                boardId: '5f98ce7c1b3fd7292815e527', // TODO: have a get request that grabs boardid from server.
                cardTitle: text,
            });
        }
    }
    const setTitleText = (e) => setText(e.target.value)

    return(
        <React.Fragment>
            <AddTitle 
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