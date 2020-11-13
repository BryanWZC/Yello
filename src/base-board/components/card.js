// External modules
import React, { useState } from 'react';
import styled from 'styled-components';
import { Droppable , Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';

// Internal modules - components
import { List, AddNewListItem } from './list';

// Other internal modules
import * as select from '../selectors/selectors';
import { handleAddCard, setCardTitle, setExpandCardInput } from '../slices/board-slice';
import { setOffsetsCard } from '../slices/card-menu-slice';

/**
 * Styles for cards
 */
const CardsContainer = styled.div`
    display: flex;
    align-items: flex-start;
    align-self: flex-start;
`;

/**
 * Styles for Card
 */
const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 270px;
    min-height: 110px;
    border: none;
    border-radius: 5px;
    padding: 8px;
    margin: 8px;
    background-color: #f4f5f7;
    box-shadow: 0 1px 0 rgba(9,30,66,.25);
`;

/**
 * Styles for title section 
 */
const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: auto;
    margin-bottom: 8px;
    border: none;
    cursor: pointer;
`;

const CardTitle = styled.h3`
    align-text: center;
    height: auto;
    padding-left: 4px;
    overflow-wrap: anywhere;
    cursor: pointer;
`;

const ActionButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 32px;
    min-height: 32px;
    border: none;
    cursor: pointer;
    background: none;
    outline: none;

    &:hover {
        background: #CED1DA;
    }
`;

const ThreeDots = styled.img`
    width: 12px;
    height: 12px;
    pointer-events: none;
`;

/**
 * Styles for list container
 */
const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-grow: 1;
`;

/**
 * Styles for AddNewCard
 */
const AddCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 270px;
    height: auto;
    border: none;
    border-radius: 5px;
    padding: 8px;
    margin: 8px 8px 0 8px;
    background-color: #f4f5f7;
    box-shadow: 0 1px 0 rgba(9,30,66,.25);
`;

const Input = styled.input`
    height: 32px;
    width: 100%;
    border: none;
    border-radius: 5px;
    margin-bottom: 8px;
    padding-left: 4px;
    outline: none;
    background-color: ${ props => props['data-expand'] ? '#ffffff': 'rgba(0,0,0,.04)' };
    color: #42526e ;
    font-family: 'Open Sans', sans-serif;
    font-size: 13px;
`;

const Submit = styled.input`
    height: 32px;
    width: 64px;
    border-radius: 5px;
    border: none;
    padding: 4px;
    outline: none;
    background-color: #16C172;
    color: #ffffff;
    cursor: pointer;
`;

const Cards = (props) => {
    const boardData = useSelector(select.boardData) || {};
    const cardIds = Object.keys(boardData).length ? boardData.cardIds : [];
    
    return(
        <Droppable
            droppableId='all-cards'
            direction='horizontal'
            type='card'
        >
            {(provided, snapshot) => 
                <CardsContainer
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {cardIds.map((card, index) =>
                        <Card card={card} index={index} key={card._id}/>)
                    }
                    {provided.placeholder}
                </CardsContainer>
            }
        </Droppable>
    );
}

const Card = (props) => {
    const dispatch = useDispatch();
    const { card, index } = props;
    const id = card._id;

    return(
        <Draggable draggableId={id} index={index}>
            {(provided) => 
                <CardContainer 
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <TitleContainer
                        {...provided.dragHandleProps}
                    >
                        <CardTitle>
                            {card.title}
                        </CardTitle>
                        <ActionButton data-cardid={id} onClick={(e) => dispatch(setOffsetsCard(e))}>
                            <ThreeDots src='./svg/ellipsis.svg'/>
                        </ActionButton>
                    </TitleContainer>
                    <Droppable droppableId={id} type='list'>
                        {(provided, snapshot) => 
                            <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
                                <List cardId={id} />
                                {provided.placeholder}
                            </ListContainer>
                            }
                    </Droppable>
                    <AddNewListItem cardId={id} />
                </CardContainer>
            }
            </Draggable>
            )
};

const AddNewCard = (props) => {
    const dispatch = useDispatch();
    const boardData = useSelector(select.boardData);
    const expandCardInput = useSelector(select.expandCardInput);
    const length = boardData.cardIds.length;

    return(
        <AddCardContainer id='add-card-input'>
            <Input 
                type='text' 
                id='add-card-input' 
                name='card-placeholder'
                placeholder={ length > 0 ? '+ Add another card' : '+ Add a card'}
                data-expand={ expandCardInput }
                autoComplete='off'
                value={useSelector(select.cardTitle)}
                onChange={(e) => dispatch(setCardTitle(e))}
                onClick={(e) => dispatch(setExpandCardInput())}
                onKeyDown={(e) => {
                    e.persist();
                    return e.key === 'Enter' ? dispatch(handleAddCard(e)) : ''}
                }
                maxLength={60}
            />
            { expandCardInput ? 
                <Submit 
                    type='submit'
                    name='submit'
                    value='Add Card'
                    onClick={(e) => dispatch(handleAddCard(e))}
                /> : 
                null
            }
        </AddCardContainer>
    );
}

export { Cards, AddNewCard };