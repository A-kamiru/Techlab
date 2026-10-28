const BASE = (import.meta.env.VITE_API_BASE as string | undefined) ?? '/api';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function request<T>(path: string, init: RequestInit & { token?: string } = {}): Promise<T> {
  const { token, headers, ...rest } = init;
  const res = await fetch(`${BASE}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'X-Admin-Token': token } : {}),
      ...headers,
    },
  });
  if (!res.ok) {
    let detail = res.statusText;
    try {
      const j = await res.json();
      detail = typeof j.detail === 'string' ? j.detail : JSON.stringify(j.detail ?? j);
    } catch {
      /* ignore */
    }
    throw new ApiError(res.status, detail);
  }
  return res.status === 204 ? (undefined as T) : ((await res.json()) as T);
}

export interface PageOverride {
  title?: string | null;
  summary?: string | null;
  body: string;
  updated_at?: string;
}
export interface ContentResponse {
  site: Record<string, unknown>;
  pages: Record<string, PageOverride>;
}

export interface PhonePayload {
  country_iso: string;
  country_code: string;
  national_number: string;
}

export interface LeadCreate {
  name: string;
  email: string;
  company: string;
  interest: string;
  phone: PhonePayload | null;
  consent: boolean;
  source: string | null;
  region_hint: string | null;
  page_url: string;
  website: string; // honeypot, must stay empty
}
export interface LeadUpdate {
  role?: string;
  current_setup?: string;
  timeline?: string;
  country?: string;
  note?: string;
}

export const api = {
  getContent: () => request<ContentResponse>('/content'),
  createLead: (b: LeadCreate) => request<{ id: string; status: string }>('/leads', { method: 'POST', body: JSON.stringify(b) }),
  updateLead: (id: string, b: LeadUpdate) => request<{ id: string; status: string }>(`/leads/${id}`, { method: 'PATCH', body: JSON.stringify(b) }),
  // admin
  checkToken: (token: string) => request<void>('/admin/check', { token }),
  putPage: (slug: string, b: { title?: string | null; summary?: string | null; body: string }, token: string) =>
    request<void>(`/pages/${slug}`, { method: 'PUT', body: JSON.stringify(b), token }),
  deletePage: (slug: string, token: string) => request<void>(`/pages/${slug}`, { method: 'DELETE', token }),
  putSite: (key: string, value: unknown, token: string) => request<void>(`/site/${key}`, { method: 'PUT', body: JSON.stringify({ value }), token }),
  deleteSite: (key: string, token: string) => request<void>(`/site/${key}`, { method: 'DELETE', token }),
};
