import styles from './index.module.css';
import React, { FunctionComponent, useState } from 'react'

interface Options {
    values: number[],
	value: number
}

type Props = {
    label: string,
	options: Options
	onChange: Function
}

const RadioOptions: FunctionComponent<Props> = ({label, options, onChange}) => {

    return (
		<div className={styles.container}>
			<span className={styles.label}>{label}</span>
			{options.values.map((val: number, index:number) => {
				return (
					<label key={index} className={styles.wrapper}>{val} Years
						<input className={styles.radio} type="radio" name="radio" defaultChecked={options.value === val} onClick={() => onChange(val)}/>
						<span className={styles.radioUI}></span>
					</label>
				)
			})}
		</div>
    )
}
  
  export default RadioOptions
  