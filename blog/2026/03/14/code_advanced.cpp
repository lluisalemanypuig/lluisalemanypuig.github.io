#include <print>
#include <iostream>
#include <concepts>
#include <string_view>

template <typename type_t>
concept is_char_like =
	std::is_same_v<type_t, char> or std::is_same_v<type_t, unsigned char> or
	std::is_same_v<type_t, signed char>;

template <is_char_like char_t, auto... Ts>
struct literal_range { };

template <typename char_t, char_t... chars>
[[nodiscard]] constexpr auto operator""_lr () noexcept
{
	return literal_range<char_t, chars...>{};
}

static_assert(std::is_same_v<
			  decltype("hello"_lr),
			  decltype(literal_range<char, 'h', 'e', 'l', 'l', 'o'>{})>);

static_assert(not std::is_same_v<
			  decltype("hello"_lr),
			  decltype(literal_range<char, 'h', 'e', 'l', 'l', 'o', 'w'>{})>);

static_assert(not std::is_same_v<
			  decltype("hello"_lr),
			  decltype(literal_range<char, 'h', 'e', 'l', 'l'>{})>);

template <is_char_like T, auto... Ts, is_char_like U, auto... Us>
[[nodiscard]] constexpr auto
operator+ (literal_range<T, Ts...>, literal_range<U, Us...>) noexcept
{
	// std::common_type allows dangerous implicit conversions, and
	// the actual library implementation uses its own implementation
	// of std::common_type
	using common_type = std::common_type_t<T, U>;
	return literal_range<common_type, Ts..., Us...>{};
}

static_assert(std::is_same_v<
			  decltype(literal_range<char, '1', '2', '3', '4'>{}),
			  decltype("12"_lr + "34"_lr)>);
static_assert(std::is_same_v<
			  decltype(literal_range<char, '1', '2', 'a', 'b'>{}),
			  decltype("12"_lr + "ab"_lr)>);
static_assert(std::is_same_v<
			  decltype("12"_lr + "34"_lr + "asdf"_lr),
			  decltype(literal_range<
					   char,
					   '1',
					   '2',
					   '3',
					   '4',
					   'a',
					   's',
					   'd',
					   'f'>{})>);

template <is_char_like char_t, auto... Ts>
constexpr inline const char str[] = {char_t(Ts)..., char_t('\0')};

template <is_char_like char_t, auto... chars>
[[nodiscard]] constexpr const char_t *
as_c_str(literal_range<char_t, chars...>) noexcept
{
	return str<char_t, chars...>;
}

constexpr auto path1 = as_c_str("asdf"_lr);
constexpr const char *path2 = as_c_str("asdf"_lr + "/"_lr + "qwer"_lr);

int main()
{
	constexpr auto p1 = as_c_str("asdf"_lr);
	constexpr const char *p2 = as_c_str("asdf"_lr + "/"_lr + "qwer"_lr);

	const std::string s1{as_c_str("asdf"_lr)};
	const std::string s2{as_c_str("asdf"_lr + "/"_lr + "qwer"_lr)};

	std::cout << path1 << " | " << path2 << '\n';
	std::cout << s1 << " | " << s2 << '\n';
	std::cout << p1 << " | " << p2 << '\n';
}
