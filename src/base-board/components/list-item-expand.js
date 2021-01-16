// External modules
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ContentEditable from 'react-contenteditable';

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

const ContentContainer = styled(ContentEditable)`
    width: 100%;
    min-height: ${props => props['data-expand'] ? '104px' : '62px'};
    margin-bottom: ${props => props['data-expand'] ? '8px' : '41px'};;
    border: none;
    background-color: ${props => props['data-expand'] ? '#ffffff': 'rgba(9,30,66,.04)'};
    padding: 4px;
    width: 100%;
    cursor: text;
    overflow-wrap: break-word;
    font-family: 'Open Sans', sans-serif;
    font-size: 13px;

    &:empty::before {
        content: 'Add more details here...';
        color: gray;
    }
`;

const Submit = styled.input`
    margin-bottom: 16px;
    height: 25px;
    border: none;
    border-radius: 5px;
    padding: 4px 8px;
    color: #fff;
    background-color: #16C172;
    cursor: pointer;
    outline: none;
`;

const Delete = styled.input`
    position: absolute;
    right: 16px;
    bottom: 16px;
    height: 25px;
    border: none;
    border-radius: 5px;
    padding: 4px;
    color: #fff;
    background-color: #DD403A;
    cursor: pointer;
    outline: none;
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

    const text = useRef(item.content);

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
                    onClick={() => { 
                        dispatch(handleTextareaExpand());
                    }}
                    html={text.current}
                    onBlur={(e) => dispatch(handleItemContent(text.current))}
                    onChange={(e) => {
                        const val = e.target.value;
                        if(val === '<div><br></div>') text.current = '';
                        else text.current = e.target.value;
                    }}
                    data-expand={ inputExpand ? true : false }
                />
                { inputExpand ? 
                    <Submit
                        type='submit'
                        name='submit'
                        value='Save'
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