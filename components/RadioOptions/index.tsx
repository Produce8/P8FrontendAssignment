import styles from './index.module.css';
import React, { FunctionComponent, useState } from 'react'

type Props = {
    label: string,
    values: number[]
}

const RadioOptions: FunctionComponent<Props> = ({label, values}) => {
    return (
      <div className={styles.container}>
        <span className={styles.label}>{label}</span>
        {values.map((val: number, index:number) => {
            return (
                <label key={index} className={styles.wrapper}>{val} Years
                    <input className={styles.radio} type="radio" name="radio" />
                    <span className={styles.radioUI}></span>
                </label>
            )
        })}
      </div>
    )
}
  
  export default RadioOptions
  