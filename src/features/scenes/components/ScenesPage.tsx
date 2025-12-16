'use client';

import React from 'react';
import scenesData from '@/data/scenes.json';
import { Scene } from '@/shared/types/scenes';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import styles from './ScenesPage.module.css';

export function ScenesPage() {
    const scenes = scenesData as Scene[];

    const handleActivateScene = (sceneId: string) => {
        // In a real app, this would trigger the scene actions
        console.log('Activating scene:', sceneId);
        alert('Scene activated! (Demo mode)');
    };

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            morning: '#f59e0b',
            evening: '#8b5cf6',
            night: '#1e293b',
            leaving: '#6b7280',
            arriving: '#10b981',
            entertainment: '#8b5cf6',
            work: '#3b82f6',
            custom: '#ec4899',
        };
        return colors[category] || '#6b7280';
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Scenes</h1>
                <p>One-tap automation for your home</p>
            </header>

            <div className={styles.scenesGrid}>
                {scenes.map(scene => (
                    <Card key={scene.id} className={styles.sceneCard} padding="lg">
                        <div
                            className={styles.sceneIcon}
                            style={{ background: getCategoryColor(scene.category) }}
                        >
                            {scene.icon}
                        </div>
                        <h3 className={styles.sceneName}>{scene.name}</h3>
                        {scene.description && (
                            <p className={styles.sceneDescription}>{scene.description}</p>
                        )}
                        <Button
                            fullWidth
                            onClick={() => handleActivateScene(scene.id)}
                            className={styles.activateButton}
                        >
                            Activate
                        </Button>
                        {scene.isFavorite && (
                            <span className={styles.favoriteBadge}>⭐</span>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
}
