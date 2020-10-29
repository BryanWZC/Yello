import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Title from './card-title';
import Lists from './card-lists';

const Cards = (props) => {
    const { 
        handleAddCardClick, handleAddListClick,
        handleInputListOnBlur, setListTitleText,
        setTitleText, titlePlaceholder,
        cardTitle, listTitle,
        cardObjArr
        } = props;
    
    const existingCards = cardObjArr.map(cardObj =>{
        return <Card 
            handleAddCardClick={handleAddCardClick}
            handleAddListClick={handleAddListClick}
            setListTitleText={setListTitleText}
            setTitleText={setTitleText}
            titlePlaceholder={false}
            cardTitle={cardObj.title}
            listTitle={listTitle}
            cardObj={cardObj}
        />
    });

    const newCard = <Card 
        handleAddCardClick={handleAddCardClick}
        handleAddListClick={handleAddListClick}
        handleInputListOnBlur={handleInputListOnBlur}
        setTitleText={setTitleText}
        titlePlaceholder={titlePlaceholder}
        cardTitle={cardTitle}
        listTitle={listTitle}
    />;

    return(
        <React.Fragment>
            { existingCards }
            { newCard }
        </React.Fragment>
    );
}

const Card = (props) => {
    const { 
        handleAddCardClick, handleAddListClick,
        handleInputListOnBlur, setTitleText,
        setListTitleText, titlePlaceholder,
        cardTitle, listTitle, 
        cardObj,
        } = props;

    const id = cardObj ? cardObj._id: 'newToAddCard';
    const listObjArr = cardObj ? cardObj.listObjArr : [];
    const cardObjLength = cardObj ? cardObj.length : 0;

    /**
     * Styles
     */
    const Container = styled.div`
        display: flex;
        max-width: 200px;
    `;

    return(
        <React.Fragment>
            <Title 
                handleClick={handleAddCardClick} 
                handleChange={setTitleText} 
                display={titlePlaceholder}
                cardTitle={cardTitle}
                cardObjLength={cardObjLength}
            />
            <Droppable droppableId={id}>
                {provided => 
                    <Container
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        <Lists 
                            handleAddListClick={handleAddListClick}
                            handleInputListOnBlur={handleInputListOnBlur}
                            listTitle={listTitle}
                            setListTitleText={setListTitleText}
                            listObjArr={listObjArr}
                            cardId={id}
                        />
                        {provided.placeholder}
                    </Container>
                }
            </Droppable>
        </React.Fragment>
    )
};

export default Cards;