"use client";
import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface NewClaimModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (claimData: any) => void;
}

import { supabase } from '../lib/supabaseClient';

export default function NewClaimModal({ isOpen, onClose, onSubmit }: NewClaimModalProps) {
    const [formData, setFormData] = useState({
        policyHolder: '',
        vehicle: '',
        incidentDate: new Date().toISOString().split('T')[0],
        description: ''
    });
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        let documentUrl = null;

        if (file) {
            try {
                // Sanitize filename to avoid issues
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

                // Try uploading to 'documents' bucket first, fallback to 'public' if needed
                // Note: You must create a public bucket named 'documents' in Supabase dashboard
                const { error: uploadError } = await supabase.storage
                    .from('documents')
                    .upload(fileName, file);

                if (uploadError) {
                    console.error('Supabase upload error:', uploadError);
                    // Don't throw, just log and continue without URL
                } else {
                    const { data } = supabase.storage
                        .from('documents')
                        .getPublicUrl(fileName);

                    documentUrl = data.publicUrl;
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                // Don't block claim creation
            }
        }

        // Simulate "AI Processing" delay for effect
        await new Promise(resolve => setTimeout(resolve, 800));

        onSubmit({
            policyHolder: formData.policyHolder,
            vehicle: formData.vehicle,
            incidentDate: formData.incidentDate,
            status: 'Needs Review',
            severity: 'Medium',
            confidence: 85,
            documentUrl: documentUrl
        });
        setIsSubmitting(false);
        onClose();
        // Reset form
        setFormData({
            policyHolder: '',
            vehicle: '',
            incidentDate: new Date().toISOString().split('T')[0],
            description: ''
        });
        setFile(null);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-slate-50">
                    <h2 className="text-lg font-bold text-foreground">New Claim (FNOL)</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <XMarkIcon className="w-5 h-5 text-muted" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Policy Holder</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground"
                            placeholder="e.g. John Doe"
                            value={formData.policyHolder}
                            onChange={e => setFormData({ ...formData, policyHolder: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Vehicle Info</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground"
                            placeholder="e.g. 2023 Tesla Model Y"
                            value={formData.vehicle}
                            onChange={e => setFormData({ ...formData, vehicle: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Incident Date</label>
                        <input
                            type="date"
                            required
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground"
                            value={formData.incidentDate}
                            onChange={e => setFormData({ ...formData, incidentDate: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Incident Description</label>
                        <textarea
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 h-24 resize-none text-foreground"
                            placeholder="Describe what happened..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Upload Documents (Invoice/Photos)</label>
                        <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer relative ${file ? 'border-accent bg-accent/5' : 'border-border hover:bg-slate-50'}`}>
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setFile(e.target.files[0]);
                                    }
                                }}
                            />
                            <div className="text-sm text-muted">
                                {file ? (
                                    <div className="flex items-center justify-center gap-2 text-accent font-medium">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {file.name}
                                    </div>
                                ) : (
                                    <>
                                        <span className="text-accent font-medium">Click to upload</span> or drag and drop
                                        <p className="text-xs mt-1">PDF, JPG, PNG (Max 10MB)</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium shadow-lg shadow-accent/20 transition-all disabled:opacity-70 flex justify-center items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    {file ? 'Uploading & Processing...' : 'Processing...'}
                                </>
                            ) : 'Create Claim'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
