import React from 'react';
import styles from './Toggle.module.css';

export interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    label?: string;
}

export function Toggle({
    checked,
    onChange,
    disabled = false,
    size = 'md',
    label,
}: ToggleProps) {
    return (
        <label className={`${styles.toggleContainer} ${disabled ? styles.disabled : ''}`}>
            {label && <span className={styles.label}>{label}</span>}
            <div className={`${styles.toggle} ${styles[size]} ${checked ? styles.checked : ''}`}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={disabled}
                    className={styles.input}
                />
                <span className={styles.slider}></span>
            </div>
        </label>
    );
}
