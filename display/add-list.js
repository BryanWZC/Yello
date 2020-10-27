import React, { useState } from 'react';
import styled from 'styled-components';

const PlaceholderWrapper = styled.div`
    display: flex;
    width: 100%;
`;

const Placeholder = styled.input`
    height: 100%;
`;

const Submit = styled.input`
    height: 100%;
`;

const Title = styled.h3`
    align-text: center;
`;

const AddList = (props) => {
    const placeholder = <PlaceholderWrapper>
                            <Placeholder 
                                type='text' 
                                id='card-placeholder' 
                                name='card-placeholder'
                                placeholder='+ Add another list'
                                onChange={props.handleChange}></Placeholder>
                            <Submit 
                                type='submit'
                                id='submit'
                                name='submit'
                                value='Add list'
                                onClick={props.handleClick}
                                ></Submit>
                        </PlaceholderWrapper>;

    const title = <Title>{props.text}</Title>;

    return(
        <React.Fragment>
            {props.display ? placeholder : title}
        </React.Fragment>
    );
}

export default AddList;