import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory / Global cache for serverless instance
let memoryEnquiries: any[] = [
  {
    id: 'quest_demo_01',
    clientName: 'Alex Mercer',
    serverBrandName: 'AetherSMP Network',
    projectType: ['Custom Gameplay', 'Ranks & Progression', 'Economy & Vault'],
    minecraftVersion: '1.20.4',
    serverSoftware: 'Paper',
    serverType: 'Hardcore Survival SMP',
    approxPlayerCount: '50 - 150 Players',
    projectTitle: 'Aether Prestige & Seasonal Quests',
    projectDescription: 'Need a custom seasonal quest progression system with zero tick lag and Redis sync.',
    requiredFeatures: ['Async Processing (Zero Lag)', 'MySQL / MariaDB Database', 'Redis Real-time Sync'],
    timeline: 'Standard (1-3 weeks)',
    budgetPreference: 'Medium System ($100-$300)',
    discordHandle: 'alex_mercer#4412',
    email: 'alex@aethersmp.net',
    submittedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'New',
  }
];

const CLOUD_STORAGE_URL = 'https://extendsclass.com/api/json-storage/bin/efdbfca';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable Universal CORS for both client & admin Vercel domains
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. GET: Fetch all enquiries
  if (req.method === 'GET') {
    try {
      const response = await fetch(CLOUD_STORAGE_URL, { cache: 'no-store' });
      if (response.ok) {
        const cloudData = await response.json();
        if (Array.isArray(cloudData.enquiries) && cloudData.enquiries.length > 0) {
          memoryEnquiries = cloudData.enquiries;
        }
      }
    } catch (e) {
      console.warn('Fallback to memory store:', e);
    }
    return res.status(200).json({ enquiries: memoryEnquiries });
  }

  // 2. POST: Submit a new enquiry from client
  if (req.method === 'POST') {
    try {
      const newLead = req.body;
      if (!newLead || !newLead.clientName) {
        return res.status(400).json({ error: 'Missing clientName or payload' });
      }

      // Prepend lead to memory
      memoryEnquiries = [newLead, ...memoryEnquiries.filter((item) => item.id !== newLead.id)];

      // Sync to cloud storage in background
      try {
        await fetch(CLOUD_STORAGE_URL, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ enquiries: memoryEnquiries }),
        });
      } catch (cloudErr) {
        console.warn('Cloud storage sync warning:', cloudErr);
      }

      return res.status(200).json({ success: true, enquiry: newLead, total: memoryEnquiries.length });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Failed to process enquiry' });
    }
  }

  // 3. PUT: Update enquiries list (Admin status changes, notes)
  if (req.method === 'PUT') {
    try {
      const body = req.body;
      const updatedList = Array.isArray(body) ? body : body.enquiries || memoryEnquiries;
      memoryEnquiries = updatedList;

      try {
        await fetch(CLOUD_STORAGE_URL, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ enquiries: updatedList }),
        });
      } catch {}

      return res.status(200).json({ success: true, enquiries: memoryEnquiries });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Failed to update enquiries' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
