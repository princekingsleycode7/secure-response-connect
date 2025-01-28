import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

type Incident = {
  id: string;
  category: string;
  description: string;
  timestamp: string;
  status: "pending" | "in-progress" | "resolved";
  hasMedia: boolean;
  isAnonymous: boolean;
  location?: { lat: number; long: number };
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
    location: { lat: 40.7128, long: -74.0060 },
  },
  {
    id: "2",
    category: "fire",
    description: "Small fire reported in building B",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: "in-progress",
    hasMedia: false,
    isAnonymous: true,
    location: { lat: 40.7129, long: -74.0061 },
  },
];

export const IncidentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  const filteredIncidents = MOCK_INCIDENTS
    .filter((incident) => {
      const matchesSearch = incident.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || incident.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="space-y-4 w-full max-w-2xl">
      <h2 className="text-2xl font-bold">Recent Incidents</h2>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search incidents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={sortBy} onValueChange={(value: "newest" | "oldest") => setSortBy(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredIncidents.map((incident) => (
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
                {incident.location && (
                  <p className="text-sm text-gray-500">
                    Location: {incident.location.lat.toFixed(4)}, {incident.location.long.toFixed(4)}
                  </p>
                )}
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