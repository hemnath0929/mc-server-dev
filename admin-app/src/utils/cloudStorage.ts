interface QuestFormData {
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

const VERCEL_API_URL = 'https://mc-server-dev.vercel.app/api/enquiries';
const FALLBACK_CLOUD_URL = 'https://extendsclass.com/api/json-storage/bin/efdbfca';

export const cloudStorage = {
  async getEnquiries(): Promise<QuestFormData[]> {
    // 1. Try Vercel Serverless API
    try {
      const res = await fetch(VERCEL_API_URL, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.enquiries) && data.enquiries.length > 0) {
          localStorage.setItem('devil_mc_enquiries', JSON.stringify(data.enquiries));
          return data.enquiries;
        }
      }
    } catch {}

    // 2. Try Fallback Cloud Storage
    try {
      const res = await fetch(FALLBACK_CLOUD_URL, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.enquiries) && data.enquiries.length > 0) {
          localStorage.setItem('devil_mc_enquiries', JSON.stringify(data.enquiries));
          return data.enquiries;
        }
      }
    } catch {}

    // 3. Fallback to LocalStorage
    try {
      const local = localStorage.getItem('devil_mc_enquiries');
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  },

  async updateAllEnquiries(updatedList: QuestFormData[]): Promise<boolean> {
    try {
      await fetch(VERCEL_API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enquiries: updatedList }),
      });
    } catch {}

    try {
      await fetch(FALLBACK_CLOUD_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enquiries: updatedList }),
      });
    } catch {}

    localStorage.setItem('devil_mc_enquiries', JSON.stringify(updatedList));
    return true;
  },

  async addEnquiry(newLead: QuestFormData): Promise<QuestFormData[]> {
    const currentList = await this.getEnquiries();
    const updated = [newLead, ...currentList.filter((item) => item.id !== newLead.id)];
    await this.updateAllEnquiries(updated);
    return updated;
  }
};
