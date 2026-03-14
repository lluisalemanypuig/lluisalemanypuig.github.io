#include <string_view>
#include <iostream>

[[nodiscard]] constexpr size_t size(const std::string_view s) noexcept
{
	return s.size();
}

static_assert(size("") == 0);
static_assert(size("a") == 1);
static_assert(size("ab") == 2);
static_assert(size("abc") == 3);
static_assert(size("abcd") == 4);

template <typename... Params>
[[nodiscard]] constexpr size_t total_size(Params... ps) noexcept
{
	return (size(ps) + ...);
}

static_assert(total_size("", "") == 0);
static_assert(total_size("", "a") == 1);
static_assert(total_size("a", "a") == 2);
static_assert(total_size("ab", "") == 2);
static_assert(total_size("ab", "c") == 3);
static_assert(total_size("a", "bc") == 3);
static_assert(total_size("ab", "cd") == 4);
static_assert(total_size("/", "home", "/", "lol", "/", "Documents") == 19);

template <typename Param>
constexpr void copy(std::string& str, size_t& i, Param p)
{
	const std::string_view strv(p);
	for (size_t j = 0; j < strv.size(); ++j) {
		str[i++] = strv[j];
	}
}

template <typename Param, typename... Params>
constexpr void copy(std::string& str, size_t& i, Param p, Params... ps)
{
	const std::string_view strv(p);
	for (size_t j = 0; j < strv.size(); ++j) {
		str[i++] = strv[j];
	}
	copy(str, i, ps...);
}

template <typename... Params>
[[nodiscard]] constexpr std::string concatenate(Params... ps)
{
	size_t str_size = total_size(ps...);
	std::string str;
	str.resize(str_size, ' ');
	size_t i = 0;
	copy(str, i, ps...);
	return str;
}

static_assert(
	concatenate("/", "home", "/", "lol", "/", "Documents") ==
	"/home/lol/Documents"
);

int main()
{
	const auto s = concatenate("/", "home", "/", "lol", "/", "Documents");

	std::cout << '\'' << s << '\'' << '\n';
}
