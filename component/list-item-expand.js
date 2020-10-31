import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Overlay = styled.div`
    display: flex;
    position: absolute;
    align-items: flex-start;
    justify-content: center;
    padding: 48px 0 80px;
    width: 100%;
    min-height: 100%;
    background-color: rgba(0,0,0,.64);
`;

const ItemContainer = styled.div`
    position: relative;
    width: 600px;
    min-height: 250px;
    border: 1px solid red;
    border-radius: 5px;
    padding: 16px;
    background-color: #f4f5f7;
`;

const Title = styled.h3`
    width: 100%;
    margin-bottom: 8px;
    overflow-wrap: break-word;
    `;
    
    const Desc = styled.p`
    width: 100%;
    margin-bottom: 24px;
    overflow-wrap: break-word;
`;

const ContentContainer = styled.div`
    width: 100%;
    min-height: ${props => props['data-expand'] ? '104px' : '62px'};
    margin-bottom: ${props => props['data-expand'] ? '8px' : '41px'};;
    border: ${props => props['data-expand'] ? '1px solid red' : 'none'};
    background-color: ${props => props['data-expand'] ? '#ffffff': 'rgba(9,30,66,.04)'};
    padding: 4px;
    width: 100%;
    cursor: text;
    overflow-wrap: break-word;

    & > pre:empty::before {
        content: "Add more details here...";
        color: gray;
    }
`;

const Submit = styled.input`
    margin-bottom: 16px;
    height: 25px;
    border-radius: 5px;
    border: 0;
    padding: 4px;
    background-color: #5aac44;
    cursor: pointer;
`;

const Delete = styled.input`
    position: absolute;
    right: 16px;
    bottom: 16px;
    height: 25px;
    border-radius: 5px;
    border: 0;
    padding: 4px;
    background-color: red;
    cursor: pointer;
`;

const ListItemExpand = (props) => {
    const { 
        itemData: item, cardArray,
        handleItemData, overlayOnClick, 
        handleTextareaExpand, inputExpand, 
        handleItemDelete
    } = props;
    const content = item.content;
    const cardTitle = cardArray.reduce((acc, card) => card._id ? card.title : acc, '');
    return(
        <Overlay
            data-return={true}
            onClick={overlayOnClick}
        >
            <ItemContainer>
                <Title>{item.title}</Title>
                <Desc>From {cardTitle}</Desc>
                <ContentContainer
                    id='item-content-input'
                    role='textarea'
                    contentEditable='true'
                    onClick={handleTextareaExpand}
                    onBlur={handleItemData}
                    data-expand={inputExpand === 'item-content-input' ? true : false }
                >
                    <pre 
                        id='item-content-input'
                        onClick={handleTextareaExpand}
                    >
                        {content}
                    </pre>
                </ContentContainer>
                { inputExpand ? 
                    <Submit
                        type='submit'
                        name='submit'
                        value='Save'
                        onClick={handleItemData}
                    /> : 
                    null 
                }
                <Delete
                    type='submit'
                    name='delete'
                    value='Delete'
                    onClick={handleItemDelete}
                />
            </ItemContainer>
        </Overlay>
    );
} 

export { ListItemExpand }