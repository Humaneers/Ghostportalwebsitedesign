import { projectId, publicAnonKey } from './supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-dbb49771`;

export const api = {
  getStats: async () => {
    try {
      const res = await fetch(`${BASE_URL}/sovereign/stats`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      return await res.json();
    } catch (e) {
      console.error(e);
      return { count: 542 };
    }
  },
  incrementCount: async () => {
    try {
      const res = await fetch(`${BASE_URL}/sovereign/increment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      return await res.json();
    } catch (e) {
      console.error(e);
      return { count: 543 };
    }
  },
  submitContact: async (data: { alias: string; contact: string; intent: string }) => {
    try {
      const res = await fetch(`${BASE_URL}/sovereign/contact`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (e) {
      console.error(e);
      return { success: false };
    }
  }
};
