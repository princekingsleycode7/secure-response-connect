import { Card } from "@/components/ui/card";

const MOCK_RESPONDERS = [
  {
    id: 1,
    name: "John Doe",
    role: "EMT",
    distance: "0.5 miles",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Police Officer",
    distance: "1.2 miles",
  },
];

export const RespondersList = () => {
  return (
    <div className="space-y-4 w-full max-w-md">
      <h2 className="text-2xl font-bold">Nearby Responders</h2>
      <div className="space-y-2">
        {MOCK_RESPONDERS.map((responder) => (
          <Card key={responder.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{responder.name}</h3>
                <p className="text-sm text-gray-500">{responder.role}</p>
              </div>
              <div className="text-sm text-gray-500">{responder.distance}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};