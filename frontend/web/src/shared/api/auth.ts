import { apiClient } from "./client";

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  fullName: string;
}

export interface RegisterResponse {
  id: number;
  email: string;
  username: string;
  fullName: string;
  message: string;
}

export async function registerUser(data: RegisterRequest): Promise<RegisterResponse> {
  const response = await apiClient.post<RegisterResponse>("/api/v1/auth/register", data);
  return response.data;
}
