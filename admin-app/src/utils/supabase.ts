import { createClient } from '@supabase/supabase-js';

export interface QuestFormData {
  id?: string;
  clientName: string;
  serverBrandName?: string;
  projectType: string[];
  customTypeOther?: string;
  minecraftVersion: string;
  serverSoftware: string;
  approxPlayerCount: string;
  serverType: string;
  projectTitle: string;
  projectDescription: string;
  requiredFeatures: string[];
  customFeatureNotes?: string;
  timeline: string;
  budgetPreference: string;
  discordHandle: string;
  email: string;
  serverIp?: string;
  referenceLinks?: string;
  submittedAt?: string;
  status?: 'New' | 'In Review' | 'Accepted' | 'In Development' | 'Completed' | 'Archived';
  adminNotes?: string;
}

export const SUPABASE_URL = 'https://bkkxegleymcftuzzbuuy.supabase.co';
export const SUPABASE_ANON_KEY =
  (import.meta as unknown as { env?: { VITE_SUPABASE_ANON_KEY?: string } }).env?.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJra3hlZ2xleW1jZnR1enpidXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNTUyMjEsImV4cCI6MjEwMjczMTIyMX0.MZxlS0yImaXWmjFKG8HeKrVUjGfzB-QZdx5hOFDxYDM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const supabaseStorage = {
  async getEnquiries(): Promise<QuestFormData[]> {
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch warning:', error);
        return [];
      }

      return (data || []).map((row: any) => ({
        id: row.id,
        clientName: row.client_name,
        serverBrandName: row.server_brand_name,
        projectType: row.project_type || [],
        customTypeOther: row.custom_type_other,
        minecraftVersion: row.minecraft_version,
        serverSoftware: row.server_software,
        approxPlayerCount: row.approx_player_count,
        serverType: row.server_type,
        projectTitle: row.project_title,
        projectDescription: row.project_description,
        requiredFeatures: row.required_features || [],
        customFeatureNotes: row.custom_feature_notes,
        timeline: row.timeline,
        budgetPreference: row.budget_preference,
        discordHandle: row.discord_handle,
        email: row.email,
        serverIp: row.server_ip,
        referenceLinks: row.reference_links,
        status: row.status || 'New',
        submittedAt: row.submitted_at,
        adminNotes: row.admin_notes,
      }));
    } catch (err) {
      console.error('Supabase getEnquiries failed:', err);
      return [];
    }
  },

  async updateStatus(id: string, newStatus: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('enquiries').update({ status: newStatus }).eq('id', id);
      return !error;
    } catch {
      return false;
    }
  },

  async updateNotes(id: string, notes: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('enquiries').update({ admin_notes: notes }).eq('id', id);
      return !error;
    } catch {
      return false;
    }
  },

  async deleteEnquiry(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('enquiries').delete().eq('id', id);
      return !error;
    } catch {
      return false;
    }
  },

  async addEnquiry(data: QuestFormData): Promise<boolean> {
    try {
      const { error } = await supabase.from('enquiries').insert([
        {
          id: data.id || `quest_${Date.now()}`,
          client_name: data.clientName,
          server_brand_name: data.serverBrandName || '',
          project_type: data.projectType || [],
          custom_type_other: data.customTypeOther || '',
          minecraft_version: data.minecraftVersion || '',
          server_software: data.serverSoftware || '',
          approx_player_count: data.approxPlayerCount || '',
          server_type: data.serverType || '',
          project_title: data.projectTitle || '',
          project_description: data.projectDescription || '',
          required_features: data.requiredFeatures || [],
          custom_feature_notes: data.customFeatureNotes || '',
          timeline: data.timeline || '',
          budget_preference: data.budgetPreference || '',
          discord_handle: data.discordHandle || '',
          email: data.email || '',
          server_ip: data.serverIp || '',
          reference_links: data.referenceLinks || '',
          status: 'New',
          submitted_at: data.submittedAt || new Date().toISOString(),
        }
      ]);
      return !error;
    } catch {
      return false;
    }
  }
};
