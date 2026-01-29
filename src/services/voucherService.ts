// src/services/voucherService.ts
import { Voucher } from '../types';

const API_BASE_URL = "http://localhost:8080/api";

export const fetchUserVouchers = async (username: string): Promise<Voucher[]> => {
  const response = await fetch(`${API_BASE_URL}/vouchers/user/${username}`);
  
  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData || 'Failed to fetch vouchers');
  }

  return await response.json();
};

export const createVoucher = async (username: string, voucherData: Omit<Voucher, 'id' | 'ownerUsername'>): Promise<Voucher> => {
  const token = localStorage.getItem('authToken');
  
  const response = await fetch(`${API_BASE_URL}/vouchers/create/${username}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title: voucherData.title,
      description: voucherData.description,
      voucherCode: voucherData.voucherCode,
      expirationDate: `${voucherData.expirationDate}T23:59:59`, // Add time component
      status: voucherData.status || 'ACTIVE' // Use uppercase ACTIVE
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error:', errorText); // Add detailed error logging
    throw new Error(errorText || 'Failed to create voucher');
  }

  return await response.json();
};

export const fetchAvailableVouchers = async (): Promise<Voucher[]> => {
  const response = await fetch(`${API_BASE_URL}/available`);
  
  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData || 'Failed to fetch available vouchers');
  }

  return await response.json();
};