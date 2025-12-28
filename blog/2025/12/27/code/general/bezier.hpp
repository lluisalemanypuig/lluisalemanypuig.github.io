#pragma once

#if defined DEBUG
#include <cassert>
#endif
#include <type_traits>
#include <generator>
#include <utility>
#include <cstddef>
#include <array>

template <size_t N, typename numeric_t = float>
struct point {
	std::array<numeric_t, N> coords;
	static constexpr size_t dimension = N;
	static constexpr size_t depth = 0;

	[[nodiscard]] constexpr numeric_t operator[] (const size_t i) const noexcept
	{
#if defined DEBUG
		assert(i < N);
#endif
		return coords[i];
	}
	[[nodiscard]] constexpr numeric_t& operator[] (const size_t i) noexcept
	{
#if defined DEBUG
		assert(i < N);
#endif
		return coords[i];
	}

	[[nodiscard]] constexpr bool operator== (const point<N, numeric_t>& p
	) const noexcept
	{
		return coords == p.coords;
	}

	[[nodiscard]] constexpr point<N, numeric_t> operator* (const numeric_t t
	) const noexcept
	{
		point<N> q;
		for (size_t i = 0; i < N; ++i) {
			q[i] = t * coords[i];
		}
		return q;
	}
	[[nodiscard]] constexpr point<N, numeric_t> operator() (const numeric_t
	) const noexcept
	{
		return *this;
	}

	[[nodiscard]] constexpr point<N, numeric_t>
	operator+ (const point<N, numeric_t>& p) const noexcept
	{
		point<N> q;
		for (size_t i = 0; i < N; ++i) {
			q[i] = coords[i] + p[i];
		}
		return q;
	}

	[[nodiscard]] constexpr const point<N, numeric_t>& leftmost() const noexcept
	{
		return *this;
	}
	[[nodiscard]] constexpr const point<N, numeric_t>&
	rightmost() const noexcept
	{
		return *this;
	}
	[[nodiscard]] constexpr const point<N, numeric_t>& get_point(const size_t
	) const noexcept
	{
		return *this;
	}
};

template <typename>
struct is_point : std::false_type { };

template <size_t N, typename T>
struct is_point<point<N, T>> : std::true_type { };

template <typename T>
constexpr bool is_point_v = is_point<std::remove_cvref_t<T>>::value;

template <typename T>
concept Point = is_point_v<T>;

template <size_t N, typename numeric_t = float>
std::ostream& operator<< (std::ostream& os, const point<N, numeric_t>& p)
{
	if constexpr (N > 0) {
		os << p[0];
		for (size_t i = 1; i < N; ++i) {
			os << ' ' << p[i];
		}
	}
	return os;
}

/* ------------------------------------------------------------------ */

template <typename T, typename U, typename numeric_t = float>
struct bezier {
	using left_type = T;
	using right_type = U;

	T l;
	U r;

	static constexpr size_t dimension =
		std::remove_cvref_t<decltype(std::declval<left_type>().leftmost()
		)>::dimension;

	static constexpr size_t depth = 1 + std::remove_cvref_t<left_type>::depth;

	[[nodiscard]] constexpr point<dimension, numeric_t>
	operator() (const numeric_t t) const noexcept
	{
		return l(t) * (numeric_t(1.0) - t) + r(t) * t;
	}

	[[nodiscard]] constexpr size_t size() const noexcept
	{
		return depth + 1;
	}

	[[nodiscard]] constexpr const auto& leftmost() const noexcept
	{
		return l.leftmost();
	}
	[[nodiscard]] constexpr const auto& rightmost() const noexcept
	{
		return r.rightmost();
	}
	[[nodiscard]] constexpr const auto& get_point(const size_t i) const noexcept
	{
#if defined DEBUG
		assert(i <= depth);
#endif
		if (i == 0) {
			return leftmost();
		}
		if (i == depth) {
			return rightmost();
		}
		return l.get_point(i);
	}

	std::generator<const point<dimension, numeric_t>&> generate_points() const
	{
		for (size_t i = 0; i <= depth; ++i) {
			co_yield get_point(i);
		}
	}
};

template <typename>
struct is_bezier : std::false_type { };

template <typename T, typename U, typename numeric_t>
struct is_bezier<bezier<T, U, numeric_t>> : std::true_type { };

template <typename T>
constexpr bool is_bezier_v = is_bezier<std::remove_cvref_t<T>>::value;

template <typename T>
concept Bezier = is_bezier_v<T>;

/* ------------------------------------------------------------------ */

template <Point P, Point Q>
[[nodiscard]] constexpr auto operator| (P&& p, Q&& q) noexcept
{
	return bezier<P, Q>{.l = std::forward<P>(p), .r = std::forward<Q>(q)};
}

template <Point P, Bezier B>
[[nodiscard]] constexpr auto operator| (P&& p, B&& b) noexcept
{
	using left_subtype = typename std::remove_cvref_t<B>::left_type;

	auto res = std::forward<P>(p) | std::forward<left_subtype>(b.l);
	return bezier<decltype(res), B>{
		.l = std::move(res), .r = std::forward<B>(b)
	};
}

template <Bezier B, Point P>
[[nodiscard]] constexpr auto operator| (B&& b, P&& p) noexcept
{
	using right_subtype = typename std::remove_cvref_t<B>::right_type;

	auto res = std::forward<right_subtype>(b.r) | std::forward<P>(p);
	return bezier<B, decltype(res)>{
		.l = std::forward<B>(b), .r = std::move(res)
	};
}

template <Point P, Point Q, Point... Rs>
[[nodiscard]] constexpr auto
bezier_from_points(P&& p, Q&& q, Rs&&...rs) noexcept
{
	if constexpr (sizeof...(Rs) == 0) {
		return std::forward<P>(p) | std::forward<Q>(q);
	}
	else {
		return std::forward<P>(p) |
			   bezier_from_points(std::forward<Q>(q), std::forward<Rs>(rs)...);
	}
}

namespace detail {

template <size_t i, Bezier T, Bezier U>
[[nodiscard]] constexpr auto interpolate_bezier_and_point(T&& t, U&& u) noexcept
{
	auto b = std::forward<T>(t) | u.get_point(i);
	if constexpr (i == std::remove_cvref_t<U>::depth) {
		return b;
	}
	else {
		return interpolate_bezier_and_point<i + 1>(
			std::move(b), std::forward<U>(u)
		);
	}
}

} // namespace detail

template <Bezier T, Bezier U>
[[nodiscard]] constexpr auto operator| (T&& t, U&& u) noexcept
{
	return detail::interpolate_bezier_and_point<0>(
		std::forward<T>(t), std::forward<U>(u)
	);
}
