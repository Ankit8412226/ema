"use client";

import React from 'react';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface DocumentViewerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DocumentViewer({ isOpen, onClose, documentUrl }: DocumentViewerProps & { documentUrl?: string }) {
    const [isAnalyzing, setIsAnalyzing] = React.useState(false);
    const [analysisResult, setAnalysisResult] = React.useState<any>(null);

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        try {
            // Extract text from the "mock" document to send to the backend
            const documentText = `
        JOE'S AUTO BODY Inv #99283
        Bill To: Alice Johnson, 123 Maple Ave
        Date: Nov 21, 2025
        
        Description                 Cost
        Rear Bumper Cover (OEM)     $850.00
        Paint & Labor (3.5 hrs)     $420.00
        Shop Supplies               $45.00
        
        TOTAL                       $1,315.00
      `;

            const response = await fetch('http://localhost:8000/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: documentText }),
            });

            const data = await response.json();
            setAnalysisResult(data);
        } catch (error) {
            console.error('Analysis failed:', error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-slate-50">
                    <div>
                        <h2 className="text-lg font-bold text-foreground">Smart Document Analysis</h2>
                        <p className="text-sm text-muted">
                            {documentUrl ? 'Uploaded Document' : 'Repair_Estimate_v2.pdf'} • Processed by Evidence Extractor
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                    >
                        <XMarkIcon className="w-6 h-6 text-muted" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 flex min-h-0">

                    {/* Left: Document Preview */}
                    <div className="w-1/2 bg-slate-800 p-8 overflow-y-auto flex justify-center">
                        {documentUrl ? (
                            <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
                                <iframe
                                    src={documentUrl}
                                    className="w-full h-full"
                                    title="Document Preview"
                                />
                            </div>
                        ) : (
                            <div className="bg-white w-full max-w-lg min-h-[800px] shadow-lg p-8 text-xs text-slate-800 font-mono space-y-4 relative">
                                {/* Mock Document Content (Keep existing mock as fallback) */}
                                <div className="flex justify-between border-b pb-4 mb-4">
                                    <span className="font-bold text-lg">JOE'S AUTO BODY</span>
                                    <span>Inv #99283</span>
                                </div>
                                {/* ... rest of mock content ... */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div>
                                        <p className="font-bold">Bill To:</p>
                                        <p>Alice Johnson</p>
                                        <p>123 Maple Ave</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold">Date:</p>
                                        <p>Nov 21, 2025</p>
                                    </div>
                                </div>

                                <table className="w-full text-left">
                                    <thead className="border-b">
                                        <tr>
                                            <th className="py-2">Description</th>
                                            <th className="py-2 text-right">Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        <tr>
                                            <td className="py-2 relative">
                                                Rear Bumper Cover (OEM)
                                                <div className="absolute inset-0 bg-accent/10 border border-accent/30 rounded pointer-events-none"></div>
                                            </td>
                                            <td className="py-2 text-right">$850.00</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2">Paint & Labor (3.5 hrs)</td>
                                            <td className="py-2 text-right">$420.00</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2">Shop Supplies</td>
                                            <td className="py-2 text-right">$45.00</td>
                                        </tr>
                                    </tbody>
                                    <tfoot className="font-bold border-t">
                                        <tr>
                                            <td className="py-4">TOTAL</td>
                                            <td className="py-4 text-right relative">
                                                $1,315.00
                                                <div className="absolute inset-0 -m-1 bg-accent/10 border border-accent/30 rounded pointer-events-none"></div>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>

                                <div className="absolute bottom-8 left-8 right-8 text-center text-slate-400 text-[10px]">
                                    Page 1 of 1
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Extracted Data */}
                    <div className="w-1/2 bg-white p-6 overflow-y-auto border-l border-border">
                        <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-6">Extracted Structured Data</h3>

                        {!analysisResult ? (
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <p className="text-muted mb-4">Click analyze to process this document with AI.</p>
                                <button
                                    onClick={handleAnalyze}
                                    disabled={isAnalyzing}
                                    className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium shadow-lg shadow-accent/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Analyzing...
                                        </>
                                    ) : (
                                        'Analyze with AI'
                                    )}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="group p-4 rounded-lg border border-accent/20 bg-accent/5 hover:bg-accent/10 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-foreground">Line Items</span>
                                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                                    </div>
                                    <pre className="text-xs text-slate-600 font-mono bg-white p-3 rounded border border-border overflow-x-auto">
                                        {JSON.stringify(analysisResult.line_items, null, 2)}
                                    </pre>
                                </div>

                                <div className="group p-4 rounded-lg border border-accent/20 bg-accent/5 hover:bg-accent/10 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-foreground">Total Amount</span>
                                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl font-bold text-foreground">${analysisResult.total_amount}</span>
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                            Confidence: {(analysisResult.confidence_score * 100).toFixed(0)}%
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 rounded-lg border border-border bg-slate-50">
                                    <h4 className="text-sm font-semibold text-foreground mb-2">Risk Analysis</h4>
                                    {analysisResult.risk_factors && analysisResult.risk_factors.length > 0 ? (
                                        <ul className="space-y-2 text-sm">
                                            {analysisResult.risk_factors.map((risk: string, i: number) => (
                                                <li key={i} className="flex items-center gap-2 text-amber-600">
                                                    <span className="font-bold">⚠</span>
                                                    {risk}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-green-600 flex items-center gap-2">
                                            <CheckCircleIcon className="w-4 h-4" /> No risks detected.
                                        </p>
                                    )}
                                </div>

                                <div className="mt-8 pt-6 border-t border-border">
                                    <button
                                        onClick={() => {
                                            alert("Estimate Approved! Payment scheduled for $1,315.00");
                                            onClose();
                                        }}
                                        className="w-full py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium shadow-lg shadow-accent/20 transition-all"
                                    >
                                        Approve Estimate
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
