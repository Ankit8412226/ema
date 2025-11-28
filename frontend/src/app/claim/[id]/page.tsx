"use client";

import ActivityLog from '@/components/ActivityLog';
import ChatInterface from '@/components/ChatInterface';
import DashboardLayout from '@/components/DashboardLayout';
import DocumentViewer from '@/components/DocumentViewer';
import { addEdge, Background, Connection, Controls, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React from 'react';

const initialNodes = [
    { id: '1', position: { x: 250, y: 0 }, data: { label: 'Claim #CLM-2025-001' }, type: 'input', style: { background: '#FFFFFF', color: '#0F172A', border: '1px solid #0EA5A4', borderRadius: '8px', padding: '10px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' } },
    { id: '2', position: { x: 100, y: 100 }, data: { label: 'Photo: Rear Bumper' }, style: { background: '#FFFFFF', color: '#64748B', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' } },
    { id: '3', position: { x: 400, y: 100 }, data: { label: 'Policy: Collision' }, style: { background: '#FFFFFF', color: '#64748B', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' } },
    { id: '4', position: { x: 250, y: 200 }, data: { label: 'Agent: Evidence Extractor' }, style: { background: '#0EA5A4', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' } },
    { id: '5', position: { x: 400, y: 200 }, data: { label: 'Risk: Inconsistent Time' }, style: { background: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '10px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' } },
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#94A3B8' } },
    { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#94A3B8' } },
    { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#0EA5A4' } },
    { id: 'e1-5', source: '1', target: '5', animated: true, style: { stroke: '#FCA5A5', strokeDasharray: '5,5' } },
];

export default function ClaimOverview({ params }: { params: { id: string } }) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [isDocViewerOpen, setIsDocViewerOpen] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState<'activity' | 'chat'>('activity');
    const [claim, setClaim] = React.useState<any>(null);

    // Unwrap params using React.use() or just access it if it's already resolved in this Next.js version
    // Since this is a client component, we might need to use `useParams` from `next/navigation` if `params` prop isn't working as expected for dynamic routes in client components.
    // However, let's try to use the prop first, but typically client components in Next.js 13+ app dir don't receive params directly if they are pages.
    // Actually, page.tsx receives params.

    // Let's use useParams to be safe and standard for client components
    const { id } = React.use(params as any) as { id: string };

    const [modalOpen, setModalOpen] = React.useState(false);
    const [actionType, setActionType] = React.useState<'approve' | 'reject' | 'siu' | null>(null);
    const [rejectionReason, setRejectionReason] = React.useState('');

    const confirmAction = () => {
        if (actionType === 'approve') {
            setClaim({ ...claim, status: 'Approved' });
            alert('Payment Initiated via Stripe (Mock). Email sent to policyholder.');
        } else if (actionType === 'reject') {
            setClaim({ ...claim, status: 'Rejected' });
            alert(`Claim Rejected. Rejection letter drafted with reason: "${rejectionReason}"`);
        } else if (actionType === 'siu') {
            setClaim({ ...claim, status: 'SIU' });
            alert('Claim escalated to Special Investigations Unit (SIU). Fraud Agent notified.');
        }
        setModalOpen(false);
        setActionType(null);
        setRejectionReason('');
    };

    const onConnect = React.useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    React.useEffect(() => {
        if (id) {
            fetch(`http://localhost:8000/claims/${id}`)
                .then(res => res.json())
                .then(data => {
                    setClaim(data);
                    // Update graph node label
                    setNodes((nds) =>
                        nds.map((node) => {
                            if (node.id === '1') {
                                return { ...node, data: { ...node.data, label: `Claim #${data.id}` } };
                            }
                            return node;
                        })
                    );
                })
                .catch(err => console.error('Failed to fetch claim:', err));
        }
    }, [id, setNodes]);

    if (!claim) return <DashboardLayout><div>Loading...</div></DashboardLayout>;

    return (
        <DashboardLayout>
            <DocumentViewer
                isOpen={isDocViewerOpen}
                onClose={() => setIsDocViewerOpen(false)}
                documentUrl={claim?.documentUrl}
            />

            <div className="grid grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
                {/* Left Column: Meta */}
                <div className="col-span-3 space-y-6">
                    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-foreground mb-4">Claim Details</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-muted uppercase font-bold tracking-wider">Policy Holder</label>
                                <p className="text-foreground font-medium">{claim.policyHolder}</p>
                            </div>
                            <div>
                                <label className="text-xs text-muted uppercase font-bold tracking-wider">Vehicle</label>
                                <p className="text-foreground font-medium">{claim.vehicle}</p>
                            </div>
                            <div>
                                <label className="text-xs text-muted uppercase font-bold tracking-wider">Incident Date</label>
                                <p className="text-foreground font-medium">{claim.incidentDate}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsDocViewerOpen(true)}
                            className="w-full mt-6 py-2 bg-secondary hover:bg-slate-100 text-foreground rounded-lg border border-border transition-colors text-sm font-medium"
                        >
                            View Policy Doc
                        </button>
                    </div>

                    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-foreground mb-4">Actions</h3>

                        {claim.status === 'Approved' ? (
                            <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 text-center font-medium">
                                ✅ Claim Approved & Paid
                            </div>
                        ) : claim.status === 'Rejected' ? (
                            <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-center font-medium">
                                ❌ Claim Rejected
                            </div>
                        ) : claim.status === 'SIU' ? (
                            <div className="p-4 bg-amber-50 text-amber-700 rounded-lg border border-amber-200 text-center font-medium">
                                🕵️ Escalated to SIU
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <button
                                    onClick={() => { setActionType('approve'); setModalOpen(true); }}
                                    className="w-full py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium shadow-lg shadow-accent/20 transition-all"
                                >
                                    Approve & Pay
                                </button>

                                <button
                                    onClick={() => { setActionType('reject'); setModalOpen(true); }}
                                    className="w-full py-3 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-lg font-medium transition-all"
                                >
                                    Reject Claim
                                </button>

                                <button
                                    onClick={() => { setActionType('siu'); setModalOpen(true); }}
                                    className="w-full py-3 bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-100 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                                >
                                    <span>⚠️</span> Escalate to SIU
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Center Column: Graph */}
                <div className="col-span-6 bg-secondary border border-border rounded-xl overflow-hidden relative shadow-inner">
                    <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur px-3 py-1 rounded-full border border-border shadow-sm flex items-center gap-2">
                        <span className="text-xs font-medium text-muted">Evidence Graph</span>
                    </div>

                    {/* Add Evidence Button */}
                    <div className="absolute top-4 right-4 z-10">
                        <button
                            onClick={() => {
                                const id = (nodes.length + 1).toString();
                                const newNode = {
                                    id,
                                    position: { x: Math.random() * 400, y: Math.random() * 300 },
                                    data: { label: 'New Evidence' },
                                    style: { background: '#FFFFFF', color: '#64748B', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }
                                };
                                setNodes((nds) => nds.concat(newNode));
                            }}
                            className="bg-white hover:bg-slate-50 text-accent border border-border shadow-sm px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                        >
                            <span>+</span> Add Evidence
                        </button>
                    </div>

                    <div className="h-full w-full">
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            fitView
                        >
                            <Background color="#94A3B8" gap={20} />
                            <Controls className="bg-white border-border fill-foreground shadow-sm" />
                        </ReactFlow>
                    </div>
                </div>

                {/* Right Column: Chat & Summary */}
                <div className="col-span-3 flex flex-col gap-6 h-full overflow-hidden">
                    <div className="flex-shrink-0 bg-white border border-border rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-foreground mb-2">AI Summary</h3>
                        <p className="text-sm text-foreground leading-relaxed">
                            Based on the rear bumper damage and policy collision coverage, the claim appears valid. Deductible of $500 applies.
                        </p>

                        {/* Risk Factors */}
                        <div className="mt-4 pt-4 border-t border-border">
                            <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Risk Factors</h4>
                            <div className="flex items-start gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-100">
                                <span className="font-bold">⚠</span>
                                <span>Incident time varies from telematics data by 45 mins.</span>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-xs text-muted">Confidence</span>
                            <span className="text-lg font-bold text-green-600">86%</span>
                        </div>
                    </div>

                    {/* Tabs for Activity Log / Chat */}
                    <div className="flex-[3] min-h-0 flex flex-col bg-white border border-border rounded-xl shadow-sm overflow-hidden">
                        <div className="flex border-b border-border">
                            <button
                                onClick={() => setActiveTab('activity')}
                                className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'activity' ? 'bg-white text-accent border-b-2 border-accent' : 'bg-slate-50 text-muted hover:text-foreground'}`}
                            >
                                Agent Activity
                            </button>
                            <button
                                onClick={() => setActiveTab('chat')}
                                className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'chat' ? 'bg-white text-accent border-b-2 border-accent' : 'bg-slate-50 text-muted hover:text-foreground'}`}
                            >
                                EMA Assistant
                            </button>
                        </div>
                        <div className="flex-1 overflow-hidden relative">
                            {activeTab === 'activity' ? (
                                <div className="absolute inset-0 p-4 overflow-y-auto">
                                    <ActivityLog />
                                </div>
                            ) : (
                                <div className="absolute inset-0 flex flex-col">
                                    <ChatInterface />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className={`p-6 border-b ${actionType === 'approve' ? 'bg-accent/10 border-accent/20' :
                            actionType === 'reject' ? 'bg-red-50 border-red-100' :
                                'bg-amber-50 border-amber-100'
                            }`}>
                            <h3 className={`text-xl font-bold ${actionType === 'approve' ? 'text-accent' :
                                actionType === 'reject' ? 'text-red-700' :
                                    'text-amber-700'
                                }`}>
                                {actionType === 'approve' && 'Approve Claim'}
                                {actionType === 'reject' && 'Reject Claim'}
                                {actionType === 'siu' && 'Escalate to SIU'}
                            </h3>
                            <p className="text-sm text-muted mt-1">
                                {actionType === 'approve' && 'This will initiate the payment process.'}
                                {actionType === 'reject' && 'This will close the claim and notify the policyholder.'}
                                {actionType === 'siu' && 'This will flag the claim for fraud investigation.'}
                            </p>
                        </div>

                        <div className="p-6 space-y-4">
                            {actionType === 'approve' && (
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted">Claim Amount:</span>
                                        <span className="font-medium">$1,913.13</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted">Deductible:</span>
                                        <span className="font-medium text-red-500">-$500.00</span>
                                    </div>
                                    <div className="pt-3 border-t border-border flex justify-between text-lg font-bold">
                                        <span>Total Payout:</span>
                                        <span>$1,413.13</span>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-lg text-xs text-muted">
                                        Payment will be processed via Stripe Connect to the policyholder's registered bank account ending in •••• 4242.
                                    </div>
                                </div>
                            )}

                            {actionType === 'reject' && (
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Reason for Rejection</label>
                                    <textarea
                                        className="w-full p-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 min-h-[100px]"
                                        placeholder="Please provide a detailed reason..."
                                        value={rejectionReason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                    ></textarea>
                                </div>
                            )}

                            {actionType === 'siu' && (
                                <div className="space-y-3">
                                    <div className="p-3 bg-amber-50 text-amber-800 rounded-lg text-sm border border-amber-100">
                                        <p className="font-medium mb-1">⚠️ SIU Escalation Protocol</p>
                                        <p>Escalating this claim will freeze all payments and assign a Special Investigator. The policyholder will be notified that their claim is under review.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Suspicion Notes (Optional)</label>
                                        <textarea
                                            className="w-full p-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 min-h-[80px]"
                                            placeholder="Describe the suspicious activity..."
                                        ></textarea>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t border-border bg-slate-50 flex justify-end gap-3">
                            <button
                                onClick={() => { setModalOpen(false); setRejectionReason(''); }}
                                className="px-4 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmAction}
                                className={`px-6 py-2 text-sm font-medium text-white rounded-lg shadow-lg transition-all ${actionType === 'approve' ? 'bg-accent hover:bg-accent-hover shadow-accent/20' :
                                    actionType === 'reject' ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20' :
                                        'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
                                    }`}
                            >
                                Confirm {actionType === 'approve' ? 'Payment' : actionType === 'reject' ? 'Rejection' : 'Escalation'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
