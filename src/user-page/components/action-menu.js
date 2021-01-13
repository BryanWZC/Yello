// External modules
import React, { useState } from 'react';
import styled from 'styled-components';

// Internal modules
import threeDots from '../../../assets/svg/ellipsis-white.svg';
import threeDotsYellow from '../../../assets/svg/ellipsis-yellow.svg';

const ActionMenuContainer = styled.div`
    width: 24px;
    height: 24px;
    top: 8px;
    right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border-radius: 50%;
    z-index: 5;

    &:hover {
        background-color: ${props => props.active ? 'inherit' : 'rgba(255, 255, 255, 0.35)'};
    }
`;

const Dots = styled.img``;

const Menu = styled.div`
    position: absolute;
    width: 160px;
    height: 100px;
    left: 0px;
    top: 24px;
    display: ${props => props.active.id === props.id ? 'flex' : 'none'};
    flex-direction: column;
    border: none;
    border-radius: 5px;
    padding: 8px;
    background-color: #ffffff;
    box-shadow: 0 8px 16px -4px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);
    z-index: 6;

    &:focus {
        outline: none;
    }
`;

const Title = styled.p`
    text-align: center;
    width: 100%;
    padding-bottom: 4px;
    border-bottom: 1px solid rgba(9,30,66,.13);
    pointer-events: none;
    font-weight: bold;
`;

const Action = styled.button`
    width: 100%;
    cursor: pointer;
    border: none;
    background-color: transparent;
    padding: 4px 0;
    outline: none;

    &:hover {
        background: rgba(0,0,0,.04);
    }
`;

const ActionMenu = (props) => {
    const { handleSetActive, menuActive, id, title, openRenameOverlay, handleDelete } = props;
    const [hover, setHover] = useState(false);

    return(
        <ActionMenuContainer 
            onMouseOver={() => setHover(true)} 
            onMouseLeave={() => setHover(false)}
            active={menuActive}
        >
            { 
                hover && !menuActive ? 
                <Dots src={threeDotsYellow} 
                    alt="ellipsis"
                    onClick={handleSetActive}
                    data-id={id}
                    data-title={title}
                    active={menuActive}
                /> :
                <Dots src={threeDots} alt="ellipsis"/> 
            }
            <Menu 
                active={menuActive}
                id={id}
            >
                <Title>Board Actions</Title>
                <Action onClick={openRenameOverlay}>Rename</Action>
                <Action onClick={handleDelete}>Delete</Action>
            </Menu>
        </ActionMenuContainer>
    );
}

export default ActionMenu;