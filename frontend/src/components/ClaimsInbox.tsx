"use client";

import React, { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

import NewClaimModal from './NewClaimModal';

const ClaimsInbox: React.FC = () => {
    const [claims, setClaims] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    React.useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:8000/claims')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch claims');
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setClaims(data);
                } else {
                    console.error('Data is not an array:', data);
                    setClaims([]);
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch claims:', err);
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    const handleCreateClaim = async (claimData: any) => {
        const newClaim = {
            id: `CLM-2025-00${claims.length + 1}`,
            ...claimData
        };

        try {
            const res = await fetch('http://localhost:8000/claims', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newClaim)
            });

            if (res.ok) {
                const savedClaim = await res.json();
                setClaims([savedClaim, ...claims]);
            }
        } catch (err) {
            console.error('Failed to create claim:', err);
        }
    };

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-foreground">Claims Inbox</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-3 py-1.5 bg-accent hover:bg-accent-hover text-white text-xs font-medium rounded-lg transition-colors shadow-sm flex items-center gap-1"
                >
                    <span>+</span> New Claim
                </button>
            </div>

            <NewClaimModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateClaim}
            />

            <div className="grid gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1 content-start">
                {isLoading && (
                    <div className="flex justify-center py-8">
                        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center py-8 text-red-500 text-sm">
                        Failed to load claims. <br />
                        <button onClick={() => window.location.reload()} className="underline mt-2">Retry</button>
                    </div>
                )}

                {!isLoading && !error && claims.length === 0 && (
                    <div className="text-center py-8 text-muted text-sm">
                        No claims found.
                    </div>
                )}

                {!isLoading && !error && claims.map((claim) => (
                    <a
                        key={claim.id}
                        href={`/claim/${claim.id}`}
                        className="group bg-white border border-border rounded-xl p-4 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(14,165,164,0.1)] transition-all cursor-pointer flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-muted group-hover:text-foreground transition-colors">
                                {claim.policyHolder.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-foreground font-medium text-sm">{claim.policyHolder}</h3>
                                <p className="text-xs text-muted">{claim.vehicle} • {claim.id}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right hidden xl:block">
                                <p className="text-[10px] text-muted uppercase tracking-wider">Confidence</p>
                                <p className={`font-bold text-sm ${claim.confidence > 90 ? 'text-green-600' : 'text-amber-500'}`}>
                                    {claim.confidence}%
                                </p>
                            </div>

                            <div className="text-right min-w-[90px]">
                                <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold border ${claim.status === 'Needs Review' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                                    claim.status === 'Approved' ? 'bg-green-50 text-green-600 border-green-200' :
                                        'bg-blue-50 text-blue-600 border-blue-200'
                                    }`}>
                                    {claim.status}
                                </span>
                            </div>

                            <ChevronRightIcon className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ClaimsInbox;
