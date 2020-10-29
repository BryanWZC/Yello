import React from 'react';
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

const CardTitle = styled.h3`
    align-text: center;
`;

/**
 * Adds a title for each card. Will not add title if no input is given when submit button is pressed.
 */
const Title = (props) => {
    const {
        handleChange,
        handleClick,
        cardTitle,
        display,
        cardObjLength
        } = props;

    const placeholder = <PlaceholderWrapper>
                            <Placeholder 
                                type='text' 
                                id='card-placeholder' 
                                name='card-placeholder'
                                placeholder={ typeof(cardObjLength)==='number' && cardObjLength ? '+ Add another card' : '+ Add a card'}
                                autoComplete='off'
                                onChange={handleChange}
                            ></Placeholder>
                            <Submit 
                                type='submit'
                                id='submit'
                                name='submit'
                                value='Add list'
                                onClick={handleClick}
                                ></Submit>
                        </PlaceholderWrapper>;

    const title = <CardTitle>{cardTitle}</CardTitle>;

    return(
        <React.Fragment>
            {display ? placeholder : title}
        </React.Fragment>
    );
}

export default Title;