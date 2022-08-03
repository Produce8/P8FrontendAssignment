import styles from './index.module.css';
import React, { FunctionComponent, useState } from 'react'

type Props = {
    purchasePrice: number
    interestRate: number
    period: number
}

const CtaCard: FunctionComponent<Props> = ({purchasePrice, interestRate, period}) => {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
            <div className={styles.content}>
                <span className={styles.header}>Your total monthly payment will be</span>
                <div className={styles.total}>
                    <span className={styles.sign}>$</span>
                    <span className={styles.totalNumber}>853</span>
                    <span className={styles.totalDecimal}>50</span>
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
  