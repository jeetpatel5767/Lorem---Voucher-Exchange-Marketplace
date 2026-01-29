// src/services/authService.ts
const API_BASE_URL = "http://localhost:8080/api";

interface LoginResponse {
  id: number;
  username: string;
  email: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      email: email.trim(),
      password: password.trim()
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Login failed');
  }

  return await response.json();
};