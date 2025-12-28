#include <format>
#include <iostream>
#include <ostream>
#include <print>

template <typename T>
struct decorator {
	std::string_view prefix;
	const T& value;
	std::string_view suffix;
};

template <typename T>
[[nodiscard]] static inline decorator<T>
operator+ (std::string_view w, const T& t) noexcept
{
	std::cout << "    " << __PRETTY_FUNCTION__ << '\n';
	return decorator<T>{.prefix = w, .value = t, .suffix = ""};
}

template <typename T>
[[nodiscard]] static inline decorator<T>
operator+ (const T& t, std::string_view w) noexcept
{
	std::cout << "    " << __PRETTY_FUNCTION__ << '\n';
	return decorator<T>{.prefix = "", .value = t, .suffix = w};
}

template <typename T>
[[nodiscard]] static inline decorator<T>
operator+ (decorator<T> t, std::string_view w) noexcept
{
	std::cout << "    " << __PRETTY_FUNCTION__ << '\n';
	t.suffix = w;
	return t;
}

template <typename T>
[[nodiscard]] static inline decorator<T>
operator+ (std::string_view w, decorator<T> t) noexcept
{
	std::cout << "    " << __PRETTY_FUNCTION__ << '\n';
	t.prefix = w;
	return t;
}

// ---------------------------------------------------------------------

struct matrix {
	int n{};
	int m{};
};

template <>
struct std::formatter<decorator<matrix>> : std::formatter<std::string> {
	auto format(const decorator<matrix>& p, std::format_context& ctx) const
	{
		const auto& prefix = p.prefix;
		const matrix& M = p.value;
		const auto& suffix = p.suffix;
		auto out = ctx.out();
		for (int i = 0; i < M.n; ++i) {
			std::format_to(out, "{}x", prefix);
			for (int j = 1; j < M.m; ++j) {
				std::format_to(out, " x");
			}
			std::format_to(out, "{}", suffix);
			if (i < M.n - 1) {
				std::format_to(out, "\n");
			}
		}
		return out;
	}
};

template <>
struct std::formatter<matrix> : std::formatter<std::string> {
	auto format(const matrix& p, std::format_context& ctx) const
	{
		decorator dec{.prefix = "", .value = p, .suffix = ""};
		return std::format_to(ctx.out(), "{}", dec);
	}
};

static std::ostream& operator<< (std::ostream& os, const decorator<matrix>& M)
{
	std::format_to(std::ostreambuf_iterator<char>(os), "{}", M);
	return os;
}

static std::ostream& operator<< (std::ostream& os, const matrix& M)
{
	std::format_to(std::ostreambuf_iterator<char>(os), "{}", M);
	return os;
}

// ---------------------------------------------------------------------

int main()
{
	{
		auto p = "|   " + matrix(3, 4);
		static_assert(std::is_same_v<decltype(p.value), const matrix&>);
		static_assert(std::is_same_v<decltype(p), decorator<matrix>>);
	}
	{
		auto p = matrix(3, 4) + "   |";
		static_assert(std::is_same_v<decltype(p.value), const matrix&>);
		static_assert(std::is_same_v<decltype(p), decorator<matrix>>);
	}
	{
		auto p = "|   " + matrix(3, 4) + "   |";
		static_assert(std::is_same_v<decltype(p.value), const matrix&>);
		static_assert(std::is_same_v<decltype(p), decorator<matrix>>);
	}

	{
		matrix M(3, 4);
		auto p = "|   " + M;
		static_assert(std::is_same_v<decltype(p.value), const matrix&>);
		static_assert(std::is_same_v<decltype(p), decorator<matrix>>);
	}
	{
		matrix M(3, 4);
		auto p = M + "   |";
		static_assert(std::is_same_v<decltype(p.value), const matrix&>);
		static_assert(std::is_same_v<decltype(p), decorator<matrix>>);
	}
	{
		matrix M(3, 4);
		auto p = "|   " + M + "   |";
		static_assert(std::is_same_v<decltype(p.value), const matrix&>);
		static_assert(std::is_same_v<decltype(p), decorator<matrix>>);
	}

	{
		const matrix M(3, 4);
		auto p = "|   " + M;
		static_assert(std::is_same_v<decltype(p.value), const matrix&>);
		static_assert(std::is_same_v<decltype(p), decorator<matrix>>);
	}
	{
		const matrix M(3, 4);
		auto p = M + "   |";
		static_assert(std::is_same_v<decltype(p.value), const matrix&>);
		static_assert(std::is_same_v<decltype(p), decorator<matrix>>);
	}
	{
		const matrix M(3, 4);
		auto p = "|   " + M + "   |";
		static_assert(std::is_same_v<decltype(p.value), const matrix&>);
		static_assert(std::is_same_v<decltype(p), decorator<matrix>>);
	}

	{
		std::cout << "===================\n";
		std::cout << "R-values\n";
		std::cout << "-------------------\n";
		std::print("{}\n", matrix(3, 10));
		std::cout << "-------------------\n";
		std::cout << matrix(3, 10) << '\n';
		std::print("{}\n", "|   " + matrix(3, 10));
		std::cout << "-------------------\n";
		std::print("{}\n", matrix(3, 10) + "   |");
		std::cout << "-------------------\n";
		std::print("{}\n", "|   " + matrix(3, 10) + "   |");
		std::cout << "-------------------\n";
		std::cout << "|   " + matrix(3, 10) << '\n';
		std::cout << "-------------------\n";
		std::cout << matrix(3, 10) + "   |" << '\n';
		std::cout << "-------------------\n";
		std::cout << "|   " + matrix(3, 10) + "   |" << '\n';
	}
	{
		std::cout << "===================\n";
		std::cout << "L-values\n";
		matrix M(3, 4);
		std::cout << "-------------------\n";
		std::print("{}\n", M);
		std::cout << "-------------------\n";
		std::cout << M << '\n';
		std::cout << "-------------------\n";
		std::print("{}\n", "|   " + M);
		std::cout << "-------------------\n";
		std::print("{}\n", M + "   |");
		std::cout << "-------------------\n";
		std::print("{}\n", "|   " + M + "   |");
		std::cout << "-------------------\n";
		std::cout << "|   " + M << '\n';
		std::cout << "-------------------\n";
		std::cout << M + "   |" << '\n';
		std::cout << "-------------------\n";
		std::cout << "|   " + M + "   |" << '\n';
	}
	{
		std::cout << "===================\n";
		std::cout << "const L-values\n";
		const matrix M(3, 4);
		std::cout << "-------------------\n";
		std::print("{}\n", M);
		std::cout << "-------------------\n";
		std::cout << M << '\n';
		std::cout << "-------------------\n";
		std::print("{}\n", "|   " + M);
		std::cout << "-------------------\n";
		std::print("{}\n", M + "   |");
		std::cout << "-------------------\n";
		std::print("{}\n", "|   " + M + "   |");
		std::cout << "-------------------\n";
		std::cout << "|   " + M << '\n';
		std::cout << "-------------------\n";
		std::cout << M + "   |" << '\n';
		std::cout << "-------------------\n";
		std::cout << "|   " + M + "   |" << '\n';
	}
}
