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

async function requestWithAuth(path, retry = true) {
  const { accessToken, refreshToken } = getStoredTokens();

  const requestAnonymous = () => fetch(`${API_BASE_URL}${path}`);

  // If there is no access token, call as anonymous directly.
  if (!accessToken) {
    return requestAnonymous();
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  if (response.status === 401 && retry) {
    // Do not try refresh flow when refresh token is absent.
    if (!refreshToken) {
      return response;
    }

    console.log(`[ProductApi] 401 at ${path}. Trying refresh...`);
    try {
      const refreshed = await refreshTokenManual();
      const retried = await fetch(`${API_BASE_URL}${path}`, {
        headers: {
          ...(refreshed?.accessToken
            ? { Authorization: `Bearer ${refreshed.accessToken}` }
            : {}),
        },
      });

      if (retried.status === 401) {
        // Endpoint may require auth and refreshed token is still invalid.
        return retried;
      }

      return retried;
    } catch (error) {
      console.log("[ProductApi] Refresh failed while requesting product/category API.");
      return response;
    }
  }

  return response;
}

async function get(path) {
  const response = await requestWithAuth(path, true);
  const payload = await parseResponse(response);

  if (!response.ok || !payload?.isSucess) {
    const error = new Error(payload?.message || "Yeu cau API that bai.");
    error.payload = payload;
    throw error;
  }

  return payload;
}

export function getProductsApi({ pageNumber = 1, pageSize = 10 } = {}) {
  return get(`/product?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

export function getProductDetailApi(productId) {
  return get(`/product/${productId}`);
}

export function searchProductsApi({ keyword, pageNumber = 1, pageSize = 10 }) {
  const encodedKeyword = encodeURIComponent(keyword || "");
  return get(
    `/product/search?keyword=${encodedKeyword}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );
}

export function getProductsByCategoryApi({
  categoryId,
  pageNumber = 1,
  pageSize = 10,
}) {
  return get(
    `/product/category/${categoryId}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );
}

export function getCategoriesApi({ pageNumber = 1, pageSize = 10 } = {}) {
  return get(`/category?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

export function searchCategoriesApi({
  keyword,
  pageNumber = 1,
  pageSize = 10,
}) {
  const encodedKeyword = encodeURIComponent(keyword || "");
  return get(
    `/category/search?keyword=${encodedKeyword}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );
}
