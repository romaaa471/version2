// api.js - frontend helper for talking to the Node backend

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

import { useAuth } from '@clerk/clerk-react';

export async function getAuthToken() {
  // This will be called from components that have access to useAuth hook
  // For API calls, we'll pass the token directly
  return null;
}

async function buildHeaders(withAuth = false, getToken = null) {
  const headers = {
    "Content-Type": "application/json"
  };

  if (withAuth && getToken) {
    try {
      const token = await getToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Failed to get auth token:", error);
    }
  }

  return headers;
}

export async function createOrderApi(orderPayload, getToken) {
  const headers = await buildHeaders(true, getToken);
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers,
    body: JSON.stringify(orderPayload)
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Create order failed");
  }

  return res.json(); // { orderId }
}

export async function getMyOrdersApi(getToken) {
  const headers = await buildHeaders(true, getToken);
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: "GET",
    headers
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch orders");
  }

  return res.json(); // { orders: [...] }
}

export async function getOrderByIdApi(orderId, getToken) {
  const headers = await buildHeaders(true, getToken);
  const res = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: "GET",
    headers
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch order");
  }

  return res.json(); // { order }
}
