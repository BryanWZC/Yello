import React from 'react';
import styled from 'styled-components';
import { Droppable , Draggable } from 'react-beautiful-dnd';
import { Lists, AddNewListItem } from './card-lists';

/**
 * Styles for cards
 */
const CardsContainer = styled.div`
    display: flex;
`;

/**
 * Styles for Card
 */
const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 250px;
    border: 1px solid #333333;
    border-radius: 10px;
    padding: 8px;
    margin: 8px;
    background-color: white;
`;

const CardTitle = styled.h3`
    align-text: center;
    margin-bottom: 8px;
    overflow-wrap: break-word;
`;

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid #333333;
    margin-bottom: 8px;
`;

/**
 * Styles for AddNewCard
 */
const PlaceholderWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 20px;
`;

const Placeholder = styled.input`
    height: 100%;
`;

const Submit = styled.input`
    height: 100%;
`;

const Cards = (props) => {
    const { handleAddListClick, setListTitleText, cardObjArr } = props;

    return(
        <Droppable
            droppableId='all-cards'
            direction='horizontal'
            type='column'
        >
            {(provided, index) => 
                <CardsContainer
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {cardObjArr.map((cardObj, index) =>
                        <Card 
                            cardObj={cardObj}
                            handleAddListClick={handleAddListClick}
                            setListTitleText={setListTitleText}
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
        index
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
                                <Lists listObjArr={ listObjArr } cardId={id}/>
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
        <PlaceholderWrapper>
            <Placeholder 
                type='text' 
                id='card-placeholder' 
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
                id='submit'
                name='submit'
                value='Add Card'
                onClick={handleAddCardClick}
                />
        </PlaceholderWrapper>
    );
}

export { Cards, AddNewCard };