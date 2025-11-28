"use client";

import DashboardLayout from '@/components/DashboardLayout';

export default function KnowledgeBasePage() {
    const articles = [
        { id: 1, title: 'Claims Handling Guidelines 2025', category: 'Procedures', views: 1240, lastUpdated: '2 days ago' },
        { id: 2, title: 'Understanding Auto Policy Coverage Limits', category: 'Policy', views: 850, lastUpdated: '1 week ago' },
        { id: 3, title: 'Using the EMA AI Assistant Effectively', category: 'Tools', views: 2100, lastUpdated: '3 days ago' },
        { id: 4, title: 'Fraud Detection Indicators', category: 'SIU', views: 560, lastUpdated: '1 month ago' },
        { id: 5, title: 'Vendor Network Contact List', category: 'Resources', views: 3400, lastUpdated: 'Yesterday' },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Knowledge Base</h1>
                        <p className="text-muted">Internal documentation, guides, and resources.</p>
                    </div>
                </div>

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for articles, guides, or policies..."
                        className="w-full px-6 py-4 border border-border rounded-xl shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                    <button className="absolute right-3 top-3 px-4 py-1.5 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors">
                        Search
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <span className="text-2xl mb-3 block">📘</span>
                        <h3 className="font-semibold text-foreground mb-1">Standard Operating Procedures</h3>
                        <p className="text-sm text-muted">Official guidelines for claims processing.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <span className="text-2xl mb-3 block">⚖️</span>
                        <h3 className="font-semibold text-foreground mb-1">Legal & Compliance</h3>
                        <p className="text-sm text-muted">Regulatory requirements and state laws.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <span className="text-2xl mb-3 block">🎓</span>
                        <h3 className="font-semibold text-foreground mb-1">Training Materials</h3>
                        <p className="text-sm text-muted">Onboarding and continuous learning.</p>
                    </div>
                </div>

                <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-border">
                        <h3 className="font-semibold text-foreground">Popular Articles</h3>
                    </div>
                    <div className="divide-y divide-border">
                        {articles.map((article) => (
                            <div
                                key={article.id}
                                onClick={() => alert(`Opening Article: ${article.title}\n\nCategory: ${article.category}\nLast Updated: ${article.lastUpdated}`)}
                                className="px-6 py-4 flex justify-between items-center hover:bg-slate-50 transition-colors cursor-pointer"
                            >
                                <div>
                                    <h4 className="text-sm font-medium text-foreground hover:text-accent">{article.title}</h4>
                                    <div className="flex gap-3 mt-1">
                                        <span className="text-xs text-muted bg-slate-100 px-2 py-0.5 rounded">{article.category}</span>
                                        <span className="text-xs text-muted">Updated {article.lastUpdated}</span>
                                    </div>
                                </div>
                                <span className="text-xs text-muted">{article.views} views</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
