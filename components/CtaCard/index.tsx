import styles from './index.module.css';
import React, { FunctionComponent, useState } from 'react'

type Props = {
    mortgage: number
}

const CtaCard: FunctionComponent<Props> = ({mortgage}) => {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
            <div className={styles.content}>
                <span className={styles.header}>Your total monthly payment will be</span>
                <div className={styles.total}>
                    <span className={styles.sign}>$</span>
                    <span className={styles.totalNumber}>{Number(Math.trunc(mortgage)).toLocaleString()}</span>
                    <span className={styles.totalDecimal}>{mortgage.toString().split('.')[1]}</span>
                </div>
                <span className={styles.month}>/month</span>
            </div>
            <div className={styles.button}>
                <span className={styles.buttonLabel}>Apply Today</span>
            </div>
        </div>
      </div>
    )
}
  
  export default CtaCard
  