import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const EmergencyButton = () => {
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();

  const handleEmergency = async () => {
    setIsActive(true);
    try {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            toast({
              title: "Emergency Mode Activated",
              description: `Location tracked: ${position.coords.latitude}, ${position.coords.longitude}`,
              duration: 5000,
            });
          },
          (error) => {
            console.error("Error getting location:", error);
            toast({
              title: "Location Error",
              description: "Unable to get your location. Please enable location services.",
              variant: "destructive",
            });
          }
        );
      }
    } catch (error) {
      console.error("Emergency activation error:", error);
      toast({
        title: "Error",
        description: "Failed to activate emergency mode",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      className={`w-32 h-32 rounded-full text-white text-xl font-bold transition-all duration-300 ${
        isActive
          ? "bg-emergency animate-pulse hover:bg-emergency"
          : "bg-emergency hover:bg-emergency-hover"
      }`}
      onClick={handleEmergency}
    >
      {isActive ? "ACTIVE" : "SOS"}
    </Button>
  );
};