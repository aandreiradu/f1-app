import React, { useState } from 'react'
import Nav from '../../components/Nav/Nav';
import Users from '../../components/User/Users';
import classes from './Home';

const Home = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const menuOpenHandler = () => {
        setMenuOpen((prevState) => !prevState);
    }

    return (
        <>
            <Nav onMenuOpen={menuOpenHandler} />
            <Users />
        </>
    )
}

export default Home