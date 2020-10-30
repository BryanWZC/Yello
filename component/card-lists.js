import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

/**
 * Styled components for AddNewList
 */
const NewContainer = styled.div`
    display: flex;
    height: 20px;
    margin-bottom: 8px;
`;

const NewInput = styled.input`
    height: 100%;
    margin-right: 8px;
`;

const Submit = styled.input`
    height: 100%;
`;

/**
 * Styled components for List
 */
const ListItemContainer = styled.div`
    display: flex;
    width: 100%;
    height: 20px;
    background: white;
    margin-bottom: 8px;
`;

const ItemTitle = styled.h4`
    width: 100%;
    overflow-wrap: break-word;
    border: 1px solid #333333;
`;

const Lists = (props) => {
    const { listObjArr, cardId } = props;

    const existingListItems = listObjArr.map((listItem, index) => <List listItem={listItem} cardId={cardId} index={index} key={listItem._id}/>);

    return(
        <React.Fragment>
            { existingListItems }
        </React.Fragment>
    );
}

const List = (props) => {
    const { listItem, cardId, index } = props;

    return(
        <Draggable draggableId={ listItem._id } index={ index }>
            {(provided, snapshot) => 
                <ListItemContainer 
                    data-cardid={cardId}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={ provided.innerRef }
                >
                    <ItemTitle>{ listItem.title }</ItemTitle>
                </ListItemContainer>
            }
        </Draggable>
    );
}

const AddNewListItem = (props) => {
    const {
        handleAddListClick, setListTitleText, 
        cardId, listTitle,
        listLength
    } = props;

    return(
        <NewContainer>
            <NewInput 
                type='text' 
                name='item-input'
                placeholder={listLength ? '+ Add another item' : '+ Add an item'}
                autoComplete='off'
                value={listTitle}
                onChange={setListTitleText}
                onKeyDown={(e) => e.key === 'Enter' ? handleAddListClick(e) : ''}
                maxLength={60}
                data-card={cardId}
            />
            <Submit 
                type='submit'
                id='submit'
                name='submit'
                value='+ Add item'
                onClick={handleAddListClick}
                data-card={cardId}
            />
        </NewContainer>
    );
}

export { Lists, AddNewListItem };