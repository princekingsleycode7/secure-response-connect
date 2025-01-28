import { EmergencyButton } from "@/components/EmergencyButton";
import { IncidentReport } from "@/components/IncidentReport";
import { RespondersList } from "@/components/RespondersList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto space-y-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold">Emergency Response Network</h1>
        </header>
        
        <div className="flex flex-col items-center space-y-8">
          <div className="w-full flex justify-center">
            <EmergencyButton />
          </div>
          
          <div className="w-full max-w-md space-y-8">
            <IncidentReport />
            <RespondersList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;