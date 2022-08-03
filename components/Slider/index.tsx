import styles from './index.module.css';
import React, { FunctionComponent, useState } from 'react'

interface Options {
    min: number
    max: number
    type: string
    defaultValue: number
    labelMin: string
    labelMax: string
}

type Props = {
    label: string
    options: Options
    onChange: Function
}

const Slider: FunctionComponent<Props> = ({label, options, onChange}) => {
    const [value, setValue] = useState(options.defaultValue)

    const onSliderValueChange = () => {
        onChange(value)
    }

    return (
      <div className={styles.container}>
        <span className={styles.label}>{label}</span>
        <div className={`${styles.value} mt-1`}>
            {options.type === "dollar" ? <><span className={styles.dollar}>$</span><span className={styles.amount}>{Number(value).toLocaleString()}</span></>: 
            <><span className={styles.amount}>{value}</span><span className={styles.percent}>%</span></>}
        </div>
        <div className={styles.sliderWrapper}>
            <div className={styles.sliderProgress} style={{width: `${(value/options.max) * 100}%`}}></div>
            <input className={styles.slider} type="range" min={options.min} max={options.max} value={value} onChange={(e) => {setValue(parseInt(e.target.value))}} onMouseUp={() => onSliderValueChange()}/>
        </div>
        <div className={`${styles.footerLabel} mt-1`}>
            <span>{options.labelMin}</span>
            <span>{options.labelMax}</span>
        </div>
      </div>
    )
  }
  
  export default Slider
  