// ===================================
// USER TYPES
// ===================================

export type UserRole = 'admin' | 'family' | 'guest';

export type ThemePreference = 'light' | 'dark' | 'auto';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: UserRole;
    preferences: UserPreferences;
}

export interface UserPreferences {
    theme: ThemePreference;
    temperatureUnit: 'celsius' | 'fahrenheit';
    timeFormat: '12h' | '24h';
    language: string;
    notifications: {
        security: boolean;
        energy: boolean;
        device: boolean;
        automation: boolean;
    };
}

// ===================================
// NOTIFICATION TYPES
// ===================================

export type NotificationType = 'security' | 'energy' | 'device' | 'automation' | 'system';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Notification {
    id: string;
    type: NotificationType;
    priority: NotificationPriority;
    title: string;
    message: string;
    timestamp: string;
    isRead: boolean;
    deviceId?: string;
    actionUrl?: string;
}
