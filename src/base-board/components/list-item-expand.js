// External modules
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// internal modules
import * as select from '../selectors/selectors';
import * as util from '../utility/general';
import { handleTextareaExpand, handleItemContent, handleItemDelete, overlayOnClick } from '../slices/item-menu-slice';

const Overlay = styled.div`
    display: flex;
    position: absolute;
    align-items: flex-start;
    justify-content: center;
    padding: 48px 0 80px;
    min-width: 100%;
    min-height: 100%;
    background-color: rgba(0,0,0,.64);
`;

const ItemContainer = styled.div`
    position: absolute;
    width: 600px;
    min-height: 250px;
    border: none;
    border-radius: 5px;
    padding: 16px;
    background-color: #f4f5f7;
`;

const Title = styled.h3`
    width: 100%;
    margin-bottom: 8px;
    overflow-wrap: break-word;
    padding-right: 20px;
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
        content: 'Add more details here...';
        color: gray;
    }
`;

const Submit = styled.input`
    margin-bottom: 16px;
    height: 25px;
    border: none;
    border-radius: 5px;
    padding: 4px;
    background-color: #5aac44;
    cursor: pointer;
`;

const Delete = styled.input`
    position: absolute;
    right: 16px;
    bottom: 16px;
    height: 25px;
    border: none;
    border-radius: 5px;
    padding: 4px;
    background-color: red;
    cursor: pointer;
`;

const CloseButton = styled.button`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    width: 25px;
    background-color: transparent;
    top: 16px;
    right: 16px;
    border: none;
    cursor: pointer;
    outline: none;

    &:hover > img {
        opacity: 0.5;
    }
`;

const CloseIcon = styled.img`
    width: 25px;
    height: 25px;
    fill: #333333;
`;

const ListItemExpand = (props) => {
    const dispatch = useDispatch();
    const cardId = useSelector(select.itemMenuCardId);
    const itemId = useSelector(select.itemMenuItemId);
    const card = util.getCardFromId(cardId);
    const item = util.getItemFromId(cardId, itemId) || {};
    const inputExpand = useSelector(select.itemMenuExpandInput);

    return(
        <Overlay
            id='list-item-overlay'
            onClick={(e) => dispatch(overlayOnClick(e))}
        >
            <ItemContainer>
                <Title>{item.title}</Title>
                <Desc>From {card.title}</Desc>
                <ContentContainer
                    id='item-content-input'
                    role='textarea'
                    contentEditable='true'
                    onClick={() => dispatch(handleTextareaExpand())}
                    onBlur={(e) => dispatch(handleItemContent(e))}
                    data-expand={ inputExpand ? true : false }
                >
                    <pre id='item-content-input' onClick={() => dispatch(handleTextareaExpand())}>
                        {item.content}
                    </pre>
                </ContentContainer>
                { inputExpand ? 
                    <Submit
                        type='submit'
                        name='submit'
                        value='Save'
                        onClick={(e) => dispatch(handleItemContent(e))}
                    /> : 
                    null 
                }
                <Delete
                    type='submit'
                    name='delete'
                    value='Delete'
                    onClick={() => dispatch(handleItemDelete())}
                />
                <CloseButton onClick={(e) => dispatch(overlayOnClick(e))}>
                    <CloseIcon src='./svg/close.svg'/>
                </CloseButton>
            </ItemContainer>
        </Overlay>
    );
} 

export { ListItemExpand }