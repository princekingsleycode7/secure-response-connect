import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const INCIDENT_CATEGORIES = [
  "theft",
  "fire",
  "medical",
  "assault",
  "accident",
  "other"
] as const;

type IncidentCategory = typeof INCIDENT_CATEGORIES[number];

export const IncidentReport = () => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<IncidentCategory>("other");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [media, setMedia] = useState<File[]>([]);
  const { toast } = useToast();

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setMedia(prev => [...prev, ...filesArray]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store media files locally
    media.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem(`incident-media-${file.name}`, reader.result as string);
      };
      reader.readAsDataURL(file);
    });

    toast({
      title: "Report Submitted",
      description: "Your incident has been reported successfully.",
    });
    
    setDescription("");
    setCategory("other");
    setMedia([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <h2 className="text-2xl font-bold">Report Incident</h2>
      
      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={category}
          onValueChange={(value: IncidentCategory) => setCategory(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {INCIDENT_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          placeholder="Describe the incident..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[100px]"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Upload Media</Label>
        <Input
          type="file"
          onChange={handleMediaUpload}
          accept="image/*,video/*"
          multiple
          className="cursor-pointer"
        />
        {media.length > 0 && (
          <div className="text-sm text-gray-500">
            {media.length} file(s) selected
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="anonymous"
          checked={isAnonymous}
          onCheckedChange={setIsAnonymous}
        />
        <Label htmlFor="anonymous">Submit Anonymously</Label>
      </div>

      <Button type="submit" className="w-full">
        Submit Report
      </Button>
    </form>
  );
};