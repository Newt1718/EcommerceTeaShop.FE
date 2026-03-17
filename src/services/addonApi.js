import { getStoredTokens, refreshTokenManual } from "./authApi";

const API_BASE_URL =
  "https://teashop-api-e7bbf0cydwe2c0ay.southeastasia-01.azurewebsites.net/api";

async function parseResponse(response) {
  try {
    return await response.json();
  } catch (error) {
    return {
      isSucess: false,
      data: null,
      businessCode: 0,
      message: `Yeu cau that bai (HTTP ${response.status}).`,
    };
  }
}

async function requestWithAuth(path, retry = true) {
  const { accessToken, refreshToken } = getStoredTokens();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  if (response.status === 401 && retry && refreshToken) {
    try {
      const refreshed = await refreshTokenManual();
      return fetch(`${API_BASE_URL}${path}`, {
        method: "GET",
        headers: {
          ...(refreshed?.accessToken
            ? { Authorization: `Bearer ${refreshed.accessToken}` }
            : {}),
        },
      });
    } catch (error) {
      return response;
    }
  }

  return response;
}

export async function getAddonsApi() {
  const response = await requestWithAuth("/Addon", true);

  const payload = await parseResponse(response);

  if (!response.ok || !payload?.isSucess) {
    if (response.status === 401) {
      throw new Error("Vui long dang nhap de xem danh sach add-on.");
    }
    throw new Error(payload?.message || "Khong tai duoc danh sach addon.");
  }

  return payload;
}
