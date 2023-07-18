import React from 'react'

import styles from './fancymoney.module.css';


interface FancyMoneyProps {
    value: number,
    className?: string,
    showChange?: boolean
}


const FancyMoney: React.FC<FancyMoneyProps> = ({ className, value, showChange, children, ...rest }) => {
    const bucks = Math.floor(value);
    const change = ((value % 1) * 100).toFixed(0).padStart(2, '0')

    return (
        <span className={[className, styles.fancyMoney].filter(Boolean).join(' ')}>
            <div className={styles.super}>
                $
            </div>
            <span className={styles.bucks}>
                {bucks.toLocaleString()}
            </span>
            {!showChange ? null : (
                <div className={styles.super}>
                    {change}
                </div>
            )}
        </span>
    )
}

export default FancyMoney
