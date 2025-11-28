"use client";

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ChatInterface from '@/components/ChatInterface';
import ActivityLog from '@/components/ActivityLog';
import DocumentViewer from '@/components/DocumentViewer';
import { ReactFlow, Background, Controls, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

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
                        <button className="w-full py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium shadow-lg shadow-accent/20 transition-all mb-3">
                            Approve & Pay
                        </button>
                        <button className="w-full py-3 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-lg font-medium transition-all">
                            Reject Claim
                        </button>
                    </div>
                </div>

                {/* Center Column: Graph */}
                <div className="col-span-6 bg-secondary border border-border rounded-xl overflow-hidden relative shadow-inner">
                    <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur px-3 py-1 rounded-full border border-border shadow-sm">
                        <span className="text-xs font-medium text-muted">Evidence Graph</span>
                    </div>
                    <div className="h-full w-full">
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
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
                    <div className="flex-1 min-h-0 flex flex-col bg-white border border-border rounded-xl shadow-sm overflow-hidden">
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
        </DashboardLayout>
    );
}
