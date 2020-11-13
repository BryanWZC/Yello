// External modules
import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

// Internal modules
import { searchInputOnChange, confirmQuery, fetchImageJson } from '../slices/background-slice';
import * as select2 from '../selectors/selectors';

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
    color: #fff;
    background-color: #16C172;
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
                value={useSelector(select2.backgroundSearchQuery)}
                onChange={ (e) => dispatch(searchInputOnChange(e)) }
                onKeyDown={(e) => {
                    e.persist();
                    if(e.key === 'Enter') {
                        dispatch(confirmQuery());
                        dispatch(fetchImageJson());
                    }
                }
                }
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