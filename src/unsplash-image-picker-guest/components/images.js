// External modules
import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

// Internal modules
import * as select2 from '../selectors/selectors';
import { changeBackground } from '../slices/background-slice';

const ImagesContainer = styled.div`
    display: flex;
    align-items: center;
    height: 132px;
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin: 16px 8px 16px 0;
    min-width: 200px;
    min-height: 100px;
    border-radius: 5px;
    cursor: pointer;
    background-image: url(${props => props.thumb});
    background-size: cover;

    &:hover {
        opacity: 0.8;
    }

    &:hover > div {
        display: flex;
    }
`;

const UserContainer = styled.div`
    height: 24px;
    position: relative;
    display: none;
    align-items: center;
    width: 100%;
    bottom: 0;
    padding-left: 4px;
    background-color: rgba(0,0,0,.64);
    text-overflow: ellipsis;
`;

const Name = styled.a`
    color: white;
    font-size: 10px;
`;

const Images = (props) => {
    let imageJson = useSelector(select2.backgroundImageJson) || {};
    return(
        <ImagesContainer>
            {imageJson.results &&
                imageJson.results.map((imageData, index) => <Image 
                    thumb={imageData.thumb} 
                    name={imageData.name}
                    userSite={imageData.userSite}
                    index={index}
                    key={imageData.id}
                />) 
            }
        </ImagesContainer>
    );
};

const Image = (props) => {
    const dispatch = useDispatch();
    const { thumb, name, userSite, index } = props;
    return(
        <ImageContainer 
            thumb={thumb}
            onClick={() => {
                dispatch(changeBackground(index));
            }}
        >
            <UserContainer>
                <Name href={userSite} target='_blank'>
                    {name}
                </Name>
            </UserContainer>
        </ImageContainer>
    );
}

export { Images }