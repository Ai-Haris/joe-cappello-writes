import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    onRemove: () => void;
}

const ImageUpload = ({ value, onChange, onRemove }: ImageUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const { toast } = useToast();

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);

            if (!e.target.files || e.target.files.length === 0) {
                throw new Error("You must select an image to upload.");
            }

            const file = e.target.files[0];
            const fileExt = file.name.split(".").pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("blog-images")
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage
                .from("blog-images")
                .getPublicUrl(filePath);

            onChange(data.publicUrl);
            toast({
                title: "Success",
                description: "Image uploaded successfully",
            });
        } catch (error: any) {
            toast({
                title: "Error uploading image",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex items-center gap-4">
            {value ? (
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border">
                    <img src={value} alt="Upload" className="w-full h-full object-contain" />
                    <button
                        onClick={onRemove}
                        type="button"
                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded-full hover:opacity-80 transition"
                    >
                        <X size={14} />
                    </button>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:bg-muted/50 transition">
                    {uploading ? (
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    ) : (
                        <>
                            <ImagePlus className="h-6 w-6 text-muted-foreground" />
                            <span className="text-[10px] text-muted-foreground mt-1">Upload</span>
                        </>
                    )}
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={uploading}
                    />
                </label>
            )}
        </div>
    );
};

export default ImageUpload;
