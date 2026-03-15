import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText, Calendar, ExternalLink, Settings as SettingsIcon } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <AdminLayout>
            <main className="p-8">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
                        <Link to="/" target="_blank" className="flex items-center gap-2 text-primary hover:underline font-medium">
                            View Website <ExternalLink size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/admin/blogs")}>
                            <CardHeader>
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-2">
                                    <FileText size={24} />
                                </div>
                                <CardTitle>Blog Posts</CardTitle>
                                <CardDescription>Create, edit, and delete your blog articles.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full">Manage Blogs</Button>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/admin/events")}>
                            <CardHeader>
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-2">
                                    <Calendar size={24} />
                                </div>
                                <CardTitle>Events</CardTitle>
                                <CardDescription>Manage your upcoming events and news releases.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full">Manage Events</Button>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/admin/settings")}>
                            <CardHeader>
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-2">
                                    <SettingsIcon size={24} />
                                </div>
                                <CardTitle>Settings</CardTitle>
                                <CardDescription>Update your admin login email and password.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full">Account Settings</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </AdminLayout>
    );
};

export default Dashboard;
