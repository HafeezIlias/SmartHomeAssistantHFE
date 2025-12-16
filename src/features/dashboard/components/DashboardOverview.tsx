'use client';

import React, { useState } from 'react';
import { useDevices } from '@/shared/contexts/DeviceContext';
import { EmergencySection } from './EmergencySection';
import { CCTVPreview } from './CCTVPreview';
import { RoomTabs } from './RoomTabs';
import { DeviceCardPremium } from './DeviceCardPremium';
import styles from './DashboardOverview.module.css';

// Room names matching devices.json roomIds
const ROOM_NAMES = ['Living Room', 'Bedroom', 'Kitchen', 'Garage', 'Outdoor'];

export function DashboardOverview() {
    const { devices, toggleDevice } = useDevices();
    const [activeRoom, setActiveRoom] = useState('Living Room');

    // Map display names to roomIds in devices.json
    const getRoomId = (roomName: string): string => {
        const mapping: Record<string, string> = {
            'Living Room': 'living-room',
            'Bedroom': 'bedroom',
            'Kitchen': 'kitchen',
            'Garage': 'garage',
            'Outdoor': 'outdoor'
        };
        return mapping[roomName] || roomName.toLowerCase().replace(' ', '-');
    };

    // Filter devices by selected room
    const roomDevices = devices.filter(d => d.roomId === getRoomId(activeRoom));

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.profileSection}>
                    <div className={styles.avatar}>🧔🏻</div>
                    <div className={styles.greeting}>
                        <h1>Hi Lex</h1>
                        <p className={styles.date}>Monday, 20 Jan</p>
                    </div>
                </div>
                <button className={styles.menuBtn}>
                    <div className={styles.hamburger}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
            </header>

            {/* Main Content Area */}
            <div className={styles.content}>
                <EmergencySection />

                <CCTVPreview />

                <RoomTabs
                    rooms={ROOM_NAMES}
                    activeRoom={activeRoom}
                    onSelect={setActiveRoom}
                />

                <div className={styles.deviceGrid}>
                    {roomDevices.map(device => (
                        <DeviceCardPremium
                            key={device.id}
                            device={device}
                            onToggle={toggleDevice}
                        />
                    ))}

                    {/* Fallback if no devices loaded for this room key yet */}
                    {roomDevices.length === 0 && (
                        <div className={styles.noDevices}>
                            <p>No devices found in {activeRoom}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
