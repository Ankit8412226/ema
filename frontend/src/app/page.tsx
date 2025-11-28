import DashboardLayout from '@/components/DashboardLayout';
import ClaimsInbox from '@/components/ClaimsInbox';

export default function Home() {
    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, John</h1>
                    <p className="text-muted">You have 3 high-priority claims to review today.</p>
                </div>
                <ClaimsInbox />
            </div>
        </DashboardLayout>
    );
}
