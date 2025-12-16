'use client';

import React from 'react';
import { Device } from '@/shared/types/devices';
import styles from './DeviceCardPremium.module.css';

interface DeviceCardPremiumProps {
    device: Device;
    onToggle: (id: string) => void;
}

export function DeviceCardPremium({ device, onToggle }: DeviceCardPremiumProps) {
    const isActive = device.status === 'on';

    const getIcon = (type: string) => {
        switch (type) {
            case 'light': return '💡';
            case 'climate': return '❄️';
            case 'fan': return '🌀';
            case 'camera': return '📹';
            case 'gate': return '🚧';
            case 'security': return '🔒';
            case 'plug': return '🔌';
            case 'blind': return '🪟';
            case 'lock': return '🔐';
            default: return '📱';
        }
    };

    const getInfo = (device: Device) => {
        switch (device.type) {
            case 'climate': return `${(device as any).currentTemperature}°C`;
            case 'fan': return `${(device as any).speed}%`;
            default: return isActive ? 'On' : 'Off';
        }
    };

    return (
        <div
            className={`${styles.card} ${isActive ? styles.active : ''}`}
            onClick={() => onToggle(device.id)}
        >
            <span className={styles.icon}>{getIcon(device.type)}</span>

            <div className={styles.info}>
                <h3 className={styles.name}>{device.name}</h3>
                <span className={styles.status}>{getInfo(device)}</span>
            </div>
        </div>
    );
}
