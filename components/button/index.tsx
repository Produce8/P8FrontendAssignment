import React from 'react'

import styles from './button.module.css';


const Button: React.FC<{ className: string }> = ({ className, children, ...rest }) => {
    return (
        <button
            className={[className, styles.button].filter(Boolean).join(' ')}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button
