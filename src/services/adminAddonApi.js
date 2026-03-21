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
    const error = new Error(payload?.message || "Khong the thuc hien yeu cau add-on admin.");
    error.payload = payload;
    throw error;
  }

  return payload;
}

export function getAdminAddonsApi({ pageNumber = 1, pageSize = 50 } = {}) {
  return request(`/AdminAddon/list?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
    method: "GET",
  });
}

export function createAdminAddonApi({ name, description, price, imageFile }) {
  const formData = new FormData();
  formData.append("Name", name || "");
  formData.append("Description", description || "");
  formData.append("Price", String(Number(price || 0)));

  if (imageFile) {
    formData.append("Image", imageFile);
  }

  return request("/AdminAddon/create", {
    method: "POST",
    body: formData,
  });
}

export function updateAdminAddonApi({ addonId, name, description, price, imageFile, isActive }) {
  const formData = new FormData();
  formData.append("Name", name || "");
  formData.append("Description", description || "");
  formData.append("Price", String(Number(price || 0)));

  if (imageFile) {
    formData.append("Image", imageFile);
  }

  if (typeof isActive === "boolean") {
    formData.append("IsActive", String(isActive));
  }

  return request(`/AdminAddon/update/${addonId}`, {
    method: "PUT",
    body: formData,
  });
}

export function deleteAdminAddonApi(addonId) {
  return request(`/AdminAddon/delete/${addonId}`, {
    method: "DELETE",
  });
}

export function getAdminAddonsByProductApi(productId) {
  return request(`/AdminAddon/product/${productId}`, {
    method: "GET",
  });
}

export async function assignAdminAddonsToProductApi(productId, addonIds = []) {
  const normalizedAddonIds = Array.from(
    new Set(
      (Array.isArray(addonIds) ? addonIds : [])
        .map((item) => String(item || "").trim())
        .filter(Boolean),
    ),
  );

  const candidateRequests = [
    {
      method: "PUT",
      body: JSON.stringify({ addonIds: normalizedAddonIds }),
    },
    {
      method: "POST",
      body: JSON.stringify({ addonIds: normalizedAddonIds }),
    },
    {
      method: "PUT",
      body: JSON.stringify(normalizedAddonIds),
    },
    {
      method: "POST",
      body: JSON.stringify(normalizedAddonIds),
    },
  ];

  let lastError = null;

  for (const candidate of candidateRequests) {
    try {
      return await request(`/AdminAddon/assign/${productId}`, candidate);
    } catch (error) {
      lastError = error;
      const message = String(error?.message || "").toLowerCase();
      const shouldTryNext =
        message.includes("405") ||
        message.includes("415") ||
        message.includes("400") ||
        message.includes("unsupported") ||
        message.includes("invalid");

      if (!shouldTryNext) {
        throw error;
      }
    }
  }

  throw lastError || new Error("Khong the gan add-on cho san pham.");
}
