import { useLayoutEffect, useState, useRef, useCallback, useEffect } from 'react'

const useWindowResize = (ref) => {
    console.log('render')
    const [width, setWidth] = useState(0);
    const carouselRef = ref;


    useEffect(() => {
        const updateSize = () => {
            console.log(carouselRef.current.scrollWidth, carouselRef.current.offsetWidth);
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }

        updateSize();
        window.addEventListener('resize', updateSize);

        return () => {
            window.removeEventListener('resize', updateSize);
        }
    }, [carouselRef]);

    return width;
}

export default useWindowResize