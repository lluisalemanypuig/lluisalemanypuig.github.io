#pragma once

template <typename T, typename lpoint_t, typename rpoint_t>
consteval int test_bezier1() noexcept
{
	if constexpr (T::dimension != 2) {
		return 1;
	}
	if constexpr (T::depth != 1) {
		return 2;
	}
	if constexpr (not std::is_same_v<decltype(std::declval<T>().l), lpoint_t>) {
		return 3;
	}
	if constexpr (not std::is_same_v<decltype(std::declval<T>().r), rpoint_t>) {
		return 4;
	}
	if constexpr (not std::is_same_v<T, const bezier<lpoint_t, rpoint_t>>) {
		return 5;
	}
	return 0;
}

template <
	typename T,
	typename point1_t,
	typename point2_t,
	typename point3_t,
	typename lbezier_t,
	typename rbezier_t>
consteval int test_bezier2() noexcept
{
	if constexpr (T::dimension != 2) {
		return 1;
	}
	if constexpr (T::depth != 2) {
		return 2;
	}
	if constexpr (not std::
					  is_same_v<decltype(std::declval<T>().l.l), point1_t>) {
		return 3;
	}
	if constexpr (not std::
					  is_same_v<decltype(std::declval<T>().l.r), point2_t>) {
		return 4;
	}
	if constexpr (not std::
					  is_same_v<decltype(std::declval<T>().r.l), point2_t>) {
		return 5;
	}
	if constexpr (not std::
					  is_same_v<decltype(std::declval<T>().r.r), point3_t>) {
		return 6;
	}
	if constexpr (not std::is_same_v<typename T::left_type, lbezier_t>) {
		return 7;
	}
	if constexpr (not std::is_same_v<typename T::right_type, rbezier_t>) {
		return 8;
	}
	if constexpr (not std::is_same_v<T, const bezier<lbezier_t, rbezier_t>>) {
		return 9;
	}
	return 0;
}

template <
	typename T,
	typename point1_t,
	typename point2_t,
	typename point3_t,
	typename point4_t,
	typename llbezier_t,
	typename lrbezier_t,
	typename rlbezier_t,
	typename rrbezier_t,
	typename lbezier_t,
	typename rbezier_t>
consteval int test_bezier3() noexcept
{
	if constexpr (T::dimension != 2) {
		return 1;
	}
	if constexpr (T::depth != 3) {
		return 2;
	}
	if constexpr (not std::is_same_v<
					  decltype(std::declval<T>().l.l.l),
					  point1_t>) {
		return 3;
	}
	if constexpr (not std::is_same_v<
					  decltype(std::declval<T>().l.l.r),
					  point2_t>) {
		return 4;
	}
	if constexpr (not std::is_same_v<
					  decltype(std::declval<T>().l.r.l),
					  point2_t>) {
		return 5;
	}
	if constexpr (not std::is_same_v<
					  decltype(std::declval<T>().l.r.r),
					  point3_t>) {
		return 6;
	}

	if constexpr (not std::is_same_v<
					  decltype(std::declval<T>().r.l.l),
					  point2_t>) {
		return 7;
	}
	if constexpr (not std::is_same_v<
					  decltype(std::declval<T>().r.l.r),
					  point3_t>) {
		return 8;
	}
	if constexpr (not std::is_same_v<
					  decltype(std::declval<T>().r.r.l),
					  point3_t>) {
		return 9;
	}
	if constexpr (not std::is_same_v<
					  decltype(std::declval<T>().r.r.r),
					  point4_t>) {
		return 10;
	}

	if constexpr (not std::is_same_v<typename T::left_type, lbezier_t>) {
		return 11;
	}
	if constexpr (not std::is_same_v<typename T::right_type, rbezier_t>) {
		return 12;
	}

	if constexpr (not std::
					  is_same_v<typename T::left_type::left_type, llbezier_t>) {
		return 13;
	}
	if constexpr (not std::is_same_v<
					  typename T::left_type::right_type,
					  lrbezier_t>) {
		return 14;
	}

	if constexpr (not std::is_same_v<
					  typename T::right_type::left_type,
					  rlbezier_t>) {
		return 15;
	}
	if constexpr (not std::is_same_v<
					  typename T::right_type::right_type,
					  rrbezier_t>) {
		return 16;
	}

	if constexpr (not std::is_same_v<
						T, const bezier<lbezier_t, rbezier_t>
					  >) {
		return 17;
	}
	return 0;
}
