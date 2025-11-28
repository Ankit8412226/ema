"use client";

import DashboardLayout from '@/components/DashboardLayout';

export default function AnalyticsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
                        <p className="text-muted">Performance metrics and claims insights.</p>
                    </div>
                    <select className="px-4 py-2 border border-border rounded-lg text-sm bg-white">
                        <option>Last 30 Days</option>
                        <option>Last Quarter</option>
                        <option>Year to Date</option>
                    </select>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
                        <h3 className="text-sm font-medium text-muted mb-2">Total Claims</h3>
                        <p className="text-3xl font-bold text-foreground">1,248</p>
                        <span className="text-xs text-green-600 font-medium">↑ 12% vs last month</span>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
                        <h3 className="text-sm font-medium text-muted mb-2">Avg. Processing Time</h3>
                        <p className="text-3xl font-bold text-foreground">3.2 Days</p>
                        <span className="text-xs text-green-600 font-medium">↓ 0.5 days faster</span>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
                        <h3 className="text-sm font-medium text-muted mb-2">Auto-Approval Rate</h3>
                        <p className="text-3xl font-bold text-foreground">64%</p>
                        <span className="text-xs text-green-600 font-medium">↑ 5% increase</span>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
                        <h3 className="text-sm font-medium text-muted mb-2">Fraud Detected</h3>
                        <p className="text-3xl font-bold text-foreground">18</p>
                        <span className="text-xs text-red-600 font-medium">↑ 2 new cases</span>
                    </div>
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Volume Trend */}
                    <div className="bg-white p-6 rounded-xl border border-border shadow-sm h-80 flex flex-col">
                        <h3 className="text-lg font-medium text-foreground mb-6">Claims Volume Trend</h3>
                        <div className="flex-1 flex items-end justify-between gap-2 px-2">
                            {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 95].map((height, i) => (
                                <div key={i} className="w-full bg-accent/10 rounded-t-sm relative group hover:bg-accent/20 transition-colors" style={{ height: `${height}%` }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {height * 12}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-muted">
                            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                        </div>
                    </div>

                    {/* Claims by Type */}
                    <div className="bg-white p-6 rounded-xl border border-border shadow-sm h-80 flex flex-col">
                        <h3 className="text-lg font-medium text-foreground mb-4">Claims by Type</h3>
                        <div className="flex-1 flex items-center justify-center gap-8">
                            {/* Simple CSS Pie Chart representation */}
                            <div className="relative w-40 h-40 rounded-full bg-slate-100 border-8 border-slate-100"
                                style={{
                                    background: 'conic-gradient(#0EA5A4 0% 45%, #F59E0B 45% 70%, #EF4444 70% 85%, #64748B 85% 100%)'
                                }}>
                                <div className="absolute inset-0 m-8 bg-white rounded-full flex items-center justify-center shadow-inner">
                                    <span className="text-xl font-bold text-foreground">1.2k</span>
                                </div>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#0EA5A4]"></span>
                                    <span className="text-muted">Collision (45%)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#F59E0B]"></span>
                                    <span className="text-muted">Comprehensive (25%)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#EF4444]"></span>
                                    <span className="text-muted">Liability (15%)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#64748B]"></span>
                                    <span className="text-muted">Other (15%)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent High Value Claims */}
                    <div className="lg:col-span-2 bg-white border border-border rounded-xl shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-border flex justify-between items-center">
                            <h3 className="font-semibold text-foreground">Recent High Value Claims</h3>
                            <button
                                onClick={() => alert("Loading full claims report...\n\nGenerating CSV export...")}
                                className="text-accent text-sm font-medium hover:underline"
                            >
                                View All
                            </button>
                        </div>
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b border-border">
                                <tr>
                                    <th className="px-6 py-3 font-medium text-muted">Claim ID</th>
                                    <th className="px-6 py-3 font-medium text-muted">Type</th>
                                    <th className="px-6 py-3 font-medium text-muted">Amount</th>
                                    <th className="px-6 py-3 font-medium text-muted">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {[
                                    { id: 'CLM-2025-001', type: 'Collision', amount: '$12,450', status: 'Pending' },
                                    { id: 'CLM-2025-042', type: 'Liability', amount: '$45,000', status: 'Under Review' },
                                    { id: 'CLM-2025-089', type: 'Comprehensive', amount: '$8,200', status: 'Approved' },
                                    { id: 'CLM-2025-112', type: 'Collision', amount: '$15,600', status: 'SIU' },
                                ].map((claim) => (
                                    <tr key={claim.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-foreground">{claim.id}</td>
                                        <td className="px-6 py-4 text-muted">{claim.type}</td>
                                        <td className="px-6 py-4 font-medium text-foreground">{claim.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${claim.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                claim.status === 'SIU' ? 'bg-red-100 text-red-700' :
                                                    'bg-amber-100 text-amber-700'
                                                }`}>
                                                {claim.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Top Risk Factors */}
                    <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-border">
                            <h3 className="font-semibold text-foreground">Top Risk Factors</h3>
                        </div>
                        <div className="divide-y divide-border">
                            {[
                                { factor: 'Inconsistent Telematics', count: 142, trend: 'up' },
                                { factor: 'Prior Damage Detected', count: 98, trend: 'down' },
                                { factor: 'Staged Accident Indicators', count: 45, trend: 'up' },
                                { factor: 'Policy Recently Changed', count: 32, trend: 'stable' },
                                { factor: 'High Frequency Claimant', count: 28, trend: 'down' },
                            ].map((item, i) => (
                                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{item.factor}</p>
                                        <p className="text-xs text-muted">{item.count} detections</p>
                                    </div>
                                    <span className={`text-xs font-bold ${item.trend === 'up' ? 'text-red-600' :
                                        item.trend === 'down' ? 'text-green-600' :
                                            'text-slate-400'
                                        }`}>
                                        {item.trend === 'up' ? '↗' : item.trend === 'down' ? '↘' : '–'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
