'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { Card } from '@/shared/components/Card';
import styles from './MorePage.module.css';

export function MorePage() {
    const { theme, setTheme, actualTheme } = useTheme();

    const menuItems = [
        { icon: '📹', label: 'CCTV', href: '/cctv', badge: '3 cameras' },
        { icon: '📊', label: 'Energy', href: '/energy', badge: 'Monitor usage' },
        { icon: '🔔', label: 'Notifications', href: '/notifications', badge: '0 new' },
        { icon: '⚙️', label: 'Settings', href: '/settings', badge: null },
    ];

    const themeItems = [
        { value: 'light' as const, label: 'Light', icon: '☀️' },
        { value: 'dark' as const, label: 'Dark', icon: '🌙' },
        { value: 'auto' as const, label: 'Auto', icon: '🔄' },
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>More</h1>
                <p>Additional features and settings</p>
            </header>

            {/* Theme Selector */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Theme</h2>
                <div className={styles.themeGrid}>
                    {themeItems.map(item => (
                        <Card
                            key={item.value}
                            className={`${styles.themeCard} ${theme === item.value ? styles.active : ''}`}
                            onClick={() => setTheme(item.value)}
                            hoverable
                        >
                            <span className={styles.themeIcon}>{item.icon}</span>
                            <span className={styles.themeLabel}>{item.label}</span>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Menu Items */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Features</h2>
                <div className={styles.menuList}>
                    {menuItems.map(item => (
                        <Link key={item.label} href={item.href} className={styles.menuLink}>
                            <Card hoverable>
                                <div className={styles.menuItem}>
                                    <div className={styles.menuLeft}>
                                        <span className={styles.menuIcon}>{item.icon}</span>
                                        <span className={styles.menuLabel}>{item.label}</span>
                                    </div>
                                    <div className={styles.menuRight}>
                                        {item.badge && <span className={styles.menuBadge}>{item.badge}</span>}
                                        <span className={styles.menuArrow}>→</span>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            {/* App Info */}
            <div className={styles.appInfo}>
                <p>Smart Home Assistant v1.0.0</p>
                <p className={styles.subtext}>Built with Next.js & Vercel</p>
            </div>
        </div>
    );
}
