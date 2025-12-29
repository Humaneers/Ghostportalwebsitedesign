const getEnv = (key: string, defaultValue: string) => {
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    // @ts-ignore
    return import.meta.env[key] || defaultValue;
  }
  try {
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env) {
       return process.env[key] || defaultValue;
    }
  } catch (e) {
    // Ignore
  }
  return defaultValue;
};

const SUPABASE_URL = getEnv('VITE_SUPABASE_URL', 'https://placeholder.supabase.co');
const SUPABASE_KEY = getEnv('VITE_SUPABASE_ANON_KEY', 'placeholder-key');

// Helper to handle both local dev mocks and real edge functions
async function fetchEdge<T>(functionName: string, body: any): Promise<T> {
  // STUB: In a real deploy, this calls the edge function.
  // For the public repo publish state, we mock the responses if no backend is reachable
  // or just return success to allow UI traversal.
  
  console.log(`[API STUB] Calling ${functionName}`, body);
  
  // Simulate network delay
  await new Promise(r => setTimeout(r, 800));

  // Return mock data based on function
  if (functionName === 'bond-eligibility') {
    return { allowed: true, applicationId: 'mock-app-id' } as any;
  }
  
  return { success: true } as any;
}

export const api = {
  applicationInit: async () => {
    return fetchEdge('application-init', {});
  },
  applicationEvent: async (event: string, data?: any) => {
    return fetchEdge('application-event', { event, data });
  },
  transmissionSubmit: async (data: any) => {
    return fetchEdge('transmission-submit', data);
  },
  bondEligibility: async (token: string) => {
    return fetchEdge<{ allowed: boolean; applicationId: string }>('bond-eligibility', { token });
  },
  stripeCheckout: async (applicationId: string) => {
    // STUB: Returns a fake checkout URL
    console.log('[API STUB] Creating Stripe session for', applicationId);
    return { url: '/app/payment-received' }; 
  },
  applicationStatus: async (id: string) => {
    return fetchEdge('application-status', { id });
  },
  memberAuth: async (id: string, key: string) => {
    return fetchEdge('member-auth', { id, key });
  },
  portalMe: async () => {
    return fetchEdge('portal-me', {});
  }
};
