"use client";

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { ChartBarIcon, ArrowTrendingUpIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const stats = [
    { name: 'Total Claims', value: '1,248', change: '+12%', icon: ChartBarIcon, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Avg. Processing Time', value: '2.4 days', change: '-18%', icon: ClockIcon, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'Auto-Approval Rate', value: '64%', change: '+5%', icon: CheckCircleIcon, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Cost Savings', value: '$142k', change: '+8%', icon: ArrowTrendingUpIcon, color: 'text-accent', bg: 'bg-accent/10' },
];

export default function AnalyticsPage() {
    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Overview</h1>
                    <p className="text-muted">Performance metrics for the last 30 days.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div key={stat.name} className="bg-white p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.bg}`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-green-600'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                            <p className="text-sm text-muted">{stat.name}</p>
                        </div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Claims Volume Chart */}
                    <div className="bg-white p-6 rounded-xl border border-border shadow-sm h-80 flex flex-col">
                        <h3 className="text-lg font-semibold text-foreground mb-6">Claims Volume</h3>
                        <div className="flex-1 flex items-end gap-4 px-4">
                            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                <div key={i} className="flex-1 h-full bg-accent/20 rounded-t-lg relative group">
                                    <div
                                        className="absolute bottom-0 w-full bg-accent rounded-t-lg transition-all duration-500 group-hover:bg-accent-hover"
                                        style={{ height: `${h}%` }}
                                    ></div>
                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-white text-xs py-1 px-2 rounded transition-opacity">
                                        {h}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-xs text-muted">
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                    </div>

                    {/* Claim Types Donut Chart */}
                    <div className="bg-white p-6 rounded-xl border border-border shadow-sm h-80">
                        <h3 className="text-lg font-semibold text-foreground mb-6">Claim Types</h3>
                        <div className="flex items-center justify-center h-full pb-6 gap-8">
                            <div className="w-48 h-48 rounded-full border-[16px] border-slate-100 border-t-accent border-r-purple-500 border-b-blue-500 relative">
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className="text-2xl font-bold text-foreground">1.2k</span>
                                    <span className="text-xs text-muted">Total</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-accent"></div>
                                    <span className="text-sm text-foreground">Collision (45%)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                                    <span className="text-sm text-foreground">Comprehensive (30%)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                    <span className="text-sm text-foreground">Liability (25%)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Processing Time Trend */}
                    <div className="bg-white p-6 rounded-xl border border-border shadow-sm h-80 flex flex-col">
                        <h3 className="text-lg font-semibold text-foreground mb-6">Processing Time Trend</h3>
                        <div className="flex-1 flex items-end gap-2 px-2">
                            {[3.2, 3.0, 2.8, 2.9, 2.5, 2.4, 2.1, 2.3, 2.0, 1.8].map((h, i) => (
                                <div key={i} className="flex-1 h-full bg-purple-100 rounded-t-lg relative group">
                                    <div
                                        className="absolute bottom-0 w-full bg-purple-500 rounded-t-lg transition-all duration-500 group-hover:bg-purple-600"
                                        style={{ height: `${(h / 4) * 100}%` }}
                                    ></div>
                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-white text-xs py-1 px-2 rounded transition-opacity whitespace-nowrap">
                                        {h} days
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-xs text-muted">
                            <span>Week 1</span><span>Week 10</span>
                        </div>
                    </div>

                    {/* Agent Performance */}
                    <div className="bg-white p-6 rounded-xl border border-border shadow-sm h-80 overflow-y-auto">
                        <h3 className="text-lg font-semibold text-foreground mb-4">Agent Performance</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Evidence Extractor', accuracy: 98, speed: '1.2s' },
                                { name: 'Policy Interpreter', accuracy: 95, speed: '0.8s' },
                                { name: 'Rationale Generator', accuracy: 92, speed: '2.1s' },
                                { name: 'Vision Analysis', accuracy: 89, speed: '3.5s' },
                                { name: 'Fraud Detector', accuracy: 99, speed: '0.5s' },
                            ].map((agent) => (
                                <div key={agent.name} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                                    <div>
                                        <p className="font-medium text-foreground">{agent.name}</p>
                                        <p className="text-xs text-muted">Avg Speed: {agent.speed}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-green-600">{agent.accuracy}%</p>
                                        <p className="text-xs text-muted">Accuracy</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
