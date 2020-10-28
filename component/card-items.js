import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Placeholder = styled.input`
    height: 100%;
`;

const Placeholder = styled.input`
    height: 100%;
`;

const Submit = styled.input`
    height: 100%;
`;

const Items = (props) => {
    const {
        titlePlaceholder,
        listTitle,
        setListTitleText,
        handleAddListClick
        } = props;
    
    const placeholder = <Placeholder>
                            <Placeholder 
                                type='text' 
                                id='item-placeholder' 
                                name='item-placeholder'
                                placeholder='+ Add an item'
                                autoComplete='off'
                                onChange={setListTitleText}
                            ></Placeholder>
                            <Submit 
                                type='submit'
                                id='submit'
                                name='submit'
                                value='Add list'
                                onClick={handleAddListClick}
                            ></Submit>
                        </Placeholder>;

    return(
        <React.Fragment>

        </React.Fragment>
    );
}

export default Items;