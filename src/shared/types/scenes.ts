// ===================================
// SCENE TYPES
// ===================================

import { DeviceAction } from './devices';

export interface Scene {
    id: string;
    name: string;
    icon: string;
    color: string;
    description?: string;
    actions: DeviceAction[];
    isFavorite: boolean;
    category: SceneCategory;
}

export type SceneCategory =
    | 'morning'
    | 'evening'
    | 'night'
    | 'leaving'
    | 'arriving'
    | 'entertainment'
    | 'work'
    | 'custom';

// ===================================
// AUTOMATION TYPES
// ===================================

export type TriggerType = 'time' | 'device' | 'location' | 'weather' | 'manual';

export type ConditionOperator = 'equals' | 'greater' | 'less' | 'between';

export interface AutomationTrigger {
    type: TriggerType;
    config: Record<string, any>;
}

export interface AutomationCondition {
    deviceId?: string;
    property: string;
    operator: ConditionOperator;
    value: any;
}

export interface Automation {
    id: string;
    name: string;
    enabled: boolean;
    triggers: AutomationTrigger[];
    conditions?: AutomationCondition[];
    actions: DeviceAction[];
    lastRun?: string;
}
