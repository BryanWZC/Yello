import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { Lists, AddNewListItem } from './card-lists';

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
        <React.Fragment>
            { cardObjArr.map(cardObj =>
                <Card 
                    cardObj={cardObj}
                    handleAddListClick={handleAddListClick}
                    setListTitleText={setListTitleText}
                    key={cardObj._id}
                />
            )}
        </React.Fragment>
    );
}

const Card = (props) => {
    const { 
        handleAddListClick, setListTitleText, 
        cardObj, listTitle
    } = props;
    const id = cardObj._id;
    const listObjArr = cardObj.listIds;

    return(
        <CardContainer>
            <CardTitle>{cardObj.title}</CardTitle>
            <Droppable droppableId={id}>
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