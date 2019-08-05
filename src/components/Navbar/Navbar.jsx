import React from 'react'
import styles from './Navbar.module.css'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

function Navbar({ admin, toggleAdmin }) {
    return (
        <div className={styles.navbar}>
            <div className={styles["logo-and-title"]}>
                <img src="thd-logo.svg" alt="The Home Depot"/>
                <h1 className={styles.title}>React Product Browser and Shopping Cart App</h1>
            </div>
            <ToggleSwitch value={admin} label="Admin" toggle={toggleAdmin} />
            {/* {admin ? <p>Admin</p> : null} */}
        </div>
    )
}

export default Navbar
