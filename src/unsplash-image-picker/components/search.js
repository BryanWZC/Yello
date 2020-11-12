// External modules
import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

// Internal modules
import { searchInputOnChange, confirmQuery, fetchImageJson } from '../slices/background-slice';

const SearchWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const SearchBar = styled.input`
    width: 250px;
    height: 32px;
    padding-left: 4px;
    border: none;
    border-radius: 5px;
    margin-right: 8px;
`;

const SearchButton = styled.button`
    height: 32px;
    width: 64px;
    border-radius: 5px;
    border: none;
    padding: 4px;
    background-color: #5aac44;
    outline: none;
    cursor: pointer;
`;


const Search = (props) => {
    const dispatch = useDispatch();
    return(
        <SearchWrapper>
            <SearchBar 
                type='search'
                id='unsplash-search'
                name='unsplash-search'
                placeholder='Add a background!'
                onChange={ (e) => dispatch(searchInputOnChange(e)) }
            />
            <SearchButton onClick={ () => {
                dispatch(confirmQuery());
                dispatch(fetchImageJson());
            }}>
                Search  
            </SearchButton>
        </SearchWrapper>
    );
}

export { Search };