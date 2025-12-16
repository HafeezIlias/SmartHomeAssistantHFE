'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Device } from '@/shared/types/devices';
import { Room } from '@/shared/types/rooms';
import devicesData from '@/data/devices.json';
import roomsData from '@/data/rooms.json';

interface DeviceContextType {
    devices: Device[];
    rooms: Room[];
    getDeviceById: (id: string) => Device | undefined;
    getRoomById: (id: string) => Room | undefined;
    getDevicesByRoom: (roomId: string) => Device[];
    updateDevice: (deviceId: string, updates: Partial<Device>) => void;
    toggleDevice: (deviceId: string) => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export function DeviceProvider({ children }: { children: ReactNode }) {
    const [devices, setDevices] = useState<Device[]>(devicesData as Device[]);
    const [rooms, setRooms] = useState<Room[]>(roomsData as Room[]);

    const getDeviceById = (id: string) => {
        return devices.find(device => device.id === id);
    };

    const getRoomById = (id: string) => {
        return rooms.find(room => room.id === id);
    };

    const getDevicesByRoom = (roomId: string) => {
        return devices.filter(device => device.roomId === roomId);
    };

    const updateDevice = (deviceId: string, updates: Partial<Device>) => {
        setDevices(prevDevices =>
            prevDevices.map(device =>
                device.id === deviceId
                    ? { ...device, ...updates, lastUpdated: new Date().toISOString() } as Device
                    : device
            )
        );
    };

    const toggleDevice = (deviceId: string) => {
        const device = getDeviceById(deviceId);
        if (device) {
            const newStatus = device.status === 'on' ? 'off' : 'on';
            updateDevice(deviceId, { status: newStatus });
        }
    };

    // Update room active device counts when devices change
    useEffect(() => {
        setRooms(prevRooms =>
            prevRooms.map(room => {
                const roomDevices = devices.filter(d => d.roomId === room.id);
                const activeCount = roomDevices.filter(d => d.status === 'on').length;
                return {
                    ...room,
                    activeDevicesCount: activeCount,
                    totalDevicesCount: roomDevices.length,
                };
            })
        );
    }, [devices]);

    return (
        <DeviceContext.Provider
            value={{
                devices,
                rooms,
                getDeviceById,
                getRoomById,
                getDevicesByRoom,
                updateDevice,
                toggleDevice,
            }}
        >
            {children}
        </DeviceContext.Provider>
    );
}

export function useDevices() {
    const context = useContext(DeviceContext);
    if (context === undefined) {
        throw new Error('useDevices must be used within a DeviceProvider');
    }
    return context;
}
