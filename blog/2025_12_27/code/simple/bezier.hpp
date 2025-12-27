#pragma once

#if defined DEBUG
#include <cassert>
#endif
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
	[[nodiscard]] constexpr point<N, numeric_t> operator() (const numeric_t
	) const noexcept
	{
		return *this;
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
	[[nodiscard]] constexpr point<N, numeric_t>
	operator+ (const point<N, numeric_t>& p) const noexcept
	{
		point<N> q;
		for (size_t i = 0; i < N; ++i) {
			q[i] = coords[i] + p[i];
		}
		return q;
	}

	[[nodiscard]] constexpr const auto& leftmost() const noexcept
	{
		return *this;
	}
	[[nodiscard]] constexpr const auto& rightmost() const noexcept
	{
		return *this;
	}
	[[nodiscard]] constexpr const auto& get_point(const size_t) const noexcept
	{
		return *this;
	}
};

template <typename>
struct is_point : std::false_type { };

template <size_t N, typename numeric_t>
struct is_point<point<N, numeric_t>> : std::true_type { };

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

	const T l;
	const U r;

	static constexpr size_t dimension =
		std::remove_cvref_t<decltype(std::declval<T>().leftmost())>::dimension;
	static constexpr size_t depth = 1 + T::depth;

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

static_assert(not is_bezier_v<int>);
static_assert(is_bezier_v<bezier<point<2>, point<2>>>);

/* ------------------------------------------------------------------ */

template <Point P, Point Q>
[[nodiscard]] constexpr auto operator| (const P& p, const Q& q) noexcept
{
	return bezier{.l = p, .r = q};
}

template <Bezier B, Point P>
[[nodiscard]] constexpr auto operator| (const B& b, const P& p) noexcept
{
	return bezier{.l = b, .r = b.r | p};
}

template <Point P, Bezier B>
[[nodiscard]] constexpr auto operator| (const P& p, const B& b) noexcept
{
	return bezier{.l = p | b.l, .r = b};
}

template <Point P, Point Q, Point... Rs>
[[nodiscard]] constexpr auto
bezier_from_points(const P& p, const Q& q, const Rs&...rs) noexcept
{
	if constexpr (sizeof...(Rs) == 0) {
		return p | q;
	}
	else {
		return p | bezier_from_points(q, rs...);
	}
}

namespace detail {

template <size_t i, Bezier T, Bezier U>
[[nodiscard]] constexpr auto
interpolate_bezier_and_point(const T& t, const U& u) noexcept
{
	auto b = t | u.get_point(i);
	if constexpr (i == U::depth) {
		return b;
	}
	else {
		return interpolate_bezier_and_point<i + 1>(b, u);
	}
}

} // namespace detail

template <Bezier T, Bezier U>
[[nodiscard]] constexpr auto operator| (const T& t, const U& u) noexcept
{
	return detail::interpolate_bezier_and_point<0>(t, u);
}
