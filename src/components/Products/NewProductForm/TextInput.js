import React from 'react'
import classnames from 'classnames'
import Label from './Label'
import styles from '../Products.module.css'

const InputFeedback = ({ error }) => error ? <div className={styles["input-feedback"]}>{error}</div> : null

const getErrorClassName = error => (
    !!error ? `${styles.animated} ${styles.shake} ${styles.error}` : ''
)

const TextInput = ({ type, id, label, error, value, onChange, className, ...props }) => (
    <div className={classnames(styles.row, getErrorClassName(error), className)}>
        <div className={styles["col-25"]}>
            <Label htmlFor={id} error={error}>{label}</Label>
        </div>
        <div className={styles["col-75"]}>
            <input
                id={id}
                className={styles["text-input"]}
                type={type}
                value={value}
                onChange={onChange}
                {...props}
            />
            <InputFeedback error={error} />
        </div>
    </div>
)

export default TextInput
