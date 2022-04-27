import React from 'react'
import imageSrc from './formula-1-logo.png';

import classes from './Nav.module.css';

const Nav = () => {
    return (
        <nav className={classes.nav}>
            <div className={classes.navContent}>
                <div className={classes.logo}>
                    <img src={imageSrc} alt='logo' />
                </div>
                <h1 className={classes.logoTitle}>
                    {/* <span className={classes.bigLetter}>Drivers</span> */}
                    {/* Drivers */}
                </h1>
            </div>
        </nav>
    )
}

export default Nav