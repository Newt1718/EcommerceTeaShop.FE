import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createRatingApi,
  getMyRatingProductsApi,
  getProductRatingSummaryApi,
} from "../../services/ratingApi";

const formatDate = (value) => {
  if (!value) {
    return "";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return parsed.toLocaleDateString("vi-VN");
};

const Reviews = ({ productId }) => {
  const { isAuthenticated } = useSelector(
    (state) => state.auth || { isAuthenticated: false },
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadingEligibility, setLoadingEligibility] = useState(false);
  const [canRateProduct, setCanRateProduct] = useState(false);
  const [submittingRating, setSubmittingRating] = useState(false);
  const [ratingForm, setRatingForm] = useState({
    star: 5,
    comment: "",
  });
  const [summary, setSummary] = useState({
    averageRating: 0,
    totalReviews: 0,
    items: [],
  });

  const loadRatings = useCallback(async () => {
    if (!productId) {
      setSummary({ averageRating: 0, totalReviews: 0, items: [] });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await getProductRatingSummaryApi(productId);

      const data = response?.data || {};
      const mappedItems = Array.isArray(data?.items)
        ? data.items.map((item) => ({
            id: item?.id,
            star: Number(item?.star || 0),
            comment: item?.comment || "",
            userName: item?.userName || "Ẩn danh",
            createdAt: item?.createdAt || "",
          }))
        : [];

      setSummary({
        averageRating: Number(data?.averageRating || 0),
        totalReviews: Number(data?.totalReviews || 0),
        items: mappedItems,
      });
    } catch (apiError) {
      setError(apiError?.message || "Không tải được đánh giá sản phẩm.");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadRatings();
  }, [loadRatings]);

  useEffect(() => {
    let mounted = true;

    const loadEligibility = async () => {
      if (!isAuthenticated || !productId) {
        if (mounted) {
          setCanRateProduct(false);
        }
        return;
      }

      try {
        setLoadingEligibility(true);
        const response = await getMyRatingProductsApi();
        if (!mounted) {
          return;
        }

        const products = Array.isArray(response?.data) ? response.data : [];
        const allowed = products.some(
          (item) => String(item?.productId || "") === String(productId),
        );
        setCanRateProduct(allowed);
      } catch (apiError) {
        if (mounted) {
          setCanRateProduct(false);
        }
      } finally {
        if (mounted) {
          setLoadingEligibility(false);
        }
      }
    };

    loadEligibility();

    return () => {
      mounted = false;
    };
  }, [isAuthenticated, productId]);

  const averageLabel = useMemo(() => summary.averageRating.toFixed(1), [summary.averageRating]);

  const handleRatingInputChange = (event) => {
    const { name, value } = event.target;
    setRatingForm((prev) => ({
      ...prev,
      [name]: name === "star" ? Number(value) : value,
    }));
  };

  const handleSubmitRating = async (event) => {
    event.preventDefault();

    if (!productId) {
      toast.error("Không xác định được sản phẩm để đánh giá.");
      return;
    }

    if (!canRateProduct) {
      toast.info("Bạn cần mua sản phẩm này trước khi đánh giá.");
      return;
    }

    if (!ratingForm.star || ratingForm.star < 1 || ratingForm.star > 5) {
      toast.error("Số sao phải từ 1 đến 5.");
      return;
    }

    try {
      setSubmittingRating(true);
      const response = await createRatingApi({
        productId,
        star: ratingForm.star,
        comment: ratingForm.comment?.trim() || "",
      });

      toast.success(response?.message || "Gửi đánh giá thành công.");
      setRatingForm({ star: 5, comment: "" });
      await loadRatings();
    } catch (apiError) {
      toast.error(apiError?.message || "Gửi đánh giá thất bại.");
    } finally {
      setSubmittingRating(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <h3 className="text-xl font-bold text-[#0d1b10]">Đánh giá sản phẩm</h3>

      {isAuthenticated && (
        <form
          onSubmit={handleSubmitRating}
          className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-bold text-[#0d1b10]">Viết đánh giá của bạn</p>
            <p className="text-xs text-gray-500">
              {loadingEligibility
                ? "Đang kiểm tra quyền đánh giá..."
                : canRateProduct
                  ? "Bạn có thể đánh giá sản phẩm này"
                  : "Cần mua sản phẩm để đánh giá"}
            </p>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600">Số sao</label>
            <select
              name="star"
              value={ratingForm.star}
              onChange={handleRatingInputChange}
              disabled={!canRateProduct || loadingEligibility || submittingRating}
              className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
            >
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>
                  {value} sao
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600">Nhận xét</label>
            <textarea
              name="comment"
              rows={3}
              value={ratingForm.comment}
              onChange={handleRatingInputChange}
              disabled={!canRateProduct || loadingEligibility || submittingRating}
              placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
              className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!canRateProduct || loadingEligibility || submittingRating}
            className="rounded-lg bg-primary px-5 py-2 text-sm font-bold text-[#0d1b10] disabled:opacity-60"
          >
            {submittingRating ? "Đang gửi..." : "Gửi đánh giá"}
          </button>
        </form>
      )}

      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">Điểm trung bình</p>
            <p className="text-3xl font-black text-[#0d1b10]">{averageLabel}/5</p>
          </div>
          <p className="text-sm font-medium text-gray-600">{summary.totalReviews} đánh giá</p>
        </div>
      </div>

      {loading && (
        <div className="rounded-xl border border-gray-100 bg-white p-5 text-sm text-gray-500">
          Đang tải đánh giá...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white px-5">
          {summary.items.length === 0 ? (
            <div className="py-6 text-sm text-gray-500">Chưa có đánh giá nào cho sản phẩm này.</div>
          ) : (
            summary.items.map((item) => (
              <div key={item.id || `${item.userName}-${item.createdAt}`} className="py-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-bold text-[#0d1b10]">{item.userName}</p>
                  <p className="text-xs text-gray-400">{formatDate(item.createdAt)}</p>
                </div>

                <div className="mt-1 flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={`${item.id}-star-${index}`} className="material-symbols-outlined text-[16px]">
                      {index < item.star ? "star" : "star_outline"}
                    </span>
                  ))}
                </div>

                <p className="mt-2 text-sm leading-relaxed text-gray-700">{item.comment || "Không có nhận xét."}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Reviews;
