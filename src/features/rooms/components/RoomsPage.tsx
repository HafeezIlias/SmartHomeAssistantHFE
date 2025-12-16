'use client';

import React from 'react';
import Link from 'next/link';
import { useDevices } from '@/shared/contexts/DeviceContext';
import { Card } from '@/shared/components/Card';
import styles from './RoomsPage.module.css';

export function RoomsPage() {
    const { rooms } = useDevices();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Rooms</h1>
                <p>Manage devices by room</p>
            </header>

            <div className={styles.roomsGrid}>
                {rooms.map(room => (
                    <Link key={room.id} href={`/rooms/${room.id}`} className={styles.roomCard}>
                        <Card hoverable padding="lg">
                            <div className={styles.roomHeader}>
                                <span className={styles.roomIcon}>{room.icon}</span>
                                <span className={`${styles.roomBadge} ${room.activeDevicesCount > 0 ? styles.active : ''}`}>
                                    {room.activeDevicesCount}
                                </span>
                            </div>
                            <h2 className={styles.roomName}>{room.name}</h2>
                            <p className={styles.roomDevices}>
                                {room.totalDevicesCount} {room.totalDevicesCount === 1 ? 'device' : 'devices'}
                            </p>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
