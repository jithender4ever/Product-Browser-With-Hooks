import React from 'react'
import classnames from 'classnames'
import styles from './ToggleSwitch.module.css'

function ToggleSwitch({ label, toggle, value = false }) {
    return (
        <label className={styles.container}>
            <span className={styles.label}>{label}</span>
            <span className={styles.switch}>
                <input type="checkbox" checked={value} onChange={toggle} />
                <span className={classnames(styles.slider, styles.round)}></span>
            </span>
        </label>
    )
}

export default ToggleSwitch
