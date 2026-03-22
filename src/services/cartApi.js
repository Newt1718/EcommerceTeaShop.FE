import { getStoredTokens, refreshTokenManual } from "./authApi";

const API_BASE_URL =
  "https://teashop-api-e7bbf0cydwe2c0ay.southeastasia-01.azurewebsites.net/api";

const CART_ADDON_META_KEY = "cartAddonMetaByVariant";

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

function pickFromMany(objects, keys, defaultValue = null) {
  for (const obj of objects) {
    const value = pickField(obj, keys, null);
    if (value !== null && value !== undefined) {
      return value;
    }
  }
  return defaultValue;
}

function extractImageUrl(image) {
  if (!image) {
    return null;
  }

  if (typeof image === "string") {
    return image;
  }

  if (typeof image !== "object") {
    return null;
  }

  return (
    image.imageUrl ||
    image.url ||
    image.path ||
    image.src ||
    image.thumbnail ||
    image.thumbnailUrl ||
    image.imagePath ||
    image.filePath ||
    null
  );
}

function extractProductImage(data) {
  const directCandidates = [
    data?.imageUrl,
    data?.thumbnail,
    data?.thumbnailUrl,
    data?.coverImage,
    data?.mainImage,
    data?.image,
    data?.imagePath,
    data?.filePath,
  ];

  const direct = directCandidates.find((value) => Boolean(value));
  if (direct) {
    return direct;
  }

  const imageLists = [
    data?.images,
    data?.productImages,
    data?.imageResponses,
    data?.productImageResponses,
  ];

  for (const list of imageLists) {
    if (!Array.isArray(list)) {
      continue;
    }

    const preferred = list.find((img) =>
      Boolean(img?.isMain || img?.isPrimary || img?.isDefault || img?.isMainImage),
    );

    const preferredUrl = extractImageUrl(preferred);
    if (preferredUrl) {
      return preferredUrl;
    }

    for (const image of list) {
      const url = extractImageUrl(image);
      if (url) {
        return url;
      }
    }
  }

  return null;
}

function normalizeCartItem(rawItem, index) {
  const productCandidates = [
    rawItem?.product,
    rawItem?.productInfo,
    rawItem?.productResponse,
    rawItem?.productDto,
    rawItem?.productDTO,
    rawItem?.item,
    rawItem?.tea,
    rawItem?.variant?.product,
    rawItem?.productVariant?.product,
  ].filter((item) => item && typeof item === "object");

  const variantCandidates = [
    rawItem?.variant,
    rawItem?.productVariant,
    rawItem?.variantInfo,
    rawItem?.variantResponse,
    rawItem?.productVariantResponse,
    rawItem?.detail,
  ].filter((item) => item && typeof item === "object");

  const addonCandidates = [
    rawItem?.addon,
    rawItem?.productAddon,
    rawItem?.design,
    rawItem?.addonInfo,
  ].filter((item) => item && typeof item === "object");

  const allSources = [rawItem, ...productCandidates, ...variantCandidates];

  const productId =
    pickFromMany(allSources, ["productId", "productID"], null) ||
    pickFromMany(productCandidates, ["id", "productID"], null) ||
    `unknown-product-${index}`;

  const variantId =
    pickFromMany(
      [rawItem, ...variantCandidates],
      [
        "productVariantId",
        "productVariantID",
        "variantId",
        "variantID",
        "productDetailId",
        "id",
      ],
      null,
    ) ||
    `variant-${index}`;

  const cachedAddonMeta = readAddonMetaMap()[String(variantId)] || null;

  const cartItemId = pickField(rawItem, ["cartItemId", "cartDetailId", "id"], null);

  const quantity = toNumber(
    pickFromMany([rawItem, ...variantCandidates], ["quantity", "qty", "count", "amount"], 1),
    1,
  );

  const baseUnitPrice = toNumber(
    pickFromMany(
      [rawItem, ...variantCandidates],
      [
        "unitPrice",
        "price",
        "variantPrice",
        "basePrice",
        "itemPrice",
        "productPrice",
      ],
      null,
    ),
    0,
  );

  const addonId =
    pickFromMany([rawItem, ...addonCandidates], ["addonId", "productAddonId", "designId", "id"], null) ||
    cachedAddonMeta?.addonId ||
    null;

  const addonName =
    pickFromMany([rawItem, ...addonCandidates], ["addonName", "designName", "name"], null) ||
    cachedAddonMeta?.addonName ||
    null;

  const addonPrice = toNumber(
    pickFromMany([rawItem, ...addonCandidates], ["addonPrice", "designPrice", "price"], null) ??
      cachedAddonMeta?.addonPrice,
    0,
  );

  const explicitLineTotal = toNumber(
    pickFromMany(
      [rawItem, ...variantCandidates],
      [
        "lineTotal",
        "totalPrice",
        "totalAmount",
        "amount",
        "subtotal",
        "lineAmount",
        "finalPrice",
      ],
      null,
    ),
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
  const sizeUnit = pickFromMany([rawItem, ...variantCandidates], ["sizeLabel", "unit", "weightUnit"], "g");
  const sizeLabel =
    weight !== null && weight !== undefined
      ? `${weight}${sizeUnit}`
      : pickFromMany([rawItem, ...variantCandidates], ["sizeLabel", "variantName", "name"], "Mac dinh");

  const name =
    pickFromMany(allSources, ["productName", "name", "title"], null) ||
    "San pham";

  const imgSources = [
    rawItem,
    ...productCandidates,
    ...variantCandidates,
    rawItem?.productImage,
    rawItem?.image,
    rawItem?.thumbnail,
  ];
  const img = imgSources.map(extractProductImage).find((value) => Boolean(value)) || null;

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
