import { Card } from "@/components/ui/card";

type Incident = {
  id: string;
  category: string;
  description: string;
  timestamp: string;
  status: "pending" | "in-progress" | "resolved";
  hasMedia: boolean;
  isAnonymous: boolean;
};

const MOCK_INCIDENTS: Incident[] = [
  {
    id: "1",
    category: "medical",
    description: "Medical emergency at Main St.",
    timestamp: new Date().toISOString(),
    status: "pending",
    hasMedia: true,
    isAnonymous: false,
  },
  {
    id: "2",
    category: "fire",
    description: "Small fire reported in building B",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: "in-progress",
    hasMedia: false,
    isAnonymous: true,
  },
];

export const IncidentDashboard = () => {
  return (
    <div className="space-y-4 w-full max-w-2xl">
      <h2 className="text-2xl font-bold">Recent Incidents</h2>
      <div className="space-y-4">
        {MOCK_INCIDENTS.map((incident) => (
          <Card key={incident.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold capitalize">{incident.category}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(incident.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm">{incident.description}</p>
                {incident.hasMedia && (
                  <span className="text-sm text-blue-500">Contains media attachments</span>
                )}
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`text-sm px-2 py-1 rounded-full ${
                  incident.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                  incident.status === "in-progress" ? "bg-blue-100 text-blue-800" :
                  "bg-green-100 text-green-800"
                }`}>
                  {incident.status}
                </span>
                {incident.isAnonymous && (
                  <span className="text-xs text-gray-500">Anonymous</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};