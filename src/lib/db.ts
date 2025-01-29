import { createClient } from '@libsql/client';

const client = createClient({
  url: 'file:local.db',
});

export type IncidentStatus = "pending" | "in-progress" | "resolved";

export const initDB = async () => {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS incidents (
      id TEXT PRIMARY KEY,
      category TEXT,
      description TEXT,
      timestamp TEXT,
      status TEXT,
      hasMedia BOOLEAN,
      isAnonymous BOOLEAN,
      latitude REAL,
      longitude REAL,
      audioUrl TEXT
    )
  `);
};

export const saveIncident = async (incident: {
  id: string;
  category: string;
  description: string;
  timestamp: string;
  status: IncidentStatus;
  hasMedia: boolean;
  isAnonymous: boolean;
  latitude?: number;
  longitude?: number;
  audioUrl?: string;
}) => {
  await client.execute({
    sql: `INSERT INTO incidents (id, category, description, timestamp, status, hasMedia, isAnonymous, latitude, longitude, audioUrl)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      incident.id,
      incident.category,
      incident.description,
      incident.timestamp,
      incident.status,
      incident.hasMedia,
      incident.isAnonymous,
      incident.latitude || null,
      incident.longitude || null,
      incident.audioUrl || null,
    ],
  });
};

export const getIncidents = async () => {
  const result = await client.execute('SELECT * FROM incidents ORDER BY timestamp DESC');
  return result.rows.map(row => ({
    id: String(row.id),
    category: String(row.category),
    description: String(row.description),
    timestamp: String(row.timestamp),
    status: String(row.status) as IncidentStatus,
    hasMedia: Boolean(row.hasMedia),
    isAnonymous: Boolean(row.isAnonymous),
    latitude: row.latitude ? Number(row.latitude) : null,
    longitude: row.longitude ? Number(row.longitude) : null,
    audioUrl: row.audioUrl ? String(row.audioUrl) : null,
  }));
};