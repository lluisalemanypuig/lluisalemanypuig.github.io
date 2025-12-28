#include <iostream>

#include "bezier.hpp"

int main()
{
	const point<2> A{0, 0};
	const point<2> B{2, 3};
	const point<2> C{4, 3};
	const point<2> D{6, -3};
	const point<2> E{8, -3};
	const point<2> F{10, 0};

	const auto AB = A | B;
	const auto BC = B | C;
	const auto CD = C | D;
	const auto DE = D | E;
	const auto EF = E | F;
	std::cout << "AB:  " << AB(0.5) << '\n';
	std::cout << "BC:  " << BC(0.5) << '\n';
	std::cout << "CD:  " << CD(0.5) << '\n';
	std::cout << "DE:  " << DE(0.5) << '\n';
	std::cout << "EF:  " << EF(0.5) << '\n';
	static_assert(decltype(AB)::dimension == 2);
	static_assert(decltype(AB)::depth == 1);
	static_assert(decltype(BC)::dimension == 2);
	static_assert(decltype(BC)::depth == 1);
	static_assert(decltype(CD)::dimension == 2);
	static_assert(decltype(CD)::depth == 1);
	static_assert(decltype(DE)::dimension == 2);
	static_assert(decltype(DE)::depth == 1);
	static_assert(decltype(EF)::dimension == 2);
	static_assert(decltype(EF)::depth == 1);

	const auto ABC = A | B | C;
	const auto BCD = B | C | D;
	const auto CDE = C | D | E;
	const auto DEF = D | E | F;
	std::cout << "ABC: " << ABC(0.5) << '\n';
	std::cout << "BCD: " << BCD(0.5) << '\n';
	std::cout << "CDE: " << CDE(0.5) << '\n';
	std::cout << "DEF: " << DEF(0.5) << '\n';
	static_assert(decltype(ABC)::dimension == 2);
	static_assert(decltype(ABC)::depth == 2);
	static_assert(decltype(BCD)::dimension == 2);
	static_assert(decltype(BCD)::depth == 2);
	static_assert(decltype(CDE)::dimension == 2);
	static_assert(decltype(CDE)::depth == 2);
	static_assert(decltype(DEF)::dimension == 2);
	static_assert(decltype(DEF)::depth == 2);

	std::cout << "-----------------\n";
	std::cout << "ABC.depth=  " << ABC.depth << '\n';
	std::cout << "ABC.size()= " << ABC.size() << '\n';
	for (const point<2>& p : ABC.generate_points()) {
		std::cout << p << '\n';
	}

	std::cout << "-----------------\n";
	const auto ABCDEF_func = bezier_from_points(A, B, C, D, E, F);
	static_assert(decltype(ABCDEF_func)::dimension == 2);
	static_assert(decltype(ABCDEF_func)::depth == 5);
	std::cout << "ABCDEF_func.depth=  " << ABCDEF_func.depth << '\n';
	std::cout << "ABCDEF_func.size()= " << ABCDEF_func.size() << '\n';
	for (const point<2>& p : ABCDEF_func.generate_points()) {
		std::cout << p << '\n';
	}

	std::cout << "-----------------\n";
	const auto ABCDEF_op = ABC | DEF;
	static_assert(decltype(ABCDEF_op)::dimension == 2);
	static_assert(decltype(ABCDEF_op)::depth == 5);
	std::cout << "ABCDEF_op.depth=  " << ABCDEF_op.depth << '\n';
	std::cout << "ABCDEF_op.size()= " << ABCDEF_op.size() << '\n';
	for (const point<2>& p : ABCDEF_op.generate_points()) {
		std::cout << p << '\n';
	}
}
