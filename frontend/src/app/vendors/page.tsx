"use client";

import DashboardLayout from '@/components/DashboardLayout';

export default function VendorsPage() {
    const vendors = [
        { id: 'VND-001', name: 'Joe\'s Auto Body', type: 'Repair Shop', rating: 4.8, location: 'Springfield, IL', status: 'Preferred' },
        { id: 'VND-002', name: 'City Towing Co.', type: 'Towing', rating: 4.2, location: 'Chicago, IL', status: 'Active' },
        { id: 'VND-003', name: 'Elite Glass Repair', type: 'Glass Specialist', rating: 4.9, location: 'Naperville, IL', status: 'Preferred' },
        { id: 'VND-004', name: 'Rapid Rental Cars', type: 'Rental', rating: 3.5, location: 'Peoria, IL', status: 'Under Review' },
        { id: 'VND-005', name: 'MediCare Clinics', type: 'Medical Provider', rating: 4.5, location: 'Springfield, IL', status: 'Active' },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Vendor Network</h1>
                        <p className="text-muted">Manage approved vendors and service providers.</p>
                    </div>
                    <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors font-medium">
                        + Add Vendor
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vendors.map((vendor) => (
                        <div key={vendor.id} className="bg-white border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-semibold text-lg text-foreground">{vendor.name}</h3>
                                    <p className="text-sm text-muted">{vendor.type}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${vendor.status === 'Preferred' ? 'bg-green-100 text-green-700' :
                                    vendor.status === 'Under Review' ? 'bg-amber-100 text-amber-700' :
                                        'bg-slate-100 text-slate-700'
                                    }`}>
                                    {vendor.status}
                                </span>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted">Rating:</span>
                                    <span className="font-medium text-amber-500">★ {vendor.rating}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted">Location:</span>
                                    <span className="text-foreground">{vendor.location}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted">Vendor ID:</span>
                                    <span className="text-foreground">{vendor.id}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => alert(`Vendor Profile: ${vendor.name}\n\nRating: ${vendor.rating} stars\nLocation: ${vendor.location}\nStatus: ${vendor.status}`)}
                                className="w-full mt-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                            >
                                View Profile
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
