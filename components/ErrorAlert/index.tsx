import styles from './index.module.css';
import React, { FunctionComponent } from 'react'

type Props = {
    show: boolean,
	message: string
}

const ErrorAlert: FunctionComponent<Props> = ({show, message}) => {
  return (
    <div style={{display: show ? "block" : "none"}}>
        <div className={styles.alert} >
        <div className="container">
            <span className={styles.message}>{message}</span>
        </div>
        </div>
    </div>
  )
}

export default ErrorAlert
