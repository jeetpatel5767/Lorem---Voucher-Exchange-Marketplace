// auth.ts
export const getCurrentUser = () => {
  const userData = localStorage.getItem('currentUser');
  return userData ? JSON.parse(userData) : null;
};

// Mock token function for compatibility (returns null since you don't need tokens)
export const getAuthToken = (): string | null => {
  return null;
};

// Simple login status check
export const isAuthenticated = (): boolean => {
  return !!getCurrentUser();
};

// Login function matching your current setup
export const login = (userData: {id: number, username: string, email: string}) => {
  localStorage.setItem('currentUser', JSON.stringify(userData));
};

// Logout function
export const logout = () => {
  localStorage.removeItem('currentUser');
};