import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { LayoutDashboard, FileText, Calendar, LogOut, Settings as SettingsIcon } from "lucide-react";

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/");
    };

    const navItems = [
        { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
        { label: "Manage Blogs", icon: FileText, path: "/admin/blogs" },
        { label: "Manage Events", icon: Calendar, path: "/admin/events" },
        { label: "Settings", icon: SettingsIcon, path: "/admin/settings" },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-xl font-bold font-serif text-primary">Joe Cappello Admin</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                location.pathname === item.path
                                    ? "text-primary bg-gray-100 font-medium"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <Button variant="ghost" className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
                        <LogOut size={20} />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Mobile Nav Top Bar (optional, for better consistency) */}
            <div className="flex-1 md:ml-64">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
