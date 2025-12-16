'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDevices } from '@/shared/contexts/DeviceContext';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { Toggle } from '@/shared/components/Toggle';
import { LightDevice, ClimateDevice, FanDevice, CameraDevice, GateDevice } from '@/shared/types/devices';
import styles from './RoomDetail.module.css';

export function RoomDetail() {
    const params = useParams();
    const router = useRouter();
    const { getRoomById, getDevicesByRoom, toggleDevice, updateDevice } = useDevices();

    const roomId = params.roomId as string;
    const room = getRoomById(roomId);
    const devices = getDevicesByRoom(roomId);

    if (!room) {
        return <div className={styles.container}>Room not found</div>;
    }

    const renderDeviceControl = (device: any) => {
        switch (device.type) {
            case 'light':
                const light = device as LightDevice;
                return (
                    <Card key={device.id} className={styles.deviceCard}>
                        <div className={styles.deviceHeader}>
                            <div>
                                <span className={styles.deviceIcon}>💡</span>
                                <h3 className={styles.deviceName}>{device.name}</h3>
                            </div>
                            <Toggle
                                checked={device.status === 'on'}
                                onChange={() => toggleDevice(device.id)}
                            />
                        </div>
                        {device.status === 'on' && (
                            <div className={styles.deviceControls}>
                                <label className={styles.controlLabel}>
                                    Brightness: {light.brightness}%
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={light.brightness}
                                        onChange={(e) => updateDevice(device.id, { brightness: parseInt(e.target.value) })}
                                        className={styles.slider}
                                    />
                                </label>
                            </div>
                        )}
                    </Card>
                );

            case 'climate':
                const climate = device as ClimateDevice;
                return (
                    <Card key={device.id} className={styles.deviceCard}>
                        <div className={styles.deviceHeader}>
                            <div>
                                <span className={styles.deviceIcon}>❄️</span>
                                <h3 className={styles.deviceName}>{device.name}</h3>
                            </div>
                            <Toggle
                                checked={device.status === 'on'}
                                onChange={() => toggleDevice(device.id)}
                            />
                        </div>
                        {device.status === 'on' && (
                            <div className={styles.deviceControls}>
                                <div className={styles.tempControl}>
                                    <Button onClick={() => updateDevice(device.id, { targetTemperature: climate.targetTemperature - 1 })}>
                                        -
                                    </Button>
                                    <span className={styles.tempDisplay}>{climate.targetTemperature}°C</span>
                                    <Button onClick={() => updateDevice(device.id, { targetTemperature: climate.targetTemperature + 1 })}>
                                        +
                                    </Button>
                                </div>
                                <p className={styles.subtext}>Current: {climate.currentTemperature}°C • Humidity: {climate.humidity}%</p>
                            </div>
                        )}
                    </Card>
                );

            case 'fan':
                const fan = device as FanDevice;
                return (
                    <Card key={device.id} className={styles.deviceCard}>
                        <div className={styles.deviceHeader}>
                            <div>
                                <span className={styles.deviceIcon}>🌀</span>
                                <h3 className={styles.deviceName}>{device.name}</h3>
                            </div>
                            <Toggle
                                checked={device.status === 'on'}
                                onChange={() => toggleDevice(device.id)}
                            />
                        </div>
                        {device.status === 'on' && (
                            <div className={styles.deviceControls}>
                                <label className={styles.controlLabel}>
                                    Speed: {fan.speed}%
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={fan.speed}
                                        onChange={(e) => updateDevice(device.id, { speed: parseInt(e.target.value) })}
                                        className={styles.slider}
                                    />
                                </label>
                                {fan.supportsOscillation && (
                                    <Toggle
                                        label="Oscillation"
                                        checked={fan.isOscillating}
                                        onChange={(checked) => updateDevice(device.id, { isOscillating: checked })}
                                    />
                                )}
                            </div>
                        )}
                    </Card>
                );

            case 'camera':
                const camera = device as CameraDevice;
                return (
                    <Card key={device.id} className={styles.deviceCard}>
                        <div className={styles.deviceHeader}>
                            <div>
                                <span className={styles.deviceIcon}>📹</span>
                                <h3 className={styles.deviceName}>{device.name}</h3>
                            </div>
                            <span className={`${styles.status} ${camera.isRecording ? styles.recording : ''}`}>
                                {camera.isRecording ? '● REC' : '○ OFF'}
                            </span>
                        </div>
                        <div className={styles.cameraFeatures}>
                            <span className={styles.feature}>Motion: {camera.hasMotionDetection ? '✓' : '✗'}</span>
                            <span className={styles.feature}>Night: {camera.nightVisionEnabled ? '✓' : '✗'}</span>
                            <span className={styles.feature}>PTZ: {camera.hasPTZ ? '✓' : '✗'}</span>
                        </div>
                    </Card>
                );

            case 'gate':
                const gate = device as GateDevice;
                return (
                    <Card key={device.id} className={styles.deviceCard}>
                        <div className={styles.deviceHeader}>
                            <div>
                                <span className={styles.deviceIcon}>🚧</span>
                                <h3 className={styles.deviceName}>{device.name}</h3>
                            </div>
                            <span className={styles.gateStatus}>{gate.position.toUpperCase()}</span>
                        </div>
                        <div className={styles.gateControls}>
                            <Button
                                fullWidth
                                onClick={() => updateDevice(device.id, { position: gate.position === 'open' ? 'closed' : 'open' })}
                            >
                                {gate.position === 'open' ? 'Close Gate' : 'Open Gate'}
                            </Button>
                        </div>
                    </Card>
                );

            default:
                return (
                    <Card key={device.id} className={styles.deviceCard}>
                        <div className={styles.deviceHeader}>
                            <div>
                                <span className={styles.deviceIcon}>📱</span>
                                <h3 className={styles.deviceName}>{device.name}</h3>
                            </div>
                            <Toggle
                                checked={device.status === 'on'}
                                onChange={() => toggleDevice(device.id)}
                            />
                        </div>
                    </Card>
                );
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Button variant="icon" onClick={() => router.back()}>
                    ←
                </Button>
                <div className={styles.headerInfo}>
                    <span className={styles.roomIcon}>{room.icon}</span>
                    <h1>{room.name}</h1>
                </div>
            </header>

            <div className={styles.devicesGrid}>
                {devices.map(renderDeviceControl)}
            </div>

            {devices.length === 0 && (
                <div className={styles.emptyState}>
                    <p>No devices in this room</p>
                </div>
            )}
        </div>
    );
}
