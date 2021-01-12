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
    z-index: 3;

    &:hover {
        background-color: rgba(255, 255, 255, 0.35);
    }
`;

const Dots = styled.img``;

const ActionMenu = (props) => {
    const [hover, setHover] = useState(false);

    return(
        <ActionMenuContainer onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {hover ? 
                <Dots src={threeDotsYellow} alt="ellipsis"/> :
                <Dots src={threeDots} alt="ellipsis"/>}
        </ActionMenuContainer>
    );
}

export default ActionMenu;