import React from 'react';
import styled from 'styled-components';
import { Droppable , Draggable } from 'react-beautiful-dnd';
import { List, AddNewListItem } from './list';

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
    width: 250px;
    min-height: 100px;
    border: 1px solid #333333;
    border-radius: 5px;
    padding: 8px;
    margin: 8px;
    background-color: #f4f5f7;
    box-shadow: 0 1px 0 rgba(9,30,66,.25);
`;

const CardTitle = styled.h3`
    align-text: center;
    height: auto;
    padding-left: 4px;
    padding-bottom: 8px;
    overflow-wrap: break-word;
`;

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
    width: 100%;
    height: 20px;
`;

const Input = styled.input`
    height: 100%;
    padding-left: 4px;
`;

const Submit = styled.input`
    height: 100%;
    border-radius: 5px;
    border: 0;
    padding: 4px;
    background-color: #5aac44;
    cursor: pointer;
`;

const Cards = (props) => {
    const { 
        handleAddListClick, setListTitleText, 
        cardObjArr, handleItemClick 
    } = props;

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
                    {cardObjArr.map((cardObj, index) =>
                        <Card 
                            cardObj={cardObj}
                            handleAddListClick={handleAddListClick}
                            setListTitleText={setListTitleText}
                            handleItemClick={handleItemClick}
                            key={cardObj._id}
                            index={index}
                        />)}
                    {provided.placeholder}
                </CardsContainer>
            }
        </Droppable>
    );
}

const Card = (props) => {
    const { 
        handleAddListClick, setListTitleText, 
        cardObj, listTitle,
        index, handleItemClick
    } = props;
    const id = cardObj._id;
    const listObjArr = cardObj.listIds;

    return(
        <Draggable draggableId={id} index={index}>
            {(provided) => 
                <CardContainer 
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <CardTitle {...provided.dragHandleProps}>
                        {cardObj.title}
                    </CardTitle>
                    <Droppable droppableId={id} type='list'>
                    {(provided, snapshot) => 
                        <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
                                <List listObjArr={ listObjArr } cardId={id} handleItemClick={handleItemClick}/>
                                {provided.placeholder}
                            </ListContainer>
                        }
                        </Droppable>
                        <AddNewListItem 
                        handleAddListClick={handleAddListClick}
                        setListTitleText={setListTitleText}
                        cardId={id}
                        listTitle={listTitle}
                        listLength={listObjArr.length}
                    />
                </CardContainer>
            }
            </Draggable>
            )
};

const AddNewCard = (props) => {
    const { handleAddCardClick, setTitleText, length , cardTitle} = props;

    return(
        <AddCardContainer>
            <Input 
                type='text' 
                id='card-input' 
                name='card-placeholder'
                placeholder={ length > 0 ? '+ Add another card' : '+ Add a card'}
                autoComplete='off'
                value={cardTitle}
                onChange={setTitleText}
                onKeyDown={(e) => e.key === 'Enter' ? handleAddCardClick() : ''}
                maxLength={60}
            />
            <Submit 
                type='submit'
                name='submit'
                value='Add Card'
                onClick={handleAddCardClick}
                />
        </AddCardContainer>
    );
}

export { Cards, AddNewCard };