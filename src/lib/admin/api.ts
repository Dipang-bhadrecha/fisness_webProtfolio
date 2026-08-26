/**
 * src/lib/admin/api.ts — typed client for the fisness_backend API.
 *
 * Mirrors fisness/services/api.ts's request<T>() convention exactly (Bearer
 * token, unwrap {success,message,data} to .data, throw a typed ApiError on
 * non-2xx) so this stays a straightforward second client of the same API,
 * not a different shape to remember.
 */

// One RDS instance, two separate fisness_backend deployments (stage-api /
// api) each with their own ADMIN_JWT_SECRET, so a "stage" login token is
// never valid against "live" and vice versa — see AdminEnvironmentContext,
// which is what actually flips `activeEnv` when the founder switches.
export type AdminEnv = "stage" | "live";

const API_URLS: Record<AdminEnv, string> = {
  stage: (process.env.NEXT_PUBLIC_API_URL_STAGE ?? process.env.NEXT_PUBLIC_API_URL ?? "https://stage-api.fisness.com").replace(/\/$/, ""),
  live: (process.env.NEXT_PUBLIC_API_URL_LIVE ?? "https://api.fisness.com").replace(/\/$/, ""),
};

let activeEnv: AdminEnv = "stage";

// Called by AdminEnvironmentContext, synchronously, before any request that
// depends on the new environment can fire — never called from a component
// render.
export function setActiveAdminEnv(env: AdminEnv) {
  activeEnv = env;
}

export function getActiveAdminEnv(): AdminEnv {
  return activeEnv;
}

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

async function rawRequest(path: string, options: RequestInit & { token?: string } = {}): Promise<any> {
  const { token, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    ...(fetchOptions.body != null ? { "Content-Type": "application/json" } : {}),
    ...((fetchOptions.headers as Record<string, string>) ?? {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const baseUrl = API_URLS[activeEnv];

  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, { ...fetchOptions, headers });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[admin api] unreachable: ${fetchOptions.method ?? "GET"} ${baseUrl}${path}`, err);
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

  return body;
}

async function request<T>(path: string, options: RequestInit & { token?: string } = {}): Promise<T> {
  const body = await rawRequest(path, options);
  return (body?.data !== undefined ? body.data : body) as T;
}

// For the backend's `paginatedResponse` envelope ({ success, data, pagination,
// timestamp }) — request<T>() unwraps straight to `.data` and would silently
// drop `.pagination`, which the admin/users and admin/audit-log tables need.
export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

async function requestPaginated<T>(
  path: string,
  options: RequestInit & { token?: string } = {}
): Promise<Paginated<T>> {
  const body = await rawRequest(path, options);
  return { data: body.data, ...body.pagination } as Paginated<T>;
}

// ─── Auth ───────────────────────────────────────────────────────────────────
//
// Username + password + TOTP — fully independent of the mobile app's
// phone+OTP (that flow lives in fisness/services/api.ts, not here). Mirrors
// the three-stage flow the backend implements (adminAuth.routes.ts):
//   1. login()         -> either a setupToken (first-time) or a pendingToken
//   2a. setupStart() + setupConfirm()   (first-time: scan QR, enter a code)
//   2b. totpVerify()                     (returning: already-enabled, one code)
// Both 2a and 2b end with a real session token, used as `token` everywhere
// else in this file's admin.* functions.

export interface AdminSession {
  username: string;
}

export type LoginResult =
  | { setupRequired: true; setupToken: string }
  | { totpRequired: true; pendingToken: string };

export function adminLogin(username: string, password: string): Promise<LoginResult> {
  return request("/api/v1/admin/auth/login", { method: "POST", body: JSON.stringify({ username, password }) });
}

export function adminSetupStart(setupToken: string): Promise<{ qrDataUrl: string; manualEntryKey: string }> {
  return request("/api/v1/admin/auth/setup/start", { method: "POST", token: setupToken });
}

export function adminSetupConfirm(setupToken: string, code: string): Promise<{ token: string }> {
  return request("/api/v1/admin/auth/setup/confirm", {
    method: "POST", token: setupToken, body: JSON.stringify({ code }),
  });
}

export function adminTotpVerify(pendingToken: string, code: string): Promise<{ token: string }> {
  return request("/api/v1/admin/auth/totp/verify", {
    method: "POST", token: pendingToken, body: JSON.stringify({ code }),
  });
}

export function adminMe(token: string): Promise<AdminSession> {
  return request("/api/v1/admin/auth/me", { token });
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

// ─── Platform overview ───────────────────────────────────────────────────────

export interface AdminOverview {
  users: number;
  boats: number;
  companies: number;
  sessions: number;
}

export function getOverview(token: string): Promise<AdminOverview> {
  return request("/api/v1/admin/overview", { token });
}

// ─── Users ──────────────────────────────────────────────────────────────────

// A row in the platform user table — distinct from `AdminSession` above,
// which is specifically "the logged-in founder's own identity" used by
// AdminAuthContext. Conflating the two would blur "who am I" with "a row in
// the users table". Also distinct from `AdminCredential` (the backend's
// login-table row) — this is a `User` (a phone/OTP mobile-app account), not
// an admin login.
export interface PlatformUser {
  id: string;
  phone: string;
  name: string | null;
  ownerType: string | null;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: string;
}

export function listUsers(
  token: string,
  params: { search?: string; page?: number; limit?: number } = {}
): Promise<Paginated<PlatformUser>> {
  const qs = new URLSearchParams();
  if (params.search) qs.set("search", params.search);
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  return requestPaginated(`/api/v1/admin/users${suffix}`, { token });
}

export function setUserActive(token: string, id: string, isActive: boolean): Promise<PlatformUser> {
  return request(`/api/v1/admin/users/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify({ isActive }),
  });
}

// ─── Boats & companies ──────────────────────────────────────────────────────
//
// Names and metadata only — nothing from the encrypted money tables (see
// ../../../CLAUDE.md → "What is encrypted vs what stays visible" in the
// fisness monorepo). The backend queries never select those fields, so
// there is nothing for this dashboard to leak even by accident.

export interface PlatformBoat {
  id: string;
  name: string;
  ownerName: string | null;
  registrationNumber: string | null;
  portLocation: string | null;
  isActive: boolean;
  createdAt: string;
  owner: { name: string | null; phone: string } | null;
  _count: { sessions: number };
}

export function listBoats(
  token: string,
  params: { search?: string; page?: number; limit?: number } = {}
): Promise<Paginated<PlatformBoat>> {
  const qs = new URLSearchParams();
  if (params.search) qs.set("search", params.search);
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  return requestPaginated(`/api/v1/admin/boats${suffix}`, { token });
}

export interface PlatformCompany {
  id: string;
  name: string;
  nameGujarati: string | null;
  phone: string | null;
  isActive: boolean;
  createdAt: string;
  owner: { name: string | null; phone: string } | null;
  _count: { registeredBoats: number; sessions: number };
}

export function listCompanies(
  token: string,
  params: { search?: string; page?: number; limit?: number } = {}
): Promise<Paginated<PlatformCompany>> {
  const qs = new URLSearchParams();
  if (params.search) qs.set("search", params.search);
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  return requestPaginated(`/api/v1/admin/companies${suffix}`, { token });
}

// ─── Audit log ──────────────────────────────────────────────────────────────

export interface PlatformAuditLogEntry {
  id: string;
  userId: string;
  method: string;
  path: string;
  resource: string;
  resourceId: string | null;
  statusCode: number;
  createdAt: string;
  user: { name: string | null; phone: string } | null;
}

export function listAuditLog(
  token: string,
  params: { page?: number; limit?: number; userId?: string; resource?: string } = {}
): Promise<Paginated<PlatformAuditLogEntry>> {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  if (params.userId) qs.set("userId", params.userId);
  if (params.resource) qs.set("resource", params.resource);
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  return requestPaginated(`/api/v1/admin/audit-log${suffix}`, { token });
}
