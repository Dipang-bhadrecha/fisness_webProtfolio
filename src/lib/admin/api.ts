/**
 * src/lib/admin/api.ts — typed client for the fisness_backend API.
 *
 * Mirrors fisness/services/api.ts's request<T>() convention exactly (Bearer
 * token, unwrap {success,message,data} to .data, throw a typed ApiError on
 * non-2xx) so this stays a straightforward second client of the same API,
 * not a different shape to remember.
 */

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "https://api.fisness.com").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, options: RequestInit & { token?: string } = {}): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    ...(fetchOptions.body != null ? { "Content-Type": "application/json" } : {}),
    ...((fetchOptions.headers as Record<string, string>) ?? {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, { ...fetchOptions, headers });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[admin api] unreachable: ${fetchOptions.method ?? "GET"} ${BASE_URL}${path}`, err);
    }
    throw new ApiError("Network request failed", 0, "NETWORK_ERROR");
  }

  let body: any;
  try {
    body = await response.json();
  } catch {
    body = {};
  }

  if (!response.ok) {
    throw new ApiError(
      body?.message ?? `Request failed with status ${response.status}`,
      response.status,
      body?.code,
      body?.details
    );
  }

  return (body?.data !== undefined ? body.data : body) as T;
}

// ─── Auth ───────────────────────────────────────────────────────────────────

export function requestOtp(phone: string): Promise<{ message: string }> {
  return request("/api/v1/auth/request-otp", { method: "POST", body: JSON.stringify({ phone }) });
}

export function verifyOtp(phone: string, code: string): Promise<{ token: string }> {
  return request("/api/v1/auth/verify-otp", { method: "POST", body: JSON.stringify({ phone, code }) });
}

export interface AdminUser {
  id: string;
  phone: string;
  name: string | null;
  isAdmin: boolean;
}

export function getMe(token: string): Promise<AdminUser> {
  return request("/api/v1/auth/me", { token });
}

// ─── Announcements ──────────────────────────────────────────────────────────

export type AnnouncementType = "WELCOME" | "UPDATE" | "NEWS";
export type AnnouncementSeverity = "SOFT" | "HARD";

export interface Announcement {
  id: string;
  type: AnnouncementType;
  severity: AnnouncementSeverity | null;
  title: string;
  summary: string | null;
  bodyHtml: string;
  videoUrl: string | null;
  ctaLabel: string | null;
  ctaUrl: string | null;
  minAppVersion: string | null;
  startsAt: string | null;
  endsAt: string | null;
  priority: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type AnnouncementInput = Partial<Omit<Announcement, "id" | "createdAt" | "updatedAt">> &
  Pick<Announcement, "type" | "title" | "bodyHtml">;

export function listAllAnnouncements(token: string): Promise<Announcement[]> {
  return request("/api/v1/announcements/all", { token });
}

export function createAnnouncement(token: string, data: AnnouncementInput): Promise<Announcement> {
  return request("/api/v1/announcements", { method: "POST", token, body: JSON.stringify(data) });
}

export function updateAnnouncement(
  token: string,
  id: string,
  data: Partial<AnnouncementInput>
): Promise<Announcement> {
  return request(`/api/v1/announcements/${id}`, { method: "PATCH", token, body: JSON.stringify(data) });
}

export function deleteAnnouncement(token: string, id: string): Promise<void> {
  return request(`/api/v1/announcements/${id}`, { method: "DELETE", token });
}
