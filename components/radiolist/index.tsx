import React, { useState } from 'react'
const { v4: uuidv4 } = require('uuid');

import styles from './radiolist.module.css';

export type RadioValue = string | number | readonly string[] | undefined

interface RadioListProps {
    className?: string | undefined,
    value: RadioValue,
    options: {
        id: string,
        label: React.ReactNode,
        value: RadioValue
    }[],
    onChange: (value: RadioValue) => void
}

const RadioList: React.FC<RadioListProps> = ({ className, children, options, value, onChange, ...rest }) => {

    return (
        <div className={[styles.radioList, className].filter(Boolean).join(' ')}>
            {options.map((op) => (
                <Radio
                    key={op.id}
                    id={op.id}
                    label={op.label}
                    value={op.value}
                    checked={Boolean(op.value === value)}
                    onChange={onChange}
                />
            ))}
        </div>
    )
};

interface RadioProps {
    // React strict + NextJS require rendering to not induce side effects.
    // Therefor, throwaway ID's to match input and label cannot be generated on the fly.
    // See: https://github.com/chakra-ui/chakra-ui/issues/4328
    id: string,
    label: React.ReactNode,
    value: RadioValue,
    checked: boolean,
    onChange: (value: RadioValue) => void
}

const Radio: React.FC<RadioProps> = ({ id, label, value, checked, onChange }) => {
    // const [myId] = useState(uuidv4());
    const myId = id;
    return (
        <>
            <input
                className={styles.radio}
                type="radio"
                id={myId}
                value={value}
                checked={checked}
                onChange={() => onChange(value)}
            />
            <label
                className={styles.label}
                htmlFor={myId}
            >
                {label}
            </label>
        </>
    );
};

export default RadioList
