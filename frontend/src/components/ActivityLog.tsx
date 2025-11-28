"use client";

import React from 'react';
import {
    CheckCircleIcon,
    ClockIcon,
    DocumentMagnifyingGlassIcon,
    EnvelopeIcon,
    PhoneIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const activities = [
    {
        id: 1,
        agent: 'Orchestrator',
        action: 'Claim Received & Triaged',
        time: '10:00 AM',
        status: 'completed',
        icon: CheckCircleIcon,
        details: 'Assigned to Auto-Adjudication workflow based on low severity.'
    },
    {
        id: 2,
        agent: 'Evidence Extractor',
        action: 'Analyzed Photos & Documents',
        time: '10:02 AM',
        status: 'completed',
        icon: DocumentMagnifyingGlassIcon,
        details: 'Extracted vehicle info, damage location (Rear Bumper), and license plate.'
    },
    {
        id: 3,
        agent: 'Policy Interpreter',
        action: 'Coverage Verification',
        time: '10:05 AM',
        status: 'completed',
        icon: CheckCircleIcon,
        details: 'Confirmed active Collision coverage. Deductible: $500.'
    },
    {
        id: 4,
        agent: 'Communication Bot',
        action: 'Sent Acknowledgment Email',
        time: '10:06 AM',
        status: 'completed',
        icon: EnvelopeIcon,
        details: 'Notified policyholder of claim receipt and next steps.'
    },
    {
        id: 5,
        agent: 'Fraud Detector',
        action: 'Risk Analysis',
        time: '10:08 AM',
        status: 'completed',
        icon: ExclamationTriangleIcon,
        details: 'Flagged minor inconsistency in incident time vs. telematics (Review needed).',
        isWarning: true
    },
    {
        id: 6,
        agent: 'Orchestrator',
        action: 'Waiting for Repair Estimate',
        time: 'Now',
        status: 'pending',
        icon: ClockIcon,
        details: 'Pending upload from partner garage.'
    }
];

export default function ActivityLog() {
    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Agent Activity</h3>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Active
                </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                {activities.map((activity, index) => (
                    <div key={activity.id} className="relative pl-8 group">
                        {/* Timeline Line */}
                        {index !== activities.length - 1 && (
                            <div className="absolute left-[11px] top-8 bottom-[-24px] w-0.5 bg-border group-hover:bg-accent/30 transition-colors"></div>
                        )}

                        {/* Icon */}
                        <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white z-10 
              ${activity.status === 'completed' ? 'border-accent text-accent' : 'border-muted text-muted'}
              ${activity.isWarning ? 'border-amber-500 text-amber-500' : ''}
            `}>
                            <activity.icon className="w-3.5 h-3.5" />
                        </div>

                        {/* Content */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <span className={`text-xs font-bold uppercase tracking-wider ${activity.isWarning ? 'text-amber-600' : 'text-accent'}`}>
                                    {activity.agent}
                                </span>
                                <span className="text-xs text-muted">{activity.time}</span>
                            </div>
                            <h4 className={`text-sm font-medium ${activity.status === 'pending' ? 'text-muted' : 'text-foreground'}`}>
                                {activity.action}
                            </h4>
                            <p className="text-xs text-muted mt-1 leading-relaxed">
                                {activity.details}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
