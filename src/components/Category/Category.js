import React from 'react'
import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import categoryImages from '../../category images/categoryImages'
import useWindowResize from '../../hooks/useWindowResize'

import classes from './Category.module.css'

const Category = () => {
    const [width, setWidth] = useState(0);
    // console.log('render category')
    const carouselRef = useRef();
    // const width = useWindowResize(carouselRef);
    // console.log('width', width);

    useEffect(() => {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }, []);

    return (
        <section className={classes.carouselSection}>
            <motion.div
                initial={{ scale: 1.2, rotate: 45 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
                className={classes.carousel}
                ref={carouselRef}>
                <motion.div drag='x' dragConstraints={{ right: 0, left: -width }} whileTap={{ cursor: 'grabbing' }} className={classes['inner-carousel']}>
                    {categoryImages.map((category) => {
                        return (
                            <motion.div key={category.id} className={classes.card}>
                                <img src={category.imgSrc} alt='category' />
                                <div className={classes.info}>
                                    <h1>{category.title} Results</h1>
                                    <Link className={classes.linkTo} to={category.path}>View</Link>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Category