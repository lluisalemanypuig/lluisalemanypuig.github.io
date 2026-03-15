# Proper creation and concatenation of strings at compile time

In a [previous post](/blog/2025/09/11) I wrote how I tried to create some code to create compile-time strings, how I failed and then I tried using ChatGPT, which also failed, and quite funnily by the way. Recently, I came across a way of doing so, and so I thought I would write about this here.

This post is not sponsored by, but it would not have been possible by think-cell, who posted a [video](https://www.youtube.com/watch?v=8rmnpuAh568) to showcase what it's like to work there (and, also, as part of their advertising campaign so that everybody knows the company, their products, and want to work there). In that video, Jonathan Müller explains how to obtain better string literals at compile time. In this post I wnat to dissect what's important from that explanation and provide a simple base code so that you can try it out. This post also uses code from [think-cell's library](github.com/think-cell/think-cell-library).

## What we want

We want to produce strings so that (1) they are null-terminated, and (2) no allocation is necessary to hold the contents.

### Why null-terminated?

Null-terminated strings are _mandatory_ if you want to use API calls such as opening a file. Consider the [following code](blog/2026/03/14/null_terminated.cpp):

```c++
#include <string_view>
#include <iostream>
#include <fstream>

void print_entire_file(std::ifstream& fin)
{
	std::string line;
	while (std::getline(fin, line)) {
		std::cout << line << '\n';
	}
}

int main()
{
	// this string is null-terminated
	std::string full_name_str = "asdf.txt";

	// these strings are *not* null-terminated
	std::string_view full_name{full_name_str};
	std::string_view partial_name{&full_name_str[0], &full_name_str[4]};

	std::ifstream fin1(full_name.data());
	print_entire_file(fin1);

	std::ifstream fin2(partial_name.data());
	print_entire_file(fin2);
}
```

Now, suppose there are two files in the system: `asdf.txt` and `asdf`, with the contents `Hello` and `World` respectively. What do you think is going to be the output of the program? Are you going to have

```
Hello
World
```

or perhaps

```
Hello
Hello
```

That's right, it's going to be the second output: two `Hello` lines. Many APIs will iterate over a string until they find a null-terminating character `'\0'`, so even when we using `partial_name.data()` the iteration will parse `asdf.txt` and not just simply `asdf`. Be careful what you do when working with `std::string_view`s!

### Why do we not want more allocations than necessary?

Allocations are not very `constexpr`-friendly up until C++23. Something like trying to construct a `std::string` object at compile-time is impossible because we eventually bump into a call of operator `new` and that is not allowed... yet. Maybe C++26, or C++29 will fix this. In other words, we shall not write a function like

```c++
constexpr std::string concatenate(...)
```

because, although [we can make it work](/blog/2026/03/14/code_basic.cpp) at compile-time, every variable that holds the result of `concatenate` cannot be `constexpr` and an allocation will happen everytime the runtime enters into the function that has those variables.

## How to actually achieve a compile-time concatenation of strings, then?

The answer proposed by think-cell in the aforementioned video is simple

* encode the strings into the type of a container,
* in order to concatenate two strings, create a new container whose type contains the concatenated strings, and
* put the values in the type of the container into a variable that has type `const char *`.

In a [previous post](/blog/2025/12/27) I showed how types play an important role when constructing Bézier curves at compile time.

The explanations below show a [simplified version](/blog/2026/03/14/code_advanced.cpp) of think-cell's code in their library, only the code below this line was taken from there.

### The string in a type

The first step is to create a container that can actually contain a whole string of characters into its type.

```c++
template <is_char_like char_t, auto... Ts>
struct literal_range { };
```

Is that it? Yes. The parameter pack (or parameter group) `Ts` is a sequence of _non-type_ parameters, that is, constant expression values such as numbers, characters, ... and is embedded into the type of any instantiation of `literal_range`. Now, a question that you may have: Why does `literal_range` encode a string in its type? The answer is: because if we wanted to create a value of type `literal_range` we would need to write something like this:

```c++
literal_range<char, 'h', 'e', 'l', 'l', 'o'> lr;
```

and, yes! the string "hello" is indeed embedded into `lr`'s type! In other words, `lr`'s type is, literally, `char, 'h', 'e', 'l', 'l', 'o'`.

The `is_char_like` is a C++20 concept that forces the type `char_t` to be of a type that resembles a character. In the code for this post, this concept simply checks that `char_t` is a `char` type.

Finally, notice that `literal_range` has no size. That is, it contains no value, and it only has a _type_, from which we get the string "hello" when interpreted as a whole.

### Concatenating two strings

Now, we want to write a function that can concatenate two `literal_range` values. This is simple enough:

```c++
template <is_char_like T, auto... Ts, is_char_like U, auto... Us>
[[nodiscard]] constexpr auto
operator+ (literal_range<T, Ts...>, literal_range<U, Us...>) noexcept
{
	using common_type = std::common_type_t<T, U>;
	return literal_range<common_type, Ts..., Us...>{};
}
```

Okay, admittedly, that is a bit less simple that one might think... Let's break it down:

- The template parameters can be split into two groups: `is_char_like T, auto... Ts` and `is_char_like U, auto... Us`. These two are the type of their corresponding `literal_range`. Recall that said type _encodes the string_.
- The parameters of the function are the two `literal_range`s we want to concatenate. The actual strings are contained _in the type_ of these `literal_range`s.
- The return value is a `literal_range` object that contains the characters of the two input parameters _in its type_.

Why is everything compile-time? Because we are only working with the _types_ of the parameters, and we are creating an object that has no value, but only a type, and types can be manipulated at compile time.

**Note:** as mentioned in the video, `std::common_type_t` allows dangerous implicit conversions, and the actual library implementation uses its own implementation of `std::common_type_t`.

### A little help from user-defined literals

Since we do not want to type something as long as

```c++
literal_range<char, 'h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd'>
```

every time we want to work with the string "hello world" (which, frankly, it is quite often), we can use a helpful user-defined literal that creates such an object from a given string.

```c++
template <typename char_t, char_t... chars>
[[nodiscard]] constexpr auto operator""_lr () noexcept
{
	return literal_range<char_t, chars...>{};
}
```

I think little explanation is needed for this function. The way to use it is to write something like this:

```c++
constexpr auto hello_world = "hello world"_lr;
```

### The solution we are looking for

The actual construction of the null-terminated string happens after doing a little bit more of C++'s template black magic. Notice that we now need something that can convert our `literal_range` into a `const char *`. Recall that, in C, a simple array such as

```c
const char c[] = {'h', 'e', 'l', 'l', 'o', '\0'};
```

is the same as 

```c
const char *c = {'h', 'e', 'l', 'l', 'o', '\0'};
```

Therefore, we only need to convert a `literal_range` into a `const char *`. For this, we are going to use a _variable template_.

```c++
template <is_char_like char_t, auto... Ts>
constexpr inline const char str[] = {char_t(Ts)..., char_t('\0')};
```

When `str` is instantiated, the compiler creates the corresponding variable. For example, if we write

```c++
str<char, 'h', 'e', 'l', 'l', 'o'>
```

the compiler will create a variable equivalent to

```c++
constexpr inline const char __gen_hello[] = {'h', 'e', 'l', 'l', 'o', '\0'};
```

The variable has type `const char *`. The `inline` keyword is needed to avoid duplication of the same variable across multiple translation units that instantiate `str` in the same way. The `constexpr`, as you may know already, keyword is required to tell the compiler this can be used during compilation time.

Now, we can write our sought-after function:
```c++
template <is_char_like char_t, auto... chars>
[[nodiscard]] constexpr const char_t *
as_c_str(literal_range<char_t, chars...>) noexcept
{
	return str<char_t, chars...>;
}
```

The way this function works is pretty much the same as the function `operator +`. Notice that the return type is the same as `const char *`, brought to you by the variable template defined above.

And this is it! We can safely write:
```c++
constexpr const char *documents = as_c_str(
    "/"_lr + "home"_lr +
    "/"_lr + "thinkcell"_lr +
    "/"_lr + "Documents"_lr
);
```

## Conclusions

This time types have proven to be very useful to circumvent the limitations of operator `new` at compile-time. We simply put all of the information we would funnel through `new` into the type of a struct, and that's pretty much it.
