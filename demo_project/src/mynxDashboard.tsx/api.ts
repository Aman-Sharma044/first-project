// src/api.ts
export interface LoginResponse {
  success: boolean;
  token?: string;
  role?: string;
  message?: string;
}

export interface DashboardData {
  accounts: {
    account: string;
    resources: {
      ec2: any[];
      rds: any[];
      eks: any[];
      asg: any[];
    };
  }[];
}

const API_BASE = "/api";

// Generic fetch wrapper
async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${url}`, { ...options, headers });

  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }

  return res.json();
}

// ---- API methods ---- //
export async function login(username: string, password: string) {
  return apiFetch<LoginResponse>("/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function getAccounts(): Promise<{ accounts: string[] }> {
  return apiFetch<{ accounts: string[] }>("/accounts");
}

export async function getDashboard(account?: string) {
  const url =
    account && account !== "all"
      ? `/dashboard?account=${account}`
      : "/dashboard";
  return apiFetch<DashboardData>(url);
}
