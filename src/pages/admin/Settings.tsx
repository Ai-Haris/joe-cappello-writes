import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Settings as SettingsIcon, ShieldCheck, Mail, Lock } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

const Settings = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user?.email) {
                setEmail(session.user.email);
            }
        };
        getSession();
    }, []);

    const handleUpdateEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEmail) return;

        setLoading(true);
        const { error } = await supabase.auth.updateUser({ email: newEmail });
        setLoading(false);

        if (error) {
            toast({
                title: "Error updating email",
                description: error.message,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Email update initiated",
                description: "Professional tip: Check your new email for a confirmation link.",
            });
            setNewEmail("");
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast({
                title: "Passwords do not match",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.updateUser({ password });
        setLoading(false);

        if (error) {
            toast({
                title: "Error updating password",
                description: error.message,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Password updated successfully",
                description: "Your login credentials have been refined.",
            });
            setPassword("");
            setConfirmPassword("");
        }
    };

    return (
        <AdminLayout>
            <main className="p-8">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                            <SettingsIcon size={24} />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight">Admin Settings</h2>
                    </div>

                    <div className="grid gap-8">
                        {/* Email Section */}
                        <Card className="border-none shadow-xl">
                            <CardHeader>
                                <div className="flex items-center gap-2 text-primary mb-1">
                                    <Mail size={18} />
                                    <span className="text-sm font-semibold uppercase tracking-wider">Authentication</span>
                                </div>
                                <CardTitle>Login Email</CardTitle>
                                <CardDescription>Update your primary login email address.</CardDescription>
                            </CardHeader>
                            <form onSubmit={handleUpdateEmail}>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="current-email">Current Email</Label>
                                        <Input id="current-email" value={email} disabled className="bg-gray-50" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-email">New Email Address</Label>
                                        <Input 
                                            id="new-email" 
                                            type="email" 
                                            placeholder="Enter new email" 
                                            value={newEmail}
                                            onChange={(e) => setNewEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit" disabled={loading} className="w-full md:w-auto">
                                        Update Email
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>

                        {/* Password Section */}
                        <Card className="border-none shadow-xl">
                            <CardHeader>
                                <div className="flex items-center gap-2 text-primary mb-1">
                                    <Lock size={18} />
                                    <span className="text-sm font-semibold uppercase tracking-wider">Security</span>
                                </div>
                                <CardTitle>Change Password</CardTitle>
                                <CardDescription>Refine your access with a new strong password.</CardDescription>
                            </CardHeader>
                            <form onSubmit={handleUpdatePassword}>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">New Password</Label>
                                        <Input 
                                            id="new-password" 
                                            type="password" 
                                            placeholder="••••••••" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                                        <Input 
                                            id="confirm-password" 
                                            type="password" 
                                            placeholder="••••••••" 
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit" disabled={loading} className="w-full md:w-auto">
                                        Change Password
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>

                        <div className="flex items-center gap-2 p-4 bg-primary/5 rounded-xl border border-primary/10 text-primary-foreground/80">
                            <ShieldCheck size={20} className="text-primary" />
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold text-primary">Security Note:</span> Updates to authentication credentials require verified sessions.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </AdminLayout>
    );
};

export default Settings;
