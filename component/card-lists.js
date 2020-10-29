import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const NewContainer = styled.input`
    height: 100%;
`;

const NewInput = styled.input`
    height: 100%;
`;

const Submit = styled.input`
    height: 100%;
`;

const ExistingContainer = styled.div`
    display: flex;
    max-width: 200px;
`;

const ItemTitle = styled.h4`
    align-text: center;
`;

const Lists = (props) => {
    console.log('lists')
    const {
        handleAddListClick, listTitle,
        setListTitleText, listObjArr,
        cardId, handleInputListOnBlur
    } = props;

    const existingListItems = listObjArr.map(listItem => <List isNewListItem={false} listItem={listItem} cardId={cardId}/>);

    const newListItem =<List 
            newListItem={true}
            handleAddListClick={handleAddListClick}
            handleInputListOnBlur={handleInputListOnBlur}
            setListTitleText={setListTitleText}
            listTitle={listTitle}
        />;

    return(
        <React.Fragment>
            { existingListItems }
            { cardId !== 'newToAddCard' ? newListItem : null }
        </React.Fragment>
    );
}

const List = (props) => {
    const {
        isNewListItem, handleAddListClick,
        setListTitleText, listItem,
        cardId, handleInputListOnBlur
    } = props;
    
    const newListItem = <NewContainer>
                            <NewInput 
                                type='text' 
                                id='item-input' 
                                name='item-input'
                                placeholder='+ Add an item'
                                autoComplete='off'
                                onChange={setListTitleText}
                                onBlur={handleInputListOnBlur}
                            ></NewInput>
                            <Submit 
                                type='submit'
                                id='submit'
                                name='submit'
                                value='Add list'
                                onClick={handleAddListClick}
                                data-cardId={cardId}
                            ></Submit>
                        </NewContainer>;

    const existingListItem = <ExistingContainer data-cardId={cardId}>
                                <ItemTitle>{listItem ? listItem.title : null}</ItemTitle>
                            </ExistingContainer>;

    return(
        <React.Fragment>
            { isNewListItem ? newListItem : existingListItem }
        </React.Fragment>
    );
}

export default Lists;