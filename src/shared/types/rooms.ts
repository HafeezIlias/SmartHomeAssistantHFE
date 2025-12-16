// ===================================
// ROOM TYPES
// ===================================

export interface Room {
    id: string;
    name: string;
    icon: string;
    deviceIds: string[];
    activeDevicesCount: number;
    totalDevicesCount: number;
    color?: string;
}

export type RoomType =
    | 'living-room'
    | 'bedroom'
    | 'kitchen'
    | 'bathroom'
    | 'office'
    | 'garage'
    | 'outdoor'
    | 'hallway'
    | 'dining-room'
    | 'other';
