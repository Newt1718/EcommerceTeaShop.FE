import { getStoredTokens, refreshTokenManual } from "./authApi";

const API_BASE_URL =
  "https://teashop-api-e7bbf0cydwe2c0ay.southeastasia-01.azurewebsites.net/api";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80";

function toNumber(value, defaultValue = 0) {
  const converted = Number(value);
  return Number.isFinite(converted) ? converted : defaultValue;
}

async function parseResponse(response) {
  let payload = null;
  try {
    payload = await response.json();
  } catch (error) {
    payload = {
      isSucess: false,
      data: null,
      businessCode: 0,
      message: `Yeu cau that bai (HTTP ${response.status}).`,
    };
  }
  return payload;
}

async function requestWithAuth(path, options = {}, retry = true) {
  const { accessToken } = getStoredTokens();
  const hasBody = options?.body !== undefined;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(options?.headers || {}),
    },
  });

  if (response.status === 401 && retry) {
    const refreshed = await refreshTokenManual();
    return fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        ...(hasBody ? { "Content-Type": "application/json" } : {}),
        ...(refreshed?.accessToken
          ? { Authorization: `Bearer ${refreshed.accessToken}` }
          : {}),
        ...(options?.headers || {}),
      },
    });
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

function pickField(obj, keys, defaultValue = null) {
  for (const key of keys) {
    if (obj && obj[key] !== undefined && obj[key] !== null) {
      return obj[key];
    }
  }
  return defaultValue;
}

function normalizeCartItem(rawItem, index) {
  const productInfo = rawItem?.product || {};
  const variantInfo = rawItem?.variant || rawItem?.productVariant || {};

  const productId =
    pickField(rawItem, ["productId", "productID"], null) ||
    pickField(productInfo, ["productId", "productID"], null) ||
    pickField(variantInfo, ["productId", "productID"], null) ||
    `unknown-product-${index}`;

  const variantId =
    pickField(rawItem, ["productVariantId", "variantId", "id"], null) ||
    pickField(variantInfo, ["productVariantId", "variantId", "id"], null) ||
    `variant-${index}`;

  const quantity = toNumber(
    pickField(rawItem, ["quantity", "qty"], 1),
    1,
  );

  const unitPrice = toNumber(
    pickField(rawItem, ["unitPrice", "price", "variantPrice"], null) ??
      pickField(variantInfo, ["price", "unitPrice"], null),
    0,
  );

  const weight = pickField(rawItem, ["weight", "size"], null);
  const sizeUnit = pickField(rawItem, ["sizeLabel", "unit", "weightUnit"], "g");
  const sizeLabel =
    weight !== null && weight !== undefined
      ? `${weight}${sizeUnit}`
      : pickField(rawItem, ["sizeLabel", "variantName", "name"], "Mac dinh");

  const name =
    pickField(rawItem, ["productName", "name"], null) ||
    pickField(productInfo, ["name", "productName"], null) ||
    "San pham";

  const img =
    pickField(rawItem, ["imageUrl", "img", "image"], null) ||
    pickField(productInfo, ["imageUrl", "thumbnail", "img"], null) ||
    FALLBACK_IMAGE;

  return {
    productId,
    name,
    img,
    detail: {
      id: variantId,
      productVariantId: variantId,
      addonId: pickField(rawItem, ["addonId"], null),
      sizeLabel,
      unitPrice,
      quantity,
    },
  };
}

export function normalizeCartProducts(cartData) {
  const items = Array.isArray(cartData)
    ? cartData
    : cartData?.items || cartData?.cartItems || cartData?.details || [];

  const groupedMap = new Map();

  items.forEach((rawItem, index) => {
    const normalized = normalizeCartItem(rawItem, index);
    const existing = groupedMap.get(normalized.productId);

    if (!existing) {
      groupedMap.set(normalized.productId, {
        productId: normalized.productId,
        name: normalized.name,
        img: normalized.img,
        productDetails: [normalized.detail],
      });
      return;
    }

    const sameDetail = existing.productDetails.find(
      (detail) => detail.id === normalized.detail.id,
    );

    if (sameDetail) {
      sameDetail.quantity += normalized.detail.quantity;
    } else {
      existing.productDetails.push(normalized.detail);
    }
  });

  return Array.from(groupedMap.values());
}

export function getCartApi() {
  return request("/cart", {
    method: "GET",
  });
}

export function addCartItemApi({ productVariantId, addonId, quantity = 1 }) {
  const body = {
    productVariantId,
    quantity,
  };

  if (addonId) {
    body.addonId = addonId;
  }

  return request("/cart/add", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
