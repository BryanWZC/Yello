import React, { useState } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
    display: flex;
    position: absolute;
    align-items: flex-start;
    justify-content: center;
    padding: 48px 0 80px;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.64);
`;

const ItemContainer = styled.div`
    padding: 16px;
    border: 1px solid red;
    border-radius: 5px;
    width: 600px;
    background-color: #f4f5f7;
`;

const Title = styled.h3`
    overflow-wrap: break-word;
    width: 100%;
    margin-bottom: 24px;
`;

const ContentWrapper = styled.div`
    width: 100%;
    min-height: 104px;
    border: 1px solid red;
    padding: 4px;
    width: 100%;
    cursor: text;
    overflow-wrap: break-word;
`;

const ListItemExpand = (props) => {
    const { itemData: item, handleItemData, overlayOnClick } = props;
    const content = item.content;
    return(
        <Overlay
            data-return={true}
            onClick={overlayOnClick}
        >
            <ItemContainer>
                <Title>{item.title}</Title>
                <ContentWrapper
                    contentEditable='true'
                    role='textarea'
                    onBlur={handleItemData}
                >
                    {content}
                </ContentWrapper>
            </ItemContainer>
        </Overlay>
    );
} 

export { ListItemExpand }