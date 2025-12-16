'use client';

import React, { useState } from 'react';
import { useDevices } from '@/shared/contexts/DeviceContext';
import styles from './CCTVPreview.module.css';

export function CCTVPreview() {
    const { devices } = useDevices();
    const [showAll, setShowAll] = useState(false);

    // Filter all camera devices
    const allCameras = devices.filter(d => d.type === 'camera');
    const displayedCameras = showAll ? allCameras : allCameras.slice(0, 6);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.heading}>CCTV System</h2>
                <span className={styles.count}>{allCameras.length} Cameras</span>
            </div>

            <div className={styles.grid}>
                {displayedCameras.map((camera) => (
                    <div key={camera.id} className={styles.cameraCard}>
                        <div className={styles.feed}>
                            <div className={styles.placeholder}>
                                <span className={styles.cameraIcon}>📹</span>
                            </div>
                            {camera.status === 'on' && (camera as any).isRecording && (
                                <div className={styles.recBadge}>
                                    <span className={styles.recDot}>●</span>
                                    <span>REC</span>
                                </div>
                            )}
                            {camera.status === 'on' && (
                                <div className={styles.liveBadge}>LIVE</div>
                            )}
                        </div>
                        <div className={styles.info}>
                            <span className={styles.name}>{camera.name}</span>
                        </div>
                    </div>
                ))}
            </div>

            {allCameras.length > 6 && (
                <button
                    className={styles.toggleButton}
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? 'See Less' : `See More (${allCameras.length - 6} more)`}
                </button>
            )}
        </div>
    );
}
