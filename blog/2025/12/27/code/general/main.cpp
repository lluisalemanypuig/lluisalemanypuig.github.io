#define DOCTEST_CONFIG_IMPLEMENT
#include <doctest/doctest.h>

#include <iostream>

#include "bezier.hpp"

#include "assertions_bezier.hpp"
#include "assertions_point.hpp"
#include "checks.hpp"

TEST_CASE("full")
{
	const point<2> A{0, 0};
	const point<2> B{2, 3};
	const point<2> C{4, 3};
	const point<2> D{6, -3};
	const point<2> E{8, -3};
	const point<2> F{10, 0};
	static_assert(std::is_same_v<decltype(A), const point<2>>);
	static_assert(std::is_same_v<decltype(A), const point<2, float>>);

	const auto AB = A | B;
	const auto BC = B | C;
	const auto CD = C | D;
	const auto DE = D | E;
	const auto EF = E | F;
	CHECK_EQ(AB(0.5), point<2>{1, 1.5});
	CHECK_EQ(AB.get_point(0), A);
	CHECK_EQ(AB.get_point(1), B);
	CHECK_EQ(BC(0.5), point<2>{3, 3});
	CHECK_EQ(BC.get_point(0), B);
	CHECK_EQ(BC.get_point(1), C);
	CHECK_EQ(CD(0.5), point<2>{5, 0});
	CHECK_EQ(CD.get_point(0), C);
	CHECK_EQ(CD.get_point(1), D);
	CHECK_EQ(DE(0.5), point<2>{7, -3});
	CHECK_EQ(DE.get_point(0), D);
	CHECK_EQ(DE.get_point(1), E);
	CHECK_EQ(EF(0.5), point<2>{9, -1.5});
	CHECK_EQ(EF.get_point(0), E);
	CHECK_EQ(EF.get_point(1), F);
	static_assert(
		test_bezier1<decltype(AB), const point<2>&, const point<2>&>() == 0
	);

	{
		const auto De = D | point<2>{8, -3};
		static_assert(
			test_bezier1<decltype(De), const point<2>&, point<2>>() == 0
		);
		CHECK_EQ(De(0.5), DE(0.5));
		CHECK_EQ(De.get_point(0), D);
		CHECK_EQ(De.get_point(1), E);

		const auto dE = point<2>{6, -3} | E;
		static_assert(
			test_bezier1<decltype(dE), point<2>, const point<2>&>() == 0
		);
		CHECK_EQ(dE(0.5), DE(0.5));
		CHECK_EQ(dE.get_point(0), D);
		CHECK_EQ(dE.get_point(1), E);

		const auto de = point<2>{6, -3} | point<2>{8, -3};
		static_assert(test_bezier1<decltype(de), point<2>, point<2>>() == 0);
		CHECK_EQ(de(0.5), DE(0.5));
		CHECK_EQ(de.get_point(0), D);
		CHECK_EQ(de.get_point(1), E);
	}

	const auto ABC = AB | C;
	const auto BCD = BC | D;
	const auto CDE = CD | E;
	const auto DEF = DE | F;
	CHECK_EQ(ABC(0.5), point<2>{2, 2.25});
	CHECK_EQ(BCD(0.5), point<2>{4, 1.5});
	CHECK_EQ(CDE(0.5), point<2>{6, -1.5});
	CHECK_EQ(DEF(0.5), point<2>{8, -2.25});
	static_assert(
		test_bezier2<
			decltype(ABC),
			const point<2>&,
			const point<2>&,
			const point<2>&,
			const bezier1_constpoint&,
			bezier1_constpoint>() == 0
	);
	CHECK_EQ(ABC.get_point(0), A);
	CHECK_EQ(ABC.get_point(1), B);
	CHECK_EQ(ABC.get_point(2), C);

	{
		const auto AB_c = AB | point<2>{4, 3};
		static_assert(
			test_bezier2<
				decltype(AB_c),
				const point<2>&,
				const point<2>&,
				point<2>,
				const bezier1_constpoint&,
				bezier<const point<2>&, point<2>>>() == 0
		);
		CHECK_EQ(AB_c(0.5), ABC(0.5));
		CHECK_EQ(AB_c.get_point(0), A);
		CHECK_EQ(AB_c.get_point(1), B);
		CHECK_EQ(AB_c.get_point(2), C);

		const auto a_BC = point<2>{0, 0} | BC;
		static_assert(
			test_bezier2<
				decltype(a_BC),
				point<2>,
				const point<2>&,
				const point<2>&,
				bezier<point<2>, const point<2>&>,
				const bezier1_constpoint&>() == 0
		);
		CHECK_EQ(a_BC(0.5), ABC(0.5));
		CHECK_EQ(a_BC.get_point(0), A);
		CHECK_EQ(a_BC.get_point(1), B);
		CHECK_EQ(a_BC.get_point(2), C);

		const auto A_BC = A | BC;
		static_assert(
			test_bezier2<
				decltype(A_BC),
				const point<2>&,
				const point<2>&,
				const point<2>&,
				bezier1_constpoint,
				const bezier1_constpoint&>() == 0
		);
		CHECK_EQ(A_BC(0.5), ABC(0.5));
		CHECK_EQ(A_BC.get_point(0), A);
		CHECK_EQ(A_BC.get_point(1), B);
		CHECK_EQ(A_BC.get_point(2), C);

		const auto A_B_C = A | B | C;
		static_assert(
			test_bezier2<
				decltype(A_B_C),
				const point<2>&,
				const point<2>&,
				const point<2>&,
				bezier1_constpoint,
				bezier1_constpoint>() == 0
		);
		CHECK_EQ(A_B_C(0.5), ABC(0.5));
		CHECK_EQ(A_B_C.get_point(0), A);
		CHECK_EQ(A_B_C.get_point(1), B);
		CHECK_EQ(A_B_C.get_point(2), C);

		const auto A_B_c = A | B | point<2>{4, 3};
		static_assert(
			test_bezier2<
				decltype(A_B_c),
				const point<2>&,
				const point<2>&,
				point<2>,
				bezier1_constpoint,
				bezier<const point<2>&, point<2>>>() == 0
		);
		CHECK_EQ(A_B_c(0.5), ABC(0.5));
		CHECK_EQ(A_B_c.get_point(0), A);
		CHECK_EQ(A_B_c.get_point(1), B);
		CHECK_EQ(A_B_c.get_point(2), C);

		const auto A_b_C = A | point<2>{2, 3} | C;
		static_assert(
			test_bezier2<
				decltype(A_b_C),
				const point<2>&,
				point<2>,
				const point<2>&,
				bezier<const point<2>&, point<2>>,
				bezier<point<2>, const point<2>&>>() == 0
		);
		CHECK_EQ(A_b_C(0.5), ABC(0.5));
		CHECK_EQ(A_b_C.get_point(0), A);
		CHECK_EQ(A_b_C.get_point(1), B);
		CHECK_EQ(A_b_C.get_point(2), C);

		const auto a_B_C = point<2>{0, 0} | B | C;
		static_assert(
			test_bezier2<
				decltype(a_B_C),
				point<2>,
				const point<2>&,
				const point<2>&,
				bezier<point<2>, const point<2>&>,
				bezier1_constpoint>() == 0
		);
		CHECK_EQ(a_B_C(0.5), ABC(0.5));
		CHECK_EQ(a_B_C.get_point(0), A);
		CHECK_EQ(a_B_C.get_point(1), B);
		CHECK_EQ(a_B_C.get_point(2), C);

		const auto a_b_C = point<2>{0, 0} | point<2>{2, 3} | C;
		static_assert(
			test_bezier2<
				decltype(a_b_C),
				point<2>,
				point<2>,
				const point<2>&,
				bezier1,
				bezier<point<2>, const point<2>&>>() == 0
		);
		CHECK_EQ(a_b_C(0.5), ABC(0.5));
		CHECK_EQ(a_b_C.get_point(0), A);
		CHECK_EQ(a_b_C.get_point(1), B);
		CHECK_EQ(a_b_C.get_point(2), C);

		const auto a_B_c = point<2>{0, 0} | B | point<2>{4, 3};
		static_assert(
			test_bezier2<
				decltype(a_B_c),
				point<2>,
				const point<2>&,
				point<2>,
				bezier<point<2>, const point<2>&>,
				bezier<const point<2>&, point<2>>>() == 0
		);
		CHECK_EQ(a_B_c(0.5), ABC(0.5));
		CHECK_EQ(a_B_c.get_point(0), A);
		CHECK_EQ(a_B_c.get_point(1), B);
		CHECK_EQ(a_B_c.get_point(2), C);

		const auto A_b_c = A | point<2>{2, 3} | point<2>{4, 3};
		static_assert(
			test_bezier2<
				decltype(A_b_c),
				const point<2>&,
				point<2>,
				point<2>,
				bezier<const point<2>&, point<2>>,
				bezier1>() == 0
		);
		CHECK_EQ(A_b_c(0.5), ABC(0.5));
		CHECK_EQ(A_b_c.get_point(0), A);
		CHECK_EQ(A_b_c.get_point(1), B);
		CHECK_EQ(A_b_c.get_point(2), C);

		const auto a_b_c = point<2>{0, 0} | point<2>{2, 3} | point<2>{4, 3};
		static_assert(
			test_bezier2<
				decltype(a_b_c),
				point<2>,
				point<2>,
				point<2>,
				bezier1,
				bezier1>() == 0
		);
		CHECK_EQ(a_b_c(0.5), ABC(0.5));
		CHECK_EQ(a_b_c.get_point(0), A);
		CHECK_EQ(a_b_c.get_point(1), B);
		CHECK_EQ(a_b_c.get_point(2), C);
	}

	const auto ABCD_func = bezier_from_points(A, B, C, D);
	static_assert(
		test_bezier3<
			decltype(ABCD_func),
			const point<2>&,
			const point<2>&,
			const point<2>&,
			const point<2>&,

			bezier1_constpoint,
			bezier1_constpoint,
			bezier1_constpoint,
			bezier1_constpoint,

			bezier<bezier1_constpoint, bezier1_constpoint>,
			bezier<bezier1_constpoint, bezier1_constpoint>>() == 0
	);

	{
		const auto ABCd_func = bezier_from_points(A, B, C, point<2>{6, -3});
		static_assert(
			test_bezier3<
				decltype(ABCd_func),
				const point<2>&,
				const point<2>&,
				const point<2>&,
				point<2>,

				bezier1_constpoint,
				bezier1_constpoint,
				bezier1_constpoint,
				bezier<const point<2>&, point<2>>,

				bezier<bezier1_constpoint, bezier1_constpoint>,
				bezier<bezier1_constpoint, bezier<const point<2>&, point<2>>>>(
			) == 0
		);
		CHECK_EQ(ABCd_func(0.5), ABCD_func(0.5));
	}

	const auto ABCD_op = AB | CD;
	static_assert(
		test_bezier3<
			decltype(ABCD_op),
			const point<2>&,
			const point<2>&,
			const point<2>&,
			const point<2>&,

			const bezier1_constpoint&,
			bezier1_constpoint,
			bezier1_constpoint,
			bezier1_constpoint,

			bezier<const bezier1_constpoint&, bezier1_constpoint>,
			bezier<bezier1_constpoint, bezier1_constpoint>

			>() == 0
	);
	CHECK_EQ(ABCD_op(0.5), ABCD_func(0.5));

	{
		const auto AB_C_D_op = AB | C | D;
		static_assert(
			test_bezier3<
				decltype(AB_C_D_op),
				const point<2>&,
				const point<2>&,
				const point<2>&,
				const point<2>&,

				const bezier1_constpoint&,
				bezier1_constpoint,
				bezier1_constpoint,
				bezier1_constpoint,

				bezier<const bezier1_constpoint&, bezier1_constpoint>,
				bezier<bezier1_constpoint, bezier1_constpoint>

				>() == 0
		);
		CHECK_EQ(AB_C_D_op(0.5), ABCD_op(0.5));

		const auto AB_C_d_op = AB | C | point<2>{6, -3};
		static_assert(
			test_bezier3<
				decltype(AB_C_d_op),
				const point<2>&,
				const point<2>&,
				const point<2>&,
				point<2>,

				const bezier1_constpoint&,
				bezier1_constpoint,
				bezier1_constpoint,
				bezier<const point<2>&, point<2>>,

				bezier<const bezier1_constpoint&, bezier1_constpoint>,
				bezier<bezier1_constpoint, bezier<const point<2>&, point<2>>>

				>() == 0
		);
		CHECK_EQ(AB_C_d_op(0.5), ABCD_op(0.5));

		const auto AB_c_D_op = AB | point<2>{4, 3} | D;
		static_assert(
			test_bezier3<
				decltype(AB_c_D_op),
				const point<2>&,
				const point<2>&,
				point<2>,
				const point<2>&,

				const bezier1_constpoint&,
				bezier<const point<2>&, point<2>>,
				bezier<const point<2>&, point<2>>,
				bezier<point<2>, const point<2>&>,

				bezier<
					const bezier1_constpoint&,
					bezier<const point<2>&, point<2>>>,
				bezier<
					bezier<const point<2>&, point<2>>,
					bezier<point<2>, const point<2>&>>

				>() == 0
		);
		CHECK_EQ(AB_c_D_op(0.5), ABCD_op(0.5));
	}
}

int main(int argc, char **argv)
{
	doctest::Context context;
	context.applyCommandLine(argc, argv);

	const int res = context.run(); // run doctest

	// important - query flags (and --exit) rely on the user doing this
	if (context.shouldExit()) {
		// propagate the result of the tests
		return res;
	}

	return res;
}
