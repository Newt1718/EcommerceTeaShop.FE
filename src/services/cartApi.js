import { getStoredTokens, refreshTokenManual } from "./authApi";

const API_BASE_URL =
  "https://teashop-api-e7bbf0cydwe2c0ay.southeastasia-01.azurewebsites.net/api";

const CART_ADDON_META_KEY = "cartAddonMetaByVariant";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80";

function toNumber(value, defaultValue = 0) {
  const converted = Number(value);
  return Number.isFinite(converted) ? converted : defaultValue;
}

function readAddonMetaMap() {
  try {
    const raw = localStorage.getItem(CART_ADDON_META_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    return {};
  }
}

function writeAddonMetaMap(nextMap) {
  try {
    localStorage.setItem(CART_ADDON_META_KEY, JSON.stringify(nextMap || {}));
  } catch (error) {
    // ignore storage failures
  }
}

function cacheAddonMetaForVariant({
  productVariantId,
  addonId,
  addonName,
  addonPrice,
  unitPrice,
}) {
  if (!productVariantId || !addonId) {
    return;
  }

  const map = readAddonMetaMap();
  map[String(productVariantId)] = {
    addonId: String(addonId),
    addonName: addonName || null,
    addonPrice: toNumber(addonPrice, 0),
    unitPrice: toNumber(unitPrice, 0),
    updatedAt: Date.now(),
  };
  writeAddonMetaMap(map);
}

function ensureCartAuthenticated() {
  const { accessToken } = getStoredTokens();
  if (!accessToken) {
    throw new Error("Vui long dang nhap de su dung gio hang.");
  }
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
  const addonInfo = rawItem?.addon || rawItem?.productAddon || rawItem?.design || {};

  const productId =
    pickField(rawItem, ["productId", "productID"], null) ||
    pickField(productInfo, ["productId", "productID"], null) ||
    pickField(variantInfo, ["productId", "productID"], null) ||
    `unknown-product-${index}`;

  const variantId =
    pickField(rawItem, ["productVariantId", "variantId", "id"], null) ||
    pickField(variantInfo, ["productVariantId", "variantId", "id"], null) ||
    `variant-${index}`;

  const cachedAddonMeta = readAddonMetaMap()[String(variantId)] || null;

  const cartItemId = pickField(rawItem, ["cartItemId"], null);

  const quantity = toNumber(
    pickField(rawItem, ["quantity", "qty"], 1),
    1,
  );

  const baseUnitPrice = toNumber(
    pickField(rawItem, ["unitPrice", "price", "variantPrice"], null) ??
      pickField(variantInfo, ["price", "unitPrice"], null),
    0,
  );

  const addonId =
    pickField(rawItem, ["addonId", "productAddonId", "designId"], null) ||
    pickField(addonInfo, ["id", "addonId", "productAddonId"], null) ||
    cachedAddonMeta?.addonId ||
    null;

  const addonName =
    pickField(rawItem, ["addonName", "designName"], null) ||
    pickField(addonInfo, ["name", "addonName", "designName"], null) ||
    cachedAddonMeta?.addonName ||
    null;

  const addonPrice = toNumber(
    pickField(rawItem, ["addonPrice", "designPrice"], null) ??
      pickField(addonInfo, ["price", "addonPrice"], null) ??
      cachedAddonMeta?.addonPrice,
    0,
  );

  const explicitLineTotal = toNumber(
    pickField(rawItem, ["lineTotal", "totalPrice", "amount", "subtotal"], null),
    Number.NaN,
  );

  const effectiveUnitPrice =
    Number.isFinite(explicitLineTotal) && quantity > 0
      ? explicitLineTotal / quantity
      : baseUnitPrice + addonPrice;

  const finalUnitPrice =
    effectiveUnitPrice > 0
      ? effectiveUnitPrice
      : toNumber(cachedAddonMeta?.unitPrice, 0);

  const weight = pickField(rawItem, ["gram", "weight", "size"], null);
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
      id: cartItemId || variantId,
      cartItemId,
      productVariantId: variantId,
      addonId,
      addonName,
      addonPrice,
      sizeLabel,
      unitPrice: finalUnitPrice,
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

    const sameDetail = existing.productDetails.find((detail) => {
      const sameId = detail.id === normalized.detail.id;
      const sameAddon = String(detail.addonId || "") === String(normalized.detail.addonId || "");
      return sameId && sameAddon;
    });

    if (sameDetail) {
      sameDetail.quantity += normalized.detail.quantity;
    } else {
      existing.productDetails.push(normalized.detail);
    }
  });

  return Array.from(groupedMap.values());
}

export function getCartApi() {
  ensureCartAuthenticated();
  return request("/cart", {
    method: "GET",
  });
}

export function addCartItemApi({
  productVariantId,
  addonId,
  addonName,
  addonPrice,
  unitPrice,
  quantity = 1,
}) {
  ensureCartAuthenticated();

  const body = {
    productVariantId,
    quantity,
  };

  if (addonId) {
    body.addonId = addonId;
    body.productAddonId = addonId;
    body.designId = addonId;

    cacheAddonMetaForVariant({
      productVariantId,
      addonId,
      addonName,
      addonPrice,
      unitPrice,
    });
  }

  return request("/cart/add", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updateCartItemApi({ cartItemId, quantity }) {
  ensureCartAuthenticated();

  const payload = JSON.stringify({
    cartItemId,
    quantity,
  });

  // Backend may expose this endpoint as PUT (common), but keep fallbacks
  // to PATCH/POST for compatibility across environments.
  return request("/cart/update", {
    method: "PUT",
    body: payload,
  }).catch((error) => {
    const statusText = String(error?.payload?.message || error?.message || "");

    if (!statusText.includes("405")) {
      throw error;
    }

    return request("/cart/update", {
      method: "PATCH",
      body: payload,
    }).catch((patchError) => {
      const patchStatusText = String(
        patchError?.payload?.message || patchError?.message || "",
      );

      if (!patchStatusText.includes("405")) {
        throw patchError;
      }

      return request("/cart/update", {
        method: "POST",
        body: payload,
      });
    });
  });
}

export function removeCartItemApi(cartItemId) {
  ensureCartAuthenticated();

  return request(`/cart/remove/${cartItemId}`, {
    method: "DELETE",
  });
}
