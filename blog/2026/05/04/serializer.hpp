#pragma once

#include <type_traits>
#include <concepts>
#include <ranges>

namespace JSON {

template <typename... pack_t>
struct parameter_pack { };

namespace detail {

template <typename type_t, typename... pack_t>
struct is_in_pack;

template <typename type_t, typename head_t, typename... pack_t>
struct is_in_pack<type_t, head_t, pack_t...> {
	using type_t_ = std::remove_cvref_t<type_t>;
	using head_t_ = std::remove_cvref_t<head_t>;
	static constexpr bool value =
		std::is_same_v<type_t_, head_t_> or
		is_in_pack<type_t, pack_t...>::value;
};

template <typename type_t>
struct is_in_pack<type_t> {
	static constexpr bool value = false;
};

template <typename type_t, typename... pack_t>
constexpr inline bool is_in_pack_v = is_in_pack<type_t, pack_t...>::value;

template <typename type_t>
concept range_like = std::ranges::range<type_t>;

template <typename type_t>
concept numeric =
	std::integral<type_t> or
	std::floating_point<type_t>;

template <typename type_t>
concept string_like =
	std::is_same_v<char, type_t> or
	std::is_same_v<std::string, type_t> or
	std::is_same_v<std::string_view, type_t>;

template <typename type_t>
concept map_like =
	std::ranges::range<type_t> and
	requires(type_t m) {
		typename type_t::key_type;
		typename type_t::mapped_type;
	};

template <typename type_t>
concept array_like =
	std::ranges::range<type_t> and
	not map_like<type_t>;

} // -- namespace detail

struct PrinterParams {
	std::ostream& os;
	std::string_view start = "";
	std::string_view sep = "    ";
	bool use_tab = true;
};

template <
	std::meta::access_context ctx,
	typename formattable_t,
	typename ignore_t
>
class Printer;

template <
	std::meta::access_context ctx,
	typename... formattable_t,
	typename... ignore_t
>
class Printer<
	ctx,
	parameter_pack<formattable_t...>, 
	parameter_pack<ignore_t...>
>
{
public:

	Printer(const PrinterParams& params)
		: m_os(params.os),
		  m_initial_tab_size(params.start.size()),
		  m_sep(params.sep),
		  m_use_tab(params.use_tab)
	{
		m_full_tab.reserve(m_initial_tab_size + 32 * m_sep.size());
		m_full_tab += params.start;
	}

	template <typename value_t>
	void serialize(const value_t& s, const size_t depth = 0)
	{
		const std::string_view tab = make_tabulator(depth);
		const std::string_view tab1 = make_tabulator(depth + 1);
		
		static constexpr auto fields = std::define_static_array(
			std::meta::nonstatic_data_members_of(^^value_t, ctx)
		);
		
		std::println(m_os, "{{");
		
		const size_t last_index = [&]() -> size_t {
			size_t i = 0;
			template for (constexpr auto field : fields)
			{
				constexpr auto type = std::meta::type_of(field);
				using regular_t = std::remove_cvref_t<typename [: type :]>;
				static constexpr bool should_be_printed =
					not detail::is_in_pack_v< regular_t, ignore_t...>;
				
				if constexpr (should_be_printed) {
					++i;
				}
			}
			return i;
		}();
		
		size_t i = 0;
		template for (constexpr auto field : fields)
		{
			constexpr auto type = std::meta::type_of(field);
			using regular_t = std::remove_cvref_t<typename [: type :]>;
			static constexpr bool should_be_printed =
				not detail::is_in_pack_v<regular_t, ignore_t...>;
			
			constexpr std::string_view field_name = std::meta::identifier_of(field);
			
			if constexpr (should_be_printed) {
				
				std::print(m_os, "{}\"{}\": ", tab1, field_name);
				serialize_element(s.[: field :], depth + 1);
				
				if (i < last_index - 1) {
					std::println(m_os, ",");
				}
				else {
					std::println(m_os, "");
				}
			}
			
			++i;
		}
		
		std::print(m_os, "{}}}", tab);
	}

private:

	template <typename type_t>
	void serialize_element(const type_t& value, const size_t depth)
	{
		if constexpr (detail::string_like<type_t>) {
			std::print(m_os, "\"{}\"", value);
		}
		else if constexpr (detail::numeric<type_t>) {
			std::print(m_os, "{}", value);
		}
		else if constexpr (detail::range_like<type_t>) {
			serialize_range(value, depth);
		}
		else if constexpr (std::meta::is_class_type(^^type_t)) {
			serialize(value, depth);
		}
		else {
			static_assert(false);
		}
	}

	template <typename iterator_t>
	void serialize_range_associative(
		const iterator_t begin,
		const iterator_t end,
		const size_t size,
		const size_t depth
	)
	{
		std::print(m_os, "{{");
		if (size == 0) {
			std::print(m_os, "}}");
			return;
		}
		
		const std::string_view tab = make_tabulator(depth);
		const std::string_view tab1 = make_tabulator(depth + 1);
		
		std::println(m_os, "");
		{
			const auto& key = begin->first;
			const auto& value = begin->second;
			std::print(m_os, "{}\"{}\": ", tab1, key);
			serialize_element(value, depth + 1);
		}
		
		iterator_t it = begin;
		++it;
		for (; it != end; ++it) {
			const auto& key = it->first;
			const auto& value = it->second;
			std::println(m_os, ",");
			std::print(m_os, "{}\"{}\": ", tab1, key);
			serialize_element(value, depth + 1);
		}
		
		std::println(m_os, "");
		std::print(m_os, "{}]", tab);
	}

	template <detail::map_like value_t>
	void serialize_range(const value_t& m, const size_t depth)
	{
		serialize_range_associative(m.begin(), m.end(), m.size(), depth);
	}

	template <typename iterator_t>
	void serialize_range_nonassociative(
		const iterator_t begin,
		const iterator_t end,
		const size_t size,
		const size_t depth
	)
	{
		std::print(m_os, "[");
		if (size == 0) {
			std::print(m_os, "]");
			return;
		}
		
		const std::string_view tab = make_tabulator(depth);
		const std::string_view tab1 = make_tabulator(depth + 1);
		
		std::println(m_os, "");
		std::print(m_os, "{}", tab1);
		serialize_element(*begin, depth + 1);
		
		iterator_t it = begin;
		++it;
		for (; it != end; ++it) {
			std::println(m_os, ", ");
			std::print(m_os, "{}", tab1);
			serialize_element(*it, depth + 1);
		}
		
		std::println(m_os, "");
		std::print(m_os, "{}]", tab);
	}

	template <detail::array_like value_t>
	void serialize_range(const value_t& a, const size_t depth)
	{
		serialize_range_nonassociative(a.begin(), a.end(), a.size(), depth);
	}

private:

	std::ostream& m_os;

	std::string m_full_tab;
	const size_t m_initial_tab_size;
	const std::string_view m_sep;

	const bool m_use_tab;

private:

	[[nodiscard]] std::string_view make_tabulator(const size_t depth)
	noexcept
	{
		if (not m_use_tab) {
			return "";
		}
		
		const size_t current_tab_length =
			m_initial_tab_size + depth * m_sep.size();
		
		if (current_tab_length >= m_full_tab.size()) {
			m_full_tab += std::string{m_sep};
		}
		return std::string_view{m_full_tab.data(), current_tab_length};
	}

};

}
