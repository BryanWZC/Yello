// External modules
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal modules - slices
import { setLoadedBackground, setBackgroundColor } from '../slices/board-slice';

// Internal modules
import * as select from '../selectors/selectors';

const loadingBackground = () => {
    const dispatch = useDispatch();
    const src = useSelector(select.background);
    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => dispatch(setLoadedBackground(src));
    }, [src]);
}

export { loadingBackground };