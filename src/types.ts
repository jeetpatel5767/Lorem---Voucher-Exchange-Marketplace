// Import from Firebase v9+ modular SDK
import { Timestamp } from 'firebase/firestore';

// src/types.ts
export interface Voucher {
  id: number;
  title: string;
  description: string;
  voucherCode: string;
  expirationDate: string;  // Changed from expiryDate to match backend
  ownerUsername: string;
  status: string;      // Made optional if not always provided
  createdAt?: string;     // Made optional if not always provided
}

export interface Notification {
  id: string;
  type: "exchange_request";
  voucherId: string;
  voucherTitle: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  timestamp: Timestamp; // Fixed - no more 'firebase' namespace
  status: "pending" | "accepted" | "rejected";
}