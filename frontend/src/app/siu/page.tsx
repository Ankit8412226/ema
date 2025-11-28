"use client";

import DashboardLayout from '@/components/DashboardLayout';

export default function SIUPage() {
    const cases = [
        { id: 'SIU-2025-001', claimId: 'CLM-2025-001', type: 'Staged Accident', riskScore: 92, investigator: 'Agent Mulder', status: 'Open' },
        { id: 'SIU-2025-002', claimId: 'CLM-2024-888', type: 'Inflated Damages', riskScore: 78, investigator: 'Agent Scully', status: 'Investigating' },
        { id: 'SIU-2025-003', claimId: 'CLM-2024-912', type: 'Identity Theft', riskScore: 85, investigator: 'Unassigned', status: 'New' },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">SIU / Fraud Investigation</h1>
                        <p className="text-muted">Special Investigations Unit cases and fraud alerts.</p>
                    </div>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium border border-red-200">
                            High Risk Cases: 3
                        </span>
                    </div>
                </div>

                <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-border">
                            <tr>
                                <th className="px-6 py-3 font-medium text-muted">Case ID</th>
                                <th className="px-6 py-3 font-medium text-muted">Related Claim</th>
                                <th className="px-6 py-3 font-medium text-muted">Fraud Type</th>
                                <th className="px-6 py-3 font-medium text-muted">Risk Score</th>
                                <th className="px-6 py-3 font-medium text-muted">Investigator</th>
                                <th className="px-6 py-3 font-medium text-muted">Status</th>
                                <th className="px-6 py-3 font-medium text-muted">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {cases.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-foreground">{item.id}</td>
                                    <td className="px-6 py-4 text-accent hover:underline cursor-pointer">{item.claimId}</td>
                                    <td className="px-6 py-4 text-foreground">{item.type}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${item.riskScore > 80 ? 'bg-red-500' : 'bg-amber-500'}`}
                                                    style={{ width: `${item.riskScore}%` }}
                                                ></div>
                                            </div>
                                            <span className={`font-bold ${item.riskScore > 80 ? 'text-red-600' : 'text-amber-600'}`}>{item.riskScore}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted">{item.investigator}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => alert(`Opening SIU Case ${item.id}\n\nRisk Score: ${item.riskScore}\nInvestigator: ${item.investigator}\n\nLoading case files...`)}
                                            className="text-accent hover:text-accent-hover font-medium"
                                        >
                                            Investigate
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
