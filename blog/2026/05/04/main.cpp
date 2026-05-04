#include <stdfloat>
#include <unordered_map>
#include <iostream>
#include <ostream>
#include <array>
#include <format>
#include <vector>
#include <print>
#include <meta>
#include <map>
#include <set>

#include "serializer.hpp"

struct W {
	int a, b;
	std::string name;
	std::string_view surname;
};

struct Q {
	std::array<int, 3> a;
	std::vector<int> v;
	std::vector<int> v_empty;
	std::vector<W> v_w;
	std::map<std::string, int> m;
	std::map<std::string, int> m_empty;
	std::map<std::string, std::string> m_2;
	std::map<std::string, std::pair<double, std::string>> m_3;
	std::map<std::string, W> m_w;
	std::set<int> s;
	std::set<int> s_empty;
};

struct S {
	char c;
	unsigned char uc;
	signed char sc;

	int8_t i8;
	uint8_t u8;
	
	std::pair<int, std::string> p;
	
	Q q;
	
	short s;
	unsigned short us;
	signed short ss;
	int16_t i16;
	uint16_t u16;

	int i;
	unsigned int ui;
	signed int si;
	int32_t i32;
	uint32_t u32;

	long l;
	unsigned long ul;
	signed long sl;
	int64_t i64;
	uint64_t u64;

	float f;
	double d;
	
	W w;
	
	std::float16_t f16;
	std::float32_t f32;
	std::float64_t f64;
};

int main() {
	S s{
		.c = 'a',
		.uc = 'a',
		.sc = 'a',

		.i8 = 80,
		.u8 = 81,
		
		.p = {33, "44"},
		
		.q = {
			.a = {1234, 5678, 1357},
			.v = {90, 80, 70, 60},
			.v_empty = {},
			.v_w = {
				{.a = 1, .b =  2, .name =  "3", .surname =  "4"},
				{.a = 5, .b =  6, .name =  "7", .surname =  "8"},
				{.a = 9, .b = 10, .name = "11", .surname = "12"}
			},
			.m = {
				{"A", 1},
				{"B", 2}
			},
			.m_empty = {},
			.m_2 = {
				{"B", "b"}
			},
			.m_3 = {
				{"C", {3.4, "c"}}
			},
			.m_w = {
				{"D", {.a = 11, .b = 12, .name = "Juliana", .surname = "Crain"}},
				{"E", {.a = 13, .b = 14, .name = "John", .surname = "Smith"}},
				{"F", {.a = 15, .b = 16, .name = "Helen", .surname = "Smith"}}
			},
			.s = {17, 18, 19, 20},
			.s_empty = {}
		},
		
		.s = 160,
		.us = 161,
		.ss = 162,
		.i16 = 163,
		.u16 = 164,

		.i = 320,
		.ui = 321,
		.si = 322,
		.i32 = 323,
		.u32 = 324,

		.l = 640,
		.ul = 641,
		.sl = 642,
		.i64 = 643,
		.u64 = 644,

		.f = 1.640,
		.d = 1.641,
		
		.w = {
			.a = 25,
			.b = 26,
			.name = "I'm a string",
			.surname = "I'm a string_view"
		},
		
		.f16 = static_cast<std::float16_t>(1.16),
		.f32 = static_cast<std::float32_t>(1.32),
		.f64 = 1.64
	};
	
	using formattable_types = JSON::parameter_pack<>;
	using ignore_types = JSON::parameter_pack<>;
	
	JSON::Printer<
		std::meta::access_context::unchecked(),
		formattable_types,
		ignore_types
	>
	printer(
		JSON::PrinterParams{
			.os = std::cout,
			.start = "",
			.sep = "    ",
			.use_tab = true
		}
	);
	printer.serialize(s);
	std::println("");
}
