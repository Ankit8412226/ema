"use client";

import DashboardLayout from '@/components/DashboardLayout';

export default function SettingsPage() {
    return (
        <DashboardLayout>
            <div className="max-w-2xl space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Settings</h1>
                    <p className="text-muted">Manage your account and application preferences.</p>
                </div>

                <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border">
                        <h3 className="font-semibold text-foreground mb-1">Profile Information</h3>
                        <p className="text-sm text-muted">Update your personal details.</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">First Name</label>
                                <input type="text" defaultValue="John" className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Last Name</label>
                                <input type="text" defaultValue="Smith" className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                            <input type="email" defaultValue="john.smith@ema-insurance.com" className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">Role</label>
                            <input type="text" defaultValue="Senior Claims Adjuster" disabled className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-slate-50 text-muted" />
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-slate-50 border-t border-border flex justify-end">
                        <button className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors">
                            Save Changes
                        </button>
                    </div>
                </div>

                <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border">
                        <h3 className="font-semibold text-foreground mb-1">Notifications</h3>
                        <p className="text-sm text-muted">Control how you receive alerts.</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-medium text-foreground">Email Notifications</h4>
                                <p className="text-xs text-muted">Receive daily summaries and critical alerts.</p>
                            </div>
                            <input type="checkbox" defaultChecked className="toggle" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-medium text-foreground">Desktop Push Notifications</h4>
                                <p className="text-xs text-muted">Real-time alerts for new claims.</p>
                            </div>
                            <input type="checkbox" defaultChecked className="toggle" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-medium text-foreground">Weekly Reports</h4>
                                <p className="text-xs text-muted">Receive weekly performance analytics.</p>
                            </div>
                            <input type="checkbox" className="toggle" />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
