// External modules
import React from 'react';
import styled from 'styled-components';

const UserContainer = styled.div`
    width: 100%;
    min-height: 100%;
    position: absolute;
    display: flex;
`;

const UserPage = (props) => {
    return(
        <UserContainer>
            <p>Hello world!</p>
        </UserContainer>
    );
}

export default UserPage;