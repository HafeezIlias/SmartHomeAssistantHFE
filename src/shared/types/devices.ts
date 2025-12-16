// ===================================
// DEVICE TYPES
// ===================================

export type DeviceStatus = 'on' | 'off' | 'idle' | 'error';

export interface BaseDevice {
  id: string;
  name: string;
  type: DeviceType;
  roomId: string;
  status: DeviceStatus;
  lastUpdated: string;
  isOnline: boolean;
}

export type DeviceType =
  | 'light'
  | 'climate'
  | 'security'
  | 'camera'
  | 'fan'
  | 'gate'
  | 'plug'
  | 'blind'
  | 'lock'
  | 'sensor'
  | 'speaker'
  | 'tv';

// ===== LIGHT DEVICE =====
export interface LightDevice extends BaseDevice {
  type: 'light';
  brightness: number; // 0-100
  color?: string; // RGB hex color
  temperature?: number; // Kelvin (2700-6500)
  supportsColor: boolean;
  supportsTemperature: boolean;
}

// ===== CLIMATE DEVICE =====
export type ClimateMode = 'cool' | 'heat' | 'auto' | 'fan' | 'off';

export interface ClimateDevice extends BaseDevice {
  type: 'climate';
  currentTemperature: number;
  targetTemperature: number;
  humidity: number;
  mode: ClimateMode;
  fanSpeed: number; // 0-100
  isEcoMode: boolean;
}

// ===== CAMERA DEVICE =====
export interface CameraDevice extends BaseDevice {
  type: 'camera';
  streamUrl: string;
  snapshotUrl: string;
  isRecording: boolean;
  hasMotionDetection: boolean;
  hasPTZ: boolean; // Pan/Tilt/Zoom
  nightVisionEnabled: boolean;
  privacyMode: boolean;
}

// ===== FAN DEVICE =====
export type FanMode = 'normal' | 'natural' | 'sleep' | 'turbo';

export interface FanDevice extends BaseDevice {
  type: 'fan';
  speed: number; // 0-100 or 0-5 depending on fan
  maxSpeed: number;
  isOscillating: boolean;
  mode: FanMode;
  timer: number; // minutes, 0 = off
  hasTimer: boolean;
  supportsOscillation: boolean;
}

// ===== GATE DEVICE =====
export type GatePosition = 'open' | 'closed' | 'opening' | 'closing';

export interface GateDevice extends BaseDevice {
  type: 'gate';
  position: GatePosition;
  autoCloseTimer: number; // minutes
  hasVehicleDetection: boolean;
  lastActivity?: {
    timestamp: string;
    action: 'opened' | 'closed';
    triggeredBy: string;
  };
}

// ===== SECURITY DEVICE =====
export type SecurityMode = 'armed' | 'disarmed' | 'armed-home' | 'armed-away';
export type SensorType = 'door' | 'window' | 'motion' | 'glass' | 'smoke';

export interface SecurityDevice extends BaseDevice {
  type: 'security';
  mode: SecurityMode;
  sensors: Array<{
    id: string;
    type: SensorType;
    location: string;
    active: boolean;
  }>;
  alarmActive: boolean;
}

// ===== SMART PLUG =====
export interface PlugDevice extends BaseDevice {
  type: 'plug';
  powerConsumption: number; // Watts
  voltage: number;
  current: number; // Amperes
  hasPowerMonitoring: boolean;
}

// ===== BLIND/CURTAIN =====
export interface BlindDevice extends BaseDevice {
  type: 'blind';
  position: number; // 0-100 (0 = closed, 100 = open)
  tilt?: number; // For venetian blinds
}

// ===== DOOR LOCK =====
export interface LockDevice extends BaseDevice {
  type: 'lock';
  isLocked: boolean;
  batteryLevel: number;
  hasKeypad: boolean;
  autoLockEnabled: boolean;
  autoLockDelay: number; // seconds
}

// Union type for all devices
export type Device =
  | LightDevice
  | ClimateDevice
  | CameraDevice
  | FanDevice
  | GateDevice
  | SecurityDevice
  | PlugDevice
  | BlindDevice
  | LockDevice;

// ===================================
// DEVICE ACTIONS
// ===================================

export interface DeviceAction {
  deviceId: string;
  action: string;
  params?: Record<string, any>;
}

export interface DeviceUpdate {
  deviceId: string;
  updates: Partial<Device>;
}
