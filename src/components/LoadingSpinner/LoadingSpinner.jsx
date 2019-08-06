import React from 'react'
import classnames from 'classnames'
import styles from './LoadingSpinner.module.css'

function LoadingSpinner() {
    return (
        <div className={styles.container}>
            <div className={classnames(styles.loading, styles.loading1)}></div>
            <div className={classnames(styles.loading, styles.loading2)}></div>
            <div className={classnames(styles.loading, styles.loading3)}></div>
            <div className={classnames(styles.loading, styles.loading4)}></div>
            <div className={classnames(styles.loading, styles.loading5)}></div>
        </div>
    )
}

export default LoadingSpinner
