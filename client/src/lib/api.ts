export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api/v1";

export function getAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token =
    localStorage.getItem("zolvex_token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const authHeaders = getAuthHeaders();
  const headers = {
    "Content-Type": "application/json",
    ...authHeaders,
    ...((options.headers as Record<string, string>) || {})
  };

  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers
  });

  if (response.status === 401 || response.status === 403) {
    if (typeof window !== "undefined" && !window.location.pathname.endsWith("/admin/login")) {
      localStorage.removeItem("zolvex_token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("token");
      window.location.href = "/admin/login";
    }
  }

  return response;
}

export async function fetchApi<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  const response = await fetchWithAuth(url, options);

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || "API request failed");
  }

  return data;
}
