// External modules
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

// internal modules
import * as select from '../selectors/selectors';
import { handleAddList, setListTitle } from '../slices/board-slice';
import { handleItemClick } from '../slices/item-menu-slice';

/**
 * Styled components for List
 */
const ListItemContainer = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    border-radius: 5px;
    margin-bottom: 8px;
    box-shadow: 0 1px 0 rgba(9,30,66,.25);
    background: #ffffff;
`;

const ItemTitle = styled.h4`
    width: 100%;
    overflow-wrap: break-word;
    padding: 4px;
    border-radius: 5px;
    height: 32px;
    pointer-events: none;
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
    height: ${props => props['data-expand'] ? '66px' : '32px'};;
    width: 100%;
    border: none;
    border-radius: 5px;
    margin-bottom: 8px;
    padding-left: 4px;
`;

const Submit = styled.input`
    height: 32px;
    border-radius: 5px;
    border: 0;
    padding: 4px;
    background-color: #5aac44;
    cursor: pointer;
`;

const List = (props) => {
    const { cardId } = props;
    const index = useSelector(select.cardIds).map(card => card._id).indexOf(cardId);
    const card = useSelector(select.cardIds)[index];
    const listIds = card.listIds;

    return(
        <React.Fragment>
            { listIds.map((item, index) =>
                <Item item={item} cardId={cardId} index={index} key={item._id} />
            )}
        </React.Fragment>
    );
}

const Item = (props) => {
    const dispatch = useDispatch();
    const { item, cardId, index } = props;
    const itemId = item._id;

    return(
        <Draggable draggableId={itemId} index={index}>
            {(provided, snapshot) => 
                <ListItemContainer 
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={ provided.innerRef }
                    onClick={(e) => dispatch(handleItemClick(e))}
                    data-cardid={cardId} 
                    data-itemid={itemId}
                >
                    <ItemTitle>
                        {item.title}
                    </ItemTitle>
                </ListItemContainer>
            }
        </Draggable>
    );
}

const AddNewListItem = (props) => {
    const dispatch = useDispatch();
    const { cardId } = props;
    const cardIndex = useSelector(select.cardIds)
        .map(card => card._id)
        .indexOf(cardId);
    const card = useSelector(select.cardIds)[cardIndex];
    const listIds = card.listIds;
    const listLength = listIds.length;
    const listTitle = useSelector(select.listTitle);
    const expandCardInput = useSelector(select.expandCardInput);

    return(
        <NewContainer>
            <NewInput 
                type='text' 
                name='item-input'
                placeholder={listLength ? '+ Add another item' : '+ Add an item'}
                autoComplete='off'
                data-cardid={cardId}
                value={expandCardInput === cardId ? listTitle: ''}
                onChange={(e) => dispatch(setListTitle(e))}
                onKeyDown={(e) => {
                    e.persist();
                    return e.key === 'Enter' ? dispatch(handleAddList({ e, cardId })) : ''
                }
                }
                maxLength={60}
            />
            <Submit 
                type='submit'
                name='submit'
                value='+ Add item'
                onClick={(e) => dispatch(handleAddList({ e, cardId }))}
            />
        </NewContainer>
    );
}

export { List, AddNewListItem };