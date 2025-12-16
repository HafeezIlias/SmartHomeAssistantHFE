import React, { ReactNode } from 'react';
import styles from './Card.module.css';

export interface CardProps {
    children: ReactNode;
    className?: string;
    glass?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    onClick?: () => void;
    hoverable?: boolean;
}

export function Card({
    children,
    className = '',
    glass = true,
    padding = 'md',
    onClick,
    hoverable = false,
}: CardProps) {
    const classNames = [
        styles.card,
        glass && styles.glass,
        styles[`padding-${padding}`],
        onClick && styles.clickable,
        hoverable && styles.hoverable,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={classNames} onClick={onClick}>
            {children}
        </div>
    );
}
