'use client';

import React from 'react';
import styles from './RoomTabs.module.css';

interface RoomTabsProps {
    rooms: string[];
    activeRoom: string;
    onSelect: (room: string) => void;
}

export function RoomTabs({ rooms, activeRoom, onSelect }: RoomTabsProps) {
    return (
        <div className={styles.container}>
            <div className={styles.scrollWrapper}>
                {rooms.map((room) => {
                    const isActive = room === activeRoom;
                    return (
                        <button
                            key={room}
                            className={`${styles.tab} ${isActive ? styles.active : ''}`}
                            onClick={() => onSelect(room)}
                        >
                            <span className={styles.label}>{room}</span>
                            {isActive && <div className={styles.dot} />}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
