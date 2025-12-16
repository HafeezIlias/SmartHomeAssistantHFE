'use client';

import React, { useState } from 'react';
import styles from './EmergencySection.module.css';

export function EmergencySection() {
    const [sirenActive, setSirenActive] = useState(false);

    // Simplified to just 4 main emergency contacts
    const contacts = [
        { label: 'Police', icon: '🚓', number: '999' },
        { label: 'Fire Dept', icon: '🚒', number: '994' },
        { label: 'Hospital', icon: '🏥', number: '991' },
        { label: 'Emergency', icon: '📞', number: '15454' },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.heading}>Emergency Contacts</h2>
                <button
                    className={`${styles.sirenButton} ${sirenActive ? styles.sirenActive : ''}`}
                    onClick={() => setSirenActive(!sirenActive)}
                >
                    <span className={styles.sirenIcon}>🚨</span>
                    <span className={styles.sirenText}>SIREN {sirenActive ? 'ON' : 'OFF'}</span>
                </button>
            </div>

            <div className={styles.grid}>
                {contacts.map((contact) => (
                    <button key={contact.label} className={styles.contactCard}>
                        <span className={styles.contactIcon}>{contact.icon}</span>
                        <span className={styles.contactLabel}>{contact.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
