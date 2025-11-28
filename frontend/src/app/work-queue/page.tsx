"use client";

import DashboardLayout from '@/components/DashboardLayout';

export default function WorkQueuePage() {
    const tasks = [
        { id: 'TSK-101', type: 'Review', title: 'Review Estimate for CLM-2025-001', priority: 'High', due: 'Today', status: 'Pending' },
        { id: 'TSK-102', type: 'Approval', title: 'Approve Payment for CLM-2024-892', priority: 'Medium', due: 'Tomorrow', status: 'In Progress' },
        { id: 'TSK-103', type: 'Doc Check', title: 'Verify Medical Report for CLM-2025-003', priority: 'High', due: 'Today', status: 'Pending' },
        { id: 'TSK-104', type: 'Call', title: 'Call Policyholder for CLM-2024-998', priority: 'Low', due: 'Next Week', status: 'Scheduled' },
        { id: 'TSK-105', type: 'Review', title: 'Final Review for CLM-2024-900', priority: 'Medium', due: 'Tomorrow', status: 'Pending' },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">My Work Queue</h1>
                        <p className="text-muted">Prioritized tasks and claims requiring your attention.</p>
                    </div>
                    <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors font-medium">
                        + New Task
                    </button>
                </div>

                <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-border">
                            <tr>
                                <th className="px-6 py-3 font-medium text-muted">Task ID</th>
                                <th className="px-6 py-3 font-medium text-muted">Type</th>
                                <th className="px-6 py-3 font-medium text-muted">Title</th>
                                <th className="px-6 py-3 font-medium text-muted">Priority</th>
                                <th className="px-6 py-3 font-medium text-muted">Due Date</th>
                                <th className="px-6 py-3 font-medium text-muted">Status</th>
                                <th className="px-6 py-3 font-medium text-muted">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {tasks.map((task) => (
                                <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-foreground">{task.id}</td>
                                    <td className="px-6 py-4 text-muted">{task.type}</td>
                                    <td className="px-6 py-4 text-foreground">{task.title}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${task.priority === 'High' ? 'bg-red-100 text-red-700' :
                                            task.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                                                'bg-blue-100 text-blue-700'
                                            }`}>
                                            {task.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-muted">{task.due}</td>
                                    <td className="px-6 py-4 text-muted">{task.status}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => alert(`Starting task ${task.id}: ${task.title}\n\nOpening task workspace...`)}
                                            className="text-accent hover:text-accent-hover font-medium"
                                        >
                                            Start
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
