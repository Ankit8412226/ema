"use client";

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { UserCircleIcon, BellIcon, ShieldCheckIcon, CreditCardIcon } from '@heroicons/react/24/outline';

const settingsSections = [
    {
        title: 'Profile Settings',
        icon: UserCircleIcon,
        items: ['Personal Information', 'Notification Preferences', 'Language & Region']
    },
    {
        title: 'Security',
        icon: ShieldCheckIcon,
        items: ['Password & Authentication', 'API Keys', 'Session Management']
    },
    {
        title: 'Billing & Plans',
        icon: CreditCardIcon,
        items: ['Current Plan', 'Payment Methods', 'Billing History']
    }
];

export default function SettingsPage() {
    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
                    <p className="text-muted">Manage your account preferences and system configurations.</p>
                </div>

                <div className="space-y-6">
                    {settingsSections.map((section) => (
                        <div key={section.title} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-border flex items-center gap-3 bg-secondary/30">
                                <section.icon className="w-6 h-6 text-accent" />
                                <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                            </div>
                            <div className="divide-y divide-border">
                                {section.items.map((item) => (
                                    <button
                                        key={item}
                                        className="w-full px-6 py-4 text-left text-sm text-foreground hover:bg-slate-50 transition-colors flex items-center justify-between group"
                                    >
                                        {item}
                                        <span className="text-muted group-hover:text-accent transition-colors">Edit</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
