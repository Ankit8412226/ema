"use client";

import DashboardLayout from '@/components/DashboardLayout';

export default function PoliciesPage() {
    const policies = [
        { id: 'POL-99821', holder: 'John Doe', type: 'Auto - Comprehensive', status: 'Active', premium: '$1,200/yr', renewal: 'Oct 2025' },
        { id: 'POL-99822', holder: 'Jane Smith', type: 'Homeowners', status: 'Active', premium: '$2,400/yr', renewal: 'Nov 2025' },
        { id: 'POL-99823', holder: 'Acme Corp', type: 'Commercial Liability', status: 'Active', premium: '$15,000/yr', renewal: 'Jan 2026' },
        { id: 'POL-99824', holder: 'Robert Johnson', type: 'Auto - Collision', status: 'Lapsed', premium: '$900/yr', renewal: 'Sep 2024' },
        { id: 'POL-99825', holder: 'Emily Davis', type: 'Renters', status: 'Active', premium: '$250/yr', renewal: 'Mar 2025' },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Policy Administration</h1>
                        <p className="text-muted">Manage and review insurance policies.</p>
                    </div>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            placeholder="Search policies..."
                            className="px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                        />
                        <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors font-medium">
                            + New Policy
                        </button>
                    </div>
                </div>

                <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-border">
                            <tr>
                                <th className="px-6 py-3 font-medium text-muted">Policy Number</th>
                                <th className="px-6 py-3 font-medium text-muted">Policy Holder</th>
                                <th className="px-6 py-3 font-medium text-muted">Type</th>
                                <th className="px-6 py-3 font-medium text-muted">Status</th>
                                <th className="px-6 py-3 font-medium text-muted">Premium</th>
                                <th className="px-6 py-3 font-medium text-muted">Renewal Date</th>
                                <th className="px-6 py-3 font-medium text-muted">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {policies.map((policy) => (
                                <tr key={policy.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-foreground">{policy.id}</td>
                                    <td className="px-6 py-4 text-foreground">{policy.holder}</td>
                                    <td className="px-6 py-4 text-muted">{policy.type}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${policy.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {policy.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-muted">{policy.premium}</td>
                                    <td className="px-6 py-4 text-muted">{policy.renewal}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => alert(`Opening Policy ${policy.id}\n\nHolder: ${policy.holder}\nPremium: ${policy.premium}\nStatus: ${policy.status}`)}
                                            className="text-accent hover:text-accent-hover font-medium"
                                        >
                                            View
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
