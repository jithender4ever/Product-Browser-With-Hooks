import React from 'react'
import styles from './TextInput.module.css'

const Label = ({ error, className, children, ...props }) => (
    <label className={styles.label} {...props}>
        {children}
    </label>
)

export default Label
  