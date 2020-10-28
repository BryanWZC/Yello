import React, { useState } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Title from './card-title';
import Items from './card-items';

const Container = styled.div`
    display: flex;
    max-width: 200px;
`;

const Card = (props) => {
    const { 
        handleAddCardClick,
        setTitleText,
        titlePlaceholder,
        cardTitle,
        listTitle,
        } = props;

    return(
        <React.Fragment>
            <Title 
                handleClick={handleAddCardClick} 
                handleChange={setTitleText} 
                display={titlePlaceholder}
                cardTitle={cardTitle}/>
            <Droppable droppableId='test'>
                {provided => 
                    <Container
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        <Items 
                            titlePlaceholder={!titlePlaceholder} // true if display for title placeholder is false
                            listTitle={listTitle}
                            setListTitleText={setListTitleText}
                            handleAddListClick={handleAddListClick}
                            />
                        {provided.placeholder}
                    </Container>
                }
            </Droppable>
        </React.Fragment>
    )
};

export default Card;