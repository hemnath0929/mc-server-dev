import { QuestFormData } from '../types';

const CLOUD_BIN_URL = 'https://extendsclass.com/api/json-storage/bin/efdbfca';

export const cloudStorage = {
  // Fetch all enquiries from Cloud Database
  async getEnquiries(): Promise<QuestFormData[]> {
    try {
      const res = await fetch(CLOUD_BIN_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error('Cloud fetch failed');
      const data = await res.json();
      if (Array.isArray(data.enquiries)) {
        // Cache to local storage
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

  // Save a new enquiry to Cloud Database
  async submitEnquiry(newLead: QuestFormData): Promise<boolean> {
    try {
      // 1. Fetch current list
      let currentList: QuestFormData[] = [];
      try {
        const res = await fetch(CLOUD_BIN_URL, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.enquiries)) {
            currentList = data.enquiries;
          }
        }
      } catch {}

      // 2. Prepend new enquiry
      const updatedList = [newLead, ...currentList.filter((item) => item.id !== newLead.id)];

      // 3. Save to Cloud
      await fetch(CLOUD_BIN_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enquiries: updatedList }),
      });

      // 4. Update local storage
      localStorage.setItem('devil_mc_enquiries', JSON.stringify(updatedList));
      return true;
    } catch (err) {
      console.error('Cloud save failed, saved locally:', err);
      // Fallback local save
      try {
        const local = localStorage.getItem('devil_mc_enquiries');
        const list = local ? JSON.parse(local) : [];
        const updated = [newLead, ...list];
        localStorage.setItem('devil_mc_enquiries', JSON.stringify(updated));
      } catch {}
      return false;
    }
  },

  // Update existing list (for admin status changes and note saves)
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
  }
};
