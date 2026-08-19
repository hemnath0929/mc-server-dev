import { QuestFormData } from '../types';

const VERCEL_API_URL = 'https://mc-server-dev.vercel.app/api/enquiries';
const FALLBACK_CLOUD_URL = 'https://extendsclass.com/api/json-storage/bin/efdbfca';

export const cloudStorage = {
  // Fetch all enquiries
  async getEnquiries(): Promise<QuestFormData[]> {
    // 1. Try Vercel Serverless API
    try {
      const res = await fetch(VERCEL_API_URL, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.enquiries)) {
          localStorage.setItem('devil_mc_enquiries', JSON.stringify(data.enquiries));
          return data.enquiries;
        }
      }
    } catch {}

    // 2. Fallback to Cloud JSON Storage
    try {
      const res = await fetch(FALLBACK_CLOUD_URL, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.enquiries)) {
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

  // Submit new enquiry
  async submitEnquiry(newLead: QuestFormData): Promise<boolean> {
    let success = false;

    // 1. Send to Vercel Serverless API
    try {
      const res = await fetch(VERCEL_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead),
      });
      if (res.ok) success = true;
    } catch (e) {
      console.warn('Vercel API save warning:', e);
    }

    // 2. Also send to Cloud Bin fallback
    try {
      const currentList = await this.getEnquiries();
      const updatedList = [newLead, ...currentList.filter((item) => item.id !== newLead.id)];
      await fetch(FALLBACK_CLOUD_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enquiries: updatedList }),
      });
      localStorage.setItem('devil_mc_enquiries', JSON.stringify(updatedList));
      success = true;
    } catch {}

    // Local Storage backup
    try {
      const local = localStorage.getItem('devil_mc_enquiries');
      const list = local ? JSON.parse(local) : [];
      const updated = [newLead, ...list.filter((item: any) => item.id !== newLead.id)];
      localStorage.setItem('devil_mc_enquiries', JSON.stringify(updated));
    } catch {}

    return success;
  },

  // Update list (Admin operations)
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
  }
};
