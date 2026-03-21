import { getStoredTokens, refreshTokenManual } from "./authApi";

const API_BASE_URL =
  "https://teashop-api-e7bbf0cydwe2c0ay.southeastasia-01.azurewebsites.net/api";

async function parseResponse(response) {
  let payload = null;
  try {
    payload = await response.json();
  } catch (error) {
    payload = {
      isSucess: false,
      message: `Khong doc duoc du lieu (HTTP ${response.status}).`,
      data: null,
      businessCode: 0,
    };
  }
  return payload;
}

async function requestWithAuth(path, options = {}, retry = true) {
  const { accessToken, refreshToken } = getStoredTokens();
  const hasBody = options?.body !== undefined;
  const isFormDataBody =
    typeof FormData !== "undefined" && options?.body instanceof FormData;

  const buildHeaders = (token) => ({
    ...(hasBody && !isFormDataBody ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options?.headers || {}),
  });

  const requestAnonymous = () =>
    fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: buildHeaders(null),
    });

  if (!accessToken) {
    return requestAnonymous();
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: buildHeaders(accessToken),
  });

  if (response.status === 401 && retry) {
    if (!refreshToken) {
      return response;
    }

    try {
      const refreshed = await refreshTokenManual();
      return fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: buildHeaders(refreshed?.accessToken),
      });
    } catch (error) {
      return response;
    }
  }

  return response;
}

async function request(path, options = {}) {
  const response = await requestWithAuth(path, options, true);
  const payload = await parseResponse(response);

  if (!response.ok || !payload?.isSucess) {
    const error = new Error(payload?.message || "Yeu cau API that bai.");
    error.payload = payload;
    throw error;
  }

  return payload;
}

export function getAdminOrdersApi({
  sort = "newest",
  type = "all",
  pageNumber = 1,
  pageSize = 10,
} = {}) {
  const query = new URLSearchParams({
    sort,
    type,
    pageNumber: String(pageNumber),
    pageSize: String(pageSize),
  });

  return request(`/AdminOrder?${query.toString()}`, {
    method: "GET",
  });
}

export function getAdminOrderDetailApi(orderId) {
  return request(`/AdminOrder/${orderId}`, {
    method: "GET",
  });
}

export function getAdminOrderStatsApi() {
  return request(`/AdminOrder/stats`, {
    method: "GET",
  });
}
