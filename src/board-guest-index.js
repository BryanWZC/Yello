// External modules
import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit'; 
import { Provider } from 'react-redux';

// Internal modules
// import { rootReducer } from './combine-slice-guest';
// import { Board } from './base-board-guest/components/board';
import { rootReducer } from './combine-slice';
import { Board } from './base-board/components/board';

const store = configureStore({ reducer: rootReducer });

ReactDOM.render(
    <Provider store={store}>
        <Board />
    </Provider>,
    document.getElementById('root')
);