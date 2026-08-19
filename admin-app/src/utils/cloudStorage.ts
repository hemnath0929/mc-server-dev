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

const CLOUD_BIN_URL = 'https://extendsclass.com/api/json-storage/bin/efdbfca';

export const cloudStorage = {
  async getEnquiries(): Promise<QuestFormData[]> {
    try {
      const res = await fetch(CLOUD_BIN_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error('Cloud fetch failed');
      const data = await res.json();
      if (Array.isArray(data.enquiries)) {
        localStorage.setItem('devil_mc_enquiries', JSON.stringify(data.enquiries));
        return data.enquiries;
      }
      return [];
    } catch (err) {
      console.warn('Cloud fetch error, using local fallback:', err);
      try {
        const local = localStorage.getItem('devil_mc_enquiries');
        return local ? JSON.parse(local) : [];
      } catch {
        return [];
      }
    }
  },

  async updateAllEnquiries(updatedList: QuestFormData[]): Promise<boolean> {
    try {
      await fetch(CLOUD_BIN_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enquiries: updatedList }),
      });
      localStorage.setItem('devil_mc_enquiries', JSON.stringify(updatedList));
      return true;
    } catch (err) {
      console.error('Cloud update failed:', err);
      localStorage.setItem('devil_mc_enquiries', JSON.stringify(updatedList));
      return false;
    }
  },

  async addEnquiry(newLead: QuestFormData): Promise<QuestFormData[]> {
    try {
      const currentList = await this.getEnquiries();
      const updated = [newLead, ...currentList.filter((item) => item.id !== newLead.id)];
      await this.updateAllEnquiries(updated);
      return updated;
    } catch {
      return [];
    }
  }
};
