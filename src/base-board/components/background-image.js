// External modules
import React from 'react';
import styled from 'styled-components';
import { Blurhash } from 'react-blurhash';
import { useSelector, useDispatch } from 'react-redux';

// Internal modules
import * as select from '../selectors/selectors';
import { setLoadedBackground } from '../slices/board-slice';

const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    margin-bottom: 24px;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const BackgroundImage = (props) => {
    const dispatch = useDispatch();
    
    const loadedBackground = useSelector(select.loadedBackground);
    const src = useSelector(select.background);
    const hash = useSelector(select.blurHash);
    const styleDisplay = !loadedBackground ? { display: 'none' } : {}
    return (
        <ImageContainer>
            {!loadedBackground && 
                hash &&
                <Blurhash
                    hash={hash}
                    width={'100%'}
                    height={'100%'}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                />
            }
            <Image
                style={styleDisplay}
                src={src}
                onLoad={() => dispatch(setLoadedBackground())}
            />
        </ImageContainer>
    )
}

export default BackgroundImage;
