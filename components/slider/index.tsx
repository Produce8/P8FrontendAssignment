import React from 'react'

import styles from './slider.module.css';

interface SliderProps {
    className?: String | null,
    min: number,
    max: number,
    step?: number | undefined,
    value: number,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
};

const defaultProps = {
    className: null,
    step: undefined
}

const PROGRESS_COLOR = '#115ecf';
const TO_DO_COLOR = '#d0d5e1';

const Slider: React.FC<SliderProps> = ({ className, children, ...rest }) => {
    const progress = `${Math.abs((rest.value - rest.min) / (rest.max - rest.min)) * 100}%`;
    return (
        <input
            className={[styles.slider, className].filter(Boolean).join(' ')}
            style={{
                background: `linear-gradient(
                    to right,
                    ${PROGRESS_COLOR} 0%,
                    ${PROGRESS_COLOR} ${progress},
                    ${TO_DO_COLOR} ${progress},
                    ${TO_DO_COLOR} 100%
                )`
            }}
            type="range"
            {...rest}
        />
    )
}

Slider.defaultProps = defaultProps;

export default Slider
