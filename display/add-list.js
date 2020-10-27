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

const AddList = () => {
    const [placeholderDisplay, setDisplay] = useState(true);
    const [text, setText] = useState('');

    function handleClick(){
        if(!text) return;
        setDisplay(false);
    }

    const placeholder = <PlaceholderWrapper>
                            <Placeholder 
                                type='text' 
                                id='card-placeholder' 
                                name='card-placeholder'
                                placeholder='+ Add another list'
                                onChange={(e) => setText(e.target.value)}></Placeholder>
                            <Submit 
                                type='submit'
                                id='submit'
                                name='submit'
                                value='Add list'
                                onClick={handleClick}
                                ></Submit>
                        </PlaceholderWrapper>;

    const title = <Title>{text}</Title>;

    return(
        <React.Fragment>
            {placeholderDisplay ? placeholder : title}
        </React.Fragment>
    );
}

export default AddList;