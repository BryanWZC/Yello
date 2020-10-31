import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

/**
 * Styled components for List
 */
const ListItemContainer = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    background: #ffffff;
    margin-bottom: 8px;
    box-shadow: 0 1px 0 rgba(9,30,66,.25);
`;

const ItemTitle = styled.h4`
    width: 100%;
    border: 1px solid #333333;
    overflow-wrap: break-word;
    padding: 4px;
    border-radius: 5px;
    height: 100%;
`;

/**
 * Styled components for AddNewList
 */
const NewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`;

const NewInput = styled.input`
    height: 25px;
    width: 100%;
    border-radius: 5px;
    margin-bottom: 8px;
    padding-left: 4px;
`;

const Submit = styled.input`
    height: 25px;
    border-radius: 5px;
    border: 0;
    padding: 4px;
    background-color: #5aac44;
    cursor: pointer;
`;

const List = (props) => {
    const { listObjArr, cardId, handleItemClick } = props;

    const existingListItems = listObjArr.map((listItem, index) =>( 
        <Item 
            handleItemClick={handleItemClick}
            listItem={listItem} 
            cardId={cardId} 
            index={index} 
            key={listItem._id}
            />));

    return(
        <React.Fragment>
            { existingListItems }
        </React.Fragment>
    );
}

const Item = (props) => {
    const { listItem, cardId, index, handleItemClick } = props;

    return(
        <Draggable draggableId={listItem._id} index={index}>
            {(provided, snapshot) => 
                <ListItemContainer 
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={ provided.innerRef }
                    onClick={handleItemClick}
                >
                {/*data-cardid={cardId}*/}
                    <ItemTitle 
                        data-cardid={cardId}
                        data-itemid={listItem._id}
                    >
                        { listItem.title }
                    </ItemTitle>
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
                id={cardId}
                placeholder={listLength ? '+ Add another item' : '+ Add an item'}
                autoComplete='off'
                value={listTitle}
                onChange={setListTitleText}
                onKeyDown={(e) => e.key === 'Enter' ? handleAddListClick(e) : ''}
                maxLength={60}
            />
            <Submit 
                type='submit'
                id={cardId}
                name='submit'
                value='+ Add item'
                onClick={handleAddListClick}
            />
        </NewContainer>
    );
}

export { List, AddNewListItem };