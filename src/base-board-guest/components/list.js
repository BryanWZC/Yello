// External modules
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

// internal modules
import * as select from '../selectors/selectors';
import { handleAddList, setListTitle, setExpandListInput, closeListInput } from '../slices/board-slice';
import { handleItemClick } from '../slices/item-menu-slice';

/**
 * Styled components for List
 */
const ListItemContainer = styled.div`
    width: 100%;
    height: auto;
    border-radius: 5px;
    margin-bottom: 8px;
    box-shadow: 0 1px 0 rgba(9,30,66,.25);
    background: #ffffff;
`;

const ItemTitle = styled.p`
    display: flex;
    align-items: center;
    width: 100%;
    overflow-wrap: break-word;
    padding: 4px;
    border-radius: 5px;
    min-height: 32px;
    pointer-events: none;
    font-family: 'Open Sans', sans-serif;
    font-size: 13px;
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

const NewInput = styled.textarea`
    height: ${props => props['data-expand'] ? '66px' : '32px'};
    width: 100%;
    border: none;
    border-radius: 5px;
    margin-bottom: 8px;
    padding-left: 4px;
    resize: none;
    padding-top: 7px;
    outline: none;
    overflow: none;
    background-color: ${ props => props['data-expand'] ? '#ffffff': 'rgba(0,0,0,.04)' };
    font-family: 'Open Sans', sans-serif;
    font-size: 13px;
`;

const Submit = styled.input`
    height: 32px;
    border-radius: 5px;
    border: none;
    padding: 4px;
    outline: none;
    color: #fff;
    background-color: #16C172;
    cursor: pointer;
`;

const List = (props) => {
    const { cardId } = props;
    const index = useSelector(select.cardIds).map(card => card._id).indexOf(cardId);
    const card = useSelector(select.cardIds)[index];
    const listIds = card.listIds || [];

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
    const expandListInput = useSelector(select.expandListInput);

    return(
        <NewContainer>
            <NewInput 
                type='text' 
                name='item-input'
                placeholder={listLength ? '+ Add another item' : '+ Add an item'}
                autoComplete='off'
                data-cardid={cardId}
                data-expand={ expandListInput === cardId ? true : false }
                value={ expandListInput === cardId ? listTitle: '' }
                onChange={(e) => dispatch(setListTitle(e))}
                onClick={(e) => dispatch(setExpandListInput(e))}
                onBlur={(e) => {
                    e.persist();
                    dispatch(handleAddList({ e, cardId }));
                    dispatch(closeListInput());
                }}
                onKeyDown={(e) => {
                    e.persist();
                    if(e.key === 'Enter') {
                        dispatch(handleAddList({ e, cardId }));
                    }
                }
                }
                maxLength={120}
            />
            { expandListInput === cardId ? 
                <Submit 
                    type='submit'
                    name='submit'
                    value='Add item'
                    onClick={(e) => {
                        dispatch(handleAddList({ e, cardId }));
                        dispatch(closeListInput());
                    }}
                /> :
                null
            }
        </NewContainer>
    );
}

export { List, AddNewListItem };