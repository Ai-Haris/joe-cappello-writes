import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Plus, ArrowLeft, Trash2, Edit, Archive, CheckCircle2, Clock, Inbox, Eye, Youtube, Image as ImageIcon, LayoutList } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ImageUpload from "@/components/admin/ImageUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";
import AdminLayout from "@/components/admin/AdminLayout";

interface Section {
    id: string;
    subtitle: string;
    paragraph: string;
    images: string[];
    layout: "text-left" | "text-right" | "images-top" | "images-bottom";
}

const ManageEvents = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEvent, setCurrentEvent] = useState<any>({
        title: "",
        slug: "",
        date: "",
        location: "",
        description: "",
        image_url: "",
        status: "draft",
        sections: [] as Section[]
    });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("events")
            .select("*")
            .order("date", { ascending: true });

        if (error) {
            console.error(error);
        } else {
            const transformed = (data || []).map(event => {
                let sections = [];
                try {
                    sections = typeof event.content === 'string' && event.content.startsWith('[')
                        ? JSON.parse(event.content)
                        : [];
                } catch (e) {
                    sections = [];
                }
                return {
                    ...event,
                    sections,
                    status: event.status || 'published'
                };
            });
            setEvents(transformed);
        }
        setLoading(false);
    };

    const handleSave = async (status: string = "published") => {
        if (!currentEvent.title || !currentEvent.date) {
            toast({ title: "Title and date required", variant: "destructive" });
            return;
        }

        const slug = currentEvent.slug || currentEvent.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

        const eventToSave = {
            ...currentEvent,
            slug,
            status,
            content: JSON.stringify(currentEvent.sections)
        };
        const { sections, ...finalData } = eventToSave;

        const { error } = await supabase
            .from("events")
            .upsert(finalData);

        if (error) {
            toast({
                title: "Error saving event",
                description: error.message,
                variant: "destructive"
            });
        } else {
            toast({
                title: status === "published" ? "Event published!" : "Draft saved",
            });
            setIsEditing(false);
            resetForm();
            fetchEvents();
        }
    };

    const resetForm = () => {
        setCurrentEvent({
            title: "",
            slug: "",
            date: "",
            location: "",
            description: "",
            image_url: "",
            status: "draft",
            sections: [{
                id: Date.now().toString(),
                subtitle: "",
                paragraph: "",
                images: [],
                layout: "images-top"
            }] as Section[]
        });
    };

    const archiveEvent = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === "archived" ? "published" : "archived";
        const { error } = await supabase
            .from("events")
            .update({ status: newStatus })
            .eq("id", id);

        if (error) {
            toast({ title: "Update failed", description: error.message, variant: "destructive" });
        } else {
            toast({ title: newStatus === "archived" ? "Event archived" : "Event restored" });
            fetchEvents();
        }
    };

    const deleteEvent = async (id: string) => {
        if (deleteConfirmId !== id) {
            setDeleteConfirmId(id);
            toast({ title: "Click again to confirm delete", variant: "destructive" });
            setTimeout(() => setDeleteConfirmId(null), 3000);
            return;
        }

        const { error } = await supabase.from("events").delete().eq("id", id);
        if (error) {
            toast({ title: "Delete failed", description: error.message, variant: "destructive" });
        } else {
            toast({ title: "Event deleted" });
            fetchEvents();
        }
    };

    const addSection = () => {
        const newSection: Section = {
            id: Date.now().toString(),
            subtitle: "",
            paragraph: "",
            images: [],
            layout: "images-top"
        };
        setCurrentEvent({
            ...currentEvent,
            sections: [...currentEvent.sections, newSection]
        });
    };

    const removeSection = (id: string) => {
        setCurrentEvent({
            ...currentEvent,
            sections: currentEvent.sections.filter((s: Section) => s.id !== id)
        });
    };

    const updateSection = (id: string, field: keyof Section, value: any) => {
        const updatedSections = currentEvent.sections.map((s: Section) =>
            s.id === id ? { ...s, [field]: value } : s
        );
        setCurrentEvent({ ...currentEvent, sections: updatedSections });
    };

    const addImageToSection = (sectionId: string, url: string) => {
        const updatedSections = currentEvent.sections.map((s: Section) => {
            if (s.id === sectionId) {
                if (s.images.length >= 3) {
                    toast({ title: "Limit reached", description: "Max 3 images per section." });
                    return s;
                }
                return { ...s, images: [...s.images, url] };
            }
            return s;
        });
        setCurrentEvent({ ...currentEvent, sections: updatedSections });
    };

    const removeImageFromSection = (sectionId: string, index: number) => {
        const updatedSections = currentEvent.sections.map((s: Section) => {
            if (s.id === sectionId) {
                const newImages = [...s.images];
                newImages.splice(index, 1);
                return { ...s, images: newImages };
            }
            return s;
        });
        setCurrentEvent({ ...currentEvent, sections: updatedSections });
    };

    return (
        <AdminLayout>
            <div className="p-8 text-foreground">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => isEditing ? setIsEditing(false) : navigate("/admin/dashboard")}>
                            <ArrowLeft size={20} />
                        </Button>
                        <h2 className="text-3xl font-bold tracking-tight">
                            {isEditing ? (currentEvent.id ? "Edit Event" : "New Event") : "Manage Events"}
                        </h2>
                    </div>
                    {!isEditing && (
                        <Button onClick={() => { resetForm(); setIsEditing(true); }} className="gap-2">
                            <Plus size={20} /> New Event
                        </Button>
                    )}
                </div>

                {isEditing ? (
                    <div className="space-y-8 pb-20">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">General Info</CardTitle>
                                <CardDescription>Basic event details.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Event Title</label>
                                        <Input
                                            placeholder="e.g. Book Signing"
                                            value={currentEvent.title}
                                            onChange={(e) => setCurrentEvent({ ...currentEvent, title: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Date</label>
                                        <Input
                                            type="date"
                                            value={currentEvent.date}
                                            onChange={(e) => setCurrentEvent({ ...currentEvent, date: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Location</label>
                                    <Input
                                        placeholder="e.g. New York Public Library"
                                        value={currentEvent.location}
                                        onChange={(e) => setCurrentEvent({ ...currentEvent, location: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Hero / Intro Description</label>
                                    <RichTextEditor
                                        content={currentEvent.description}
                                        onChange={(html) => setCurrentEvent({ ...currentEvent, description: html })}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-medium">Main Event Cover Photo</label>
                                    <ImageUpload
                                        value={currentEvent.image_url}
                                        onChange={(url) => setCurrentEvent({ ...currentEvent, image_url: url })}
                                        onRemove={() => setCurrentEvent({ ...currentEvent, image_url: "" })}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Content Builder */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold flex items-center gap-2">
                                    <LayoutList size={22} className="text-primary" /> Event Sections
                                </h3>
                                <Button type="button" variant="outline" size="sm" onClick={addSection} className="gap-2">
                                    <Plus size={16} /> Add Section
                                </Button>
                            </div>

                            {currentEvent.sections.map((section: Section, sIdx: number) => (
                                <Card key={section.id} className="relative group overflow-hidden border-2 transition-all hover:border-primary/20">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                                    <CardHeader className="flex flex-row items-center justify-between pb-2 bg-muted/30">
                                        <div className="flex items-center gap-4">
                                            <div className="text-sm font-black text-primary/40 uppercase tracking-tighter">Section {sIdx + 1}</div>
                                            <select
                                                value={section.layout}
                                                onChange={(e) => updateSection(section.id, "layout", e.target.value as Section["layout"])}
                                                className="text-xs font-semibold bg-background border rounded px-2 py-1 outline-none ring-primary/20 focus:ring-2"
                                            >
                                                <option value="images-top">Gallery Top</option>
                                                <option value="images-bottom">Gallery Bottom</option>
                                                <option value="text-left">Text Left / Images Right</option>
                                                <option value="text-right">Text Right / Images Left</option>
                                            </select>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeSection(section.id)}
                                            className="text-muted-foreground hover:text-destructive transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-muted-foreground/70">Subtitle</label>
                                            <Input
                                                placeholder="Section title..."
                                                value={section.subtitle}
                                                onChange={(e) => updateSection(section.id, "subtitle", e.target.value)}
                                                className="border-none bg-muted/20 focus-visible:ring-1 text-lg font-medium"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                            <div className="md:col-span-8 space-y-2">
                                                <label className="text-xs font-bold uppercase text-muted-foreground/70">Paragraph Content</label>
                                                <RichTextEditor
                                                    content={section.paragraph}
                                                    onChange={(html) => updateSection(section.id, "paragraph", html)}
                                                />
                                            </div>
                                            <div className="md:col-span-4 space-y-2">
                                                <label className="text-xs font-bold uppercase text-muted-foreground/70 flex items-center gap-2">
                                                    <ImageIcon size={14} /> Images ({section.images.length}/3)
                                                </label>
                                                <div className="grid grid-cols-2 gap-3 p-3 bg-muted/20 rounded-xl min-h-[140px] items-center">
                                                    {section.images.map((img, iIdx) => (
                                                        <div key={iIdx} className="relative aspect-square rounded-lg border-2 border-background overflow-hidden shadow-sm group/img">
                                                            <img src={img} className="w-full h-full object-contain" />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeImageFromSection(section.id, iIdx)}
                                                                className="absolute inset-0 bg-destructive/60 text-white flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    {section.images.length < 3 && (
                                                        <div className="aspect-square">
                                                            <ImageUpload
                                                                value=""
                                                                onChange={(url) => addImageToSection(section.id, url)}
                                                                onRemove={() => { }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t">
                            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                            <Button 
                                type="button" 
                                variant="secondary" 
                                onClick={() => handleSave("draft")}
                                className="gap-2"
                            >
                                <Clock size={16} /> Save as Draft
                            </Button>
                            <Button 
                                type="button" 
                                onClick={() => handleSave("published")} 
                                size="lg"
                                className="px-10 gap-2"
                            >
                                <CheckCircle2 size={16} /> Publish Event
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsList className="bg-white border p-1 h-12">
                            <TabsTrigger value="all" className="gap-2 px-6"><Inbox size={16} /> All Events</TabsTrigger>
                            <TabsTrigger value="published" className="gap-2 px-6 text-green-600"><CheckCircle2 size={16} /> Published</TabsTrigger>
                            <TabsTrigger value="draft" className="gap-2 px-6 text-amber-600"><Clock size={16} /> Drafts</TabsTrigger>
                            <TabsTrigger value="archived" className="gap-2 px-6 text-muted-foreground"><Archive size={16} /> Archived</TabsTrigger>
                        </TabsList>

                        <div className="grid gap-6">
                            {loading ? (
                                <p className="text-center py-12 text-muted-foreground">Loading events...</p>
                            ) : events.filter(e => activeTab === "all" || e.status === activeTab).length === 0 ? (
                                <Card>
                                    <CardHeader className="text-center text-gray-500 py-20 border-2 border-dashed border-muted rounded-xl">
                                        <Calendar className="mx-auto mb-4 opacity-10" size={64} />
                                        <CardTitle className="text-2xl font-bold">No events found</CardTitle>
                                        <CardDescription>
                                            {activeTab === "all" ? "Start by adding your first upcoming event." : `No events found in the ${activeTab} section.`}
                                        </CardDescription>
                                        {activeTab === "all" && (
                                            <Button onClick={() => { resetForm(); setIsEditing(true); }} className="mt-6 gap-2">
                                                <Plus size={20} /> Create New Event
                                            </Button>
                                        )}
                                    </CardHeader>
                                </Card>
                            ) : (
                                events
                                    .filter(e => activeTab === "all" || e.status === activeTab)
                                    .map((event) => (
                                        <Card key={event.id} className="hover:shadow-md transition-shadow group overflow-hidden">
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <div className="w-16 h-16 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                                                            <Calendar size={24} />
                                                        </div>
                                                        <div className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border ${
                                                            event.status === 'published' ? 'bg-green-100 text-green-700 border-green-200' :
                                                            event.status === 'archived' ? 'bg-gray-100 text-gray-700 border-gray-200' :
                                                            'bg-amber-100 text-amber-700 border-amber-200'
                                                        }`}>
                                                            {event.status}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <CardTitle className="text-xl group-hover:text-primary transition-colors flex items-center gap-2">
                                                            {event.title}
                                                            <a href={`/events/${event.slug}`} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Eye size={16} />
                                                            </a>
                                                        </CardTitle>
                                                        <CardDescription className="flex items-center gap-2 mt-1">
                                                            <span>{new Date(event.date).toLocaleDateString()}</span>
                                                            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                                                            <span>{event.location}</span>
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="icon" onClick={() => {
                                                        setCurrentEvent(event);
                                                        setIsEditing(true);
                                                    }} title="Edit">
                                                        <Edit size={16} />
                                                    </Button>
                                                    <Button 
                                                        variant="outline" 
                                                        size="icon" 
                                                        onClick={() => archiveEvent(event.id, event.status)}
                                                        className={event.status === 'archived' ? 'text-green-600 hover:text-green-700' : ''}
                                                        title={event.status === 'archived' ? 'Restore' : 'Archive'}
                                                    >
                                                        {event.status === 'archived' ? <CheckCircle2 size={16} /> : <Archive size={16} />}
                                                    </Button>
                                                     <Button 
                                                        variant={deleteConfirmId === event.id ? "destructive" : "outline"} 
                                                        size="icon" 
                                                        onClick={() => deleteEvent(event.id)} 
                                                        title="Delete"
                                                        className={deleteConfirmId === event.id ? "animate-pulse" : "text-destructive hover:bg-destructive/10"}
                                                    >
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </div>
                                            </CardHeader>
                                        </Card>
                                    ))
                            )}
                        </div>
                    </Tabs>
                )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default ManageEvents;
