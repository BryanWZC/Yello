// Redux modules 
import { useSelector } from 'react-redux';

// Other external modules
import { decode } from 'blurhash';

// Internal modules - base-background feature
import * as select from '../selectors/selectors';

/**
 * Allows usage of blurhash when rendering background image
 */
export function useBlurHash() {
    const blurHash = useSelector(select.blurHash);
    if(blurHash){
        const canvas = document.querySelector('#blurHash');
        const pixels = decode(blurHash, canvas.offsetWidth / 2, canvas.offsetHeight / 2);
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(canvas.offsetWidth, canvas.offsetHeight);
        imageData.data.set(pixels);
        ctx.putImageData(imageData, 0, 0);
    }
};

