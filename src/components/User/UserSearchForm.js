import React, { useState } from 'react'

import classes from './UserSearchForm.module.css';

const UserSearchForm = (props) => {
    const [enteredTetxtSearch, setEnteredTextSearch] = useState('');

    const formSubmitHandler = (e) => {
        e.preventDefault();

        setEnteredTextSearch('');
    }

    const searchTextChangeHandler = e => setEnteredTextSearch(e.target.value);

    return (
        <form className={classes.searchForm} onSubmit={formSubmitHandler}>
            <div className={classes.searchContainer}>
                <input
                    className={classes.searchInput}
                    placeholder="Search F1 driver"
                    value={enteredTetxtSearch}
                    onChange={searchTextChangeHandler}
                />
                <button>Search</button>
            </div>
        </form>
    )
}

export default UserSearchForm