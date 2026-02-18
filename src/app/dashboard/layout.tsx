import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Sidebar (Desktop) */}
            <div className="hidden md:block w-64 shrink-0">
                <Sidebar />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden p-6 md:p-8 relative">
                {/* Mobile Header Placeholder (Can implement actual MobileNav later) */}
                <div className="md:hidden mb-6 flex items-center justify-between">
                    <span className="font-bold text-lg">ElevePic Dashboard</span>
                    {/* Menu Button would go here */}
                </div>

                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
