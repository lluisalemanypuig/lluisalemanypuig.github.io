# Basic C++26 reflection concepts in a class serializer

Version 16.1.0 of gcc was [released recently](https://gcc.gnu.org/releases.html), and it is only fair that we start exploring its [new capabilities](https://isocpp.org/blog/2026/04/gcc-16.1) as fast as we can as if we were to win a prize or something, in particular, [reflection](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html). In this post, are described new functions and syntax to help you get started with reflection. In particular, I talk about the new type `std::meta::info`, the new reflection operator `^^` and the splicer operator `[: ... :]`, and the new functions in C++26

- `std::meta::access_context::unchecked`,
- `std::define_static_array`,
- `std::meta::nonstatic_data_members_of`,
- `std::meta::type_of`,
- `std::meta::display_string_of`,

all of this for the purposes of writing a [basic serializer](/blog/2026/05/04/serializer.hpp) for C++ (only output).

## Purpose of reflection

The purpose of reflection in C++ is to have _compile-time_ features that are capable of representing program elements (functions, classes, member variables, member functions, ...). This representation is achieved via the type `std::meta::info`, whose characteristics can be queried via a number of so-called [reflection queries](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html#meta.reflection.queries-reflection-queries). For example, we can query whether a `std::meta::info` object represents a class type or not using `std::meta::is_class_type`.

## The reflection operator `^^`

But how do even obtain a `std::meta::info` object? We do this via the reflection [operator `^^`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html#the-reflection-operator). This is an operator that is written to the left of an expression, called _reflected value_. Such an expression can be, for example, a whole user-defined type, or a member variable of a struct, a function's name, ...:

```c++
struct S {
	int x;
	double y;
};

int get_x(const S& s) noexcept { return s.x; }

int main() {
	constexpr std::meta::info S_info = ^^S;
	constexpr std::meta::info x_info = ^^S::x;
	constexpr std::meta::info f_info = ^^get_x;
}
```

All the `*_info` variables are objects of type `std::meta::info` which can be queried via the reflection queries mentioned above. Almost all of the functions in the `std::meta` namespace require an object of this type. The exact contents of the `std::meta::info` type can be found [here](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html#stdmetainfo), but it is best to think of this type as a wrapper of the reflected value that contains structural information that the compiler can use to retrieve type information for any reflected value, member variables for structured types, parameter list for functions, ...

## The splice operator `[: :]`

A very simple example of usage of the variable `x_info` is to write an if statement that does one action or another depending on the type of `S::x`; this is a very stupid example for illustration purposes only since we already know its type, or we could query it using `decltype(S::x)` but it is good enough for an introductory example. The problem here is that the `std::meta::info` objects are not object type names (such as `"S"` for `S_info`, or `"x"` for `x_info`) or actual types (such as `S` for `S_info`, or `int` for `x_info`). And to do anything interesting with them, such as writing something like

```c++
if constexpr (std::is_same_v<x_info::type, int>) {}
```

is not possible without the shiny new splice operator. Recall that `x_info` contains the information necessary to "build" the type, not the type itself. So we begin by retrieving the object that contains its type information

```c++
constexpr std::meta::info x_info_type = std::meta::type_of(x_info);
```

and now we can get the actual type of `S::x` by applying the [splice operator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html#splicers):

```c++
using x_type = [: x_info_type :];
```

This operator should be seen as something that brings the `std::meta::info` objects back to reality from wherever these things live. By "reality", I mean actual code. That is, the result of `[: x_info_type :]` is, really, `int`. Now we can write our `if constexpr` above using `x_type` instead of `x_info::type`. Everything put together looks like this:

```c++
#include <print>
#include <meta>

struct S {
	int x;
};

int main() {
	constexpr std::meta::info x_info = ^^S::x;
	constexpr std::meta::info x_info_type = std::meta::type_of(x_info);
	using x_type = [: x_info_type :];
	if constexpr (std::is_same_v<x_type, int>) {
		std::println("S::x is an int!");
	}
}
```

Notice that this design was a deliberate choice to avoid the useful `x_info::type` because in a template metaprogramming context, an object of type `std::meta::info` could already be a type, and then the syntax `::type` would not make much sense. Or maybe it would, I don't know.

### Writing the field's name

As a bonus, we can write the name of the field using the `std::meta::identifier_of` function on the right `field` object. Can you guess which?

```c++
#include <print>
#include <meta>

struct S {
	int x;
};

int main() {
	constexpr std::meta::info x_info = ^^S::x;
	constexpr std::string_view x_name = std::meta::identifier_of(x_info);
	constexpr std::meta::info x_info_type = std::meta::type_of(x_info);
	using x_type = [: x_info_type :];
	if constexpr (std::is_same_v<x_type, int>) {
		std::println("{} is an int!", x_name);
	}
}
```

Note: the function `std::meta::identifier_of` does not necessarily work on `info` objects that represent types. For this we need `std::meta::display_string_of`:

```c++
#include <print>
#include <meta>

struct S {
	int x;
};

int main() {
	constexpr std::meta::info x_info = ^^S::x;
	constexpr std::string_view x_name = std::meta::identifier_of(x_info);
	
	constexpr std::meta::info x_info_type = std::meta::type_of(x_info);
	constexpr std::string_view x_info_type_name = std::meta::display_string_of(x_info_type);
	
	std::println("{} is a {}!", x_name, x_info_type_name);
}
```

## Enumerating non-static member variables

So far we have worked on a well-known member variable: we started with an info object retrieved directly from `S::x`. Now it is time to enumerate non-static member variables out of `S`. For this, we need the function `std::meta::nonstatic_data_members_of`. This function requires two parameters:

- the info object whose non-static data members we want to enumerate,
- the context object, which determines the access context under which C++ access rules are evaluated, and this in turn determines what member variables functions, ... are accessible by the reflection function of your choice. Read more about this [here](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html#meta.reflection.access.context-access-control-context).

For the purposes of enumerating all non-static member variables of a type, private, protected and public, we want to use the reflection function `std::meta::nonstatic_data_members_of` and the access context `std::meta::access_context::unchecked()`:

```c++
constexpr auto ctx = std::meta::access_context::unchecked();
static constexpr auto fields = std::define_static_array(
	std::meta::nonstatic_data_members_of(^^S, ctx)
);
```

Here we have to pay attention to the fact that `std::meta::nonstatic_data_members_of` is a compile time-only function. For us to be able to iterate over the result (a `std::vector<std::meta::info>`) we need a compile-time array. This is why we use `std::define_static_array`. To iterate over `fields` we need to remember that it is a compile time object only, so we need to use the new `template for` loop:

```c++
template for (constexpr auto field : fields) { }
```

And what now? Well, everything we did before: `field` is a similar object to `x_info`, only that now it is going to be different for each member of `S` that is accessed via the `unchecked` access context. All of this put together is:

```c++
#include <print>
#include <meta>

struct S {
	int x;
	double y;
	std::string z;
};

int main() {
	constexpr auto ctx = std::meta::access_context::unchecked();
	static constexpr auto fields = std::define_static_array(
		std::meta::nonstatic_data_members_of(^^S, ctx)
	);

	template for (constexpr auto field : fields) {
		
		constexpr std::string_view field_name = std::meta::identifier_of(field);
		
		constexpr auto field_type = std::meta::type_of(field);
		constexpr auto type_name = std::meta::display_string_of(field_type);

		std::println("Member variable {} is a {}.", field_name, type_name);
	}
}
```

## Writing out the values of the fields

To start a basic serializer, the last basic ingredient we need is to know how to write the values of the fields. Since we are iterating over them, then there must be some way to retrieve the values, right? Well, fortunately, there is, and we do not need any new operator or funny syntax: the splice operator is enough.

First and foremost we need an object whose values we want. Consider `s` to be such an object. To access any of its fields we are iterating on, we need to use the `field` object corresponding to a member variable, bring it back to reality, and access it via the dot `.` operator as usual. As simple as this: `s. [: field :]`.

```c++
#include <print>
#include <meta>

struct S {
    int x;
    double y;
    std::string z;
};

int main() {
	S s{.x = 1, .y = 1.3, .z = "asdf"};

	constexpr auto ctx = std::meta::access_context::unchecked();
	static constexpr auto fields = std::define_static_array(
		std::meta::nonstatic_data_members_of(^^S, ctx)
	);

	template for (constexpr auto field : fields) {
		
		constexpr std::string_view field_name = std::meta::identifier_of(field);
		
		constexpr auto field_type = std::meta::type_of(field);
		constexpr auto type_name = std::meta::display_string_of(field_type);

		const auto& value = s.[: field :];
        std::println(
			"Member variable {} is a {}, with value '{}'.",
			field_name,
			type_name,
			value
		);
    }
}
```

## Conclusion

You should have now all the basic necessary knowledge to start writing your own [basic serializer](/blog/2026/05/04/serializer.hpp) for C++. Of course, you will have to write your own checks to properly output values: structured types should be serialized recursively and not written simply through a `std::print` call. Follow the link if you ever stuck.
