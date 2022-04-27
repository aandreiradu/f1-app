import React from 'react'

import classes from './Footer.module.css'

const Footer = () => {
    return (
        <section className={classes.footer}>
            Copyright &copy; Andrei Radu, {new Date().getFullYear()}
        </section>
    )
}

export default Footer