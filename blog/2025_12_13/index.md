# A better decorator for 'formatted' output

Most of the coding I did during my thesis was while working on the [linear-arrangement-library (LAL)](https://github.com/LAL-project/linear-arrangement-library), [testing it](https://github.com/LAL-project/tests) and [writing](https://github.com/LAL-project/python-interface) [extensions](https://github.com/LAL-project/treebank-parser) for it. During development I made extensive use of `std::cout` to debug the algorithms, the default writer to standard output at the time. Although it is fine for most purposes there was something for which `std::cout` is not prepared for: formatted multiline output. In this post I want to write how I approached this back then, and how I approach this now.

## Formatted output

Now, I know there is `std::setw` and other functions for formatted output. This is what I mean. Consider the following simple matrix type:

```c++
struct matrix {
    int n, m;
};
```

and we want to write a whole `matrix` into standard output. This is the way to do this for `std::cout`:

```c++
std::ostream& operator<< (std::ostream& os, const matrix& M)
{
    for (int i = 0; i < M.n; ++i) {
        os << 'x';
        for (int j = 1; j < M.m; ++j) {
            os << " x";
        }
        if (i < M.n - 1) {
            os << "\n";
        }
    }
    return os;
}
```

With the function above we can write
```c++
matrix M{.n = 3, .m = 4};
std::cout << M << '\n';
```
The output is easy to predict:
```
x x x x
x x x x
x x x x
```
Now, here is a clear flaw with `std::cout`: we cannot prepend a string before each and every line of the output for `M`, at least not automatically. The following
```c++
matrix M{.n = 3, .m = 4};
std::cout << "    " << M << '\n';
```
produces
```
    x x x x
x x x x
x x x x
```

## How I solved this back then

I eventually figured out that I could create a singleton class that lives in the global state of my program which would contain the prefix string (and maybe a suffix string, and possibly other stuff as well). And just use that string with the `operator<<` for my `matrix` type. I [did](https://github.com/LAL-project/linear-arrangement-library/blob/95ec4a24809a0864cf7fcd9cadfd8bb2e3b95910/lal/graphs/output.hpp) something like this:

```c++
class decorator {
public:
    std::string_view tabulator_string;
    static decorator& get_instance() noexcept
    {
        static decorator i;
        return i;
    }
private:
    decorator() noexcept = default;
};
```

And I just had to update the `operator<<` like this

```c++
std::ostream& operator<< (std::ostream& os, const matrix& M)
{
    auto& f = decorator::get_instance();
    for (int i = 0; i < M.n; ++i) {
        os << f.tabulator_string;
        os << 'x';
        for (int j = 1; j < M.m; ++j) {
            os << " x";
        }
        if (i < M.n - 1) {
            os << "\n";
        }
    }
    f.tabulator_string = "";
    return os;
}
```
And, the following produces the desired output
```c++
decorator::get_instance().tabulator_string = "    ";
std::cout << M << '\n';
```

### Make it easier

Of course, the above works but it has one problem that nobody likes: it is too verbose, and has to be fixed. As a possible fix, we can create a type-safe wrapper over `std::string_view` which can be sent to output via its own `operator<<` and in there set the `tabulator_string` field of our singleton `decorator`. Like this:

```c++
struct wrapper {
    std::string_view s;
};

wrapper operator""_tab (const char *str, const std::size_t s) noexcept
{
    return wrapper{.s = std::string_view{str, s}};
}

std::ostream& operator<< (std::ostream& os, const wrapper& w)
{
    decorator::get_instance().tabulator_string = w.s;
    return os;
}
```

and now we can write
```c++
std::cout << "    "_tab << M << '\n';
```
and everybody is happy, right?

## A better solution than a singleton

I do not like the idea of a singleton containing a value that is common to all threads, and with no synchronization whatsoever: think of what would happen if several threads were each writing to their own file and setting and unsetting the `tabulator_string` whenever they pleased... This can be fixed by applying an inspiring solution from the `Eigen` library explained [here](https://273dan.github.io/blog/posts/operatortypo/). These are known as expression templates.

First define
```c++
template <typename T>
struct decorator {
    std::string_view prefix;
    const T& value;
    std::string_view suffix;
};
```
(I have added the `suffix` to illustrate the flexibility of the method.)

The application of expression templates here is simple: define several `operator+` in order to (flexibly) create a `decorator<matrix>` object and print like this:

```c++
std::ostream& operator<< (std::ostream& os, const decorator<matrix>& M)
{
    const auto& prefix = p.prefix;
    const matrix& M = p.value;
    const auto& suffix = p.suffix;
    for (int i = 0; i < M.n; ++i) {
        os << prefix << 'x';
        for (int j = 1; j < M.m; ++j) {
            os << " x";
        }
        os << suffix;
        if (i < M.n - 1) {
            os << '\n';
        }
    }
    return os;
}
```

The operators are:
```c++
// Allows writing: "|   " + M
template <typename T>
decorator<T> operator+ (std::string_view w, const T& t) noexcept
{
    return decorator<T>{.prefix = w, .value = t, .suffix = ""};
}

// Allows writing: M + "   |"
template <typename T>
decorator<T> operator+ (const T& t, std::string_view w) noexcept
{
    return decorator<T>{.prefix = "", .value = t, .suffix = w};
}

// Allows writing: ("|   " + M) + "   |"
template <typename T>
decorator<T> operator+ (decorator<T> t, std::string_view w) noexcept
{
    t.suffix = w;
    return t;
}

// Allows writing: "|   " + (M + "   |")
template <typename T>
decorator<T> operator+ (std::string_view w, decorator<T> t) noexcept
{
    t.prefix = w;
    return t;
}
```

With these operators we are served! Now we can write
```c++
matrix M{.n = 3, .m = 4};
std::cout << "|   " + M          << '\n';
std::cout <<          M + "   |" << '\n';
std::cout << "|   " + M + "   |" << '\n';
```
The output is, obviously,
```
|   x x x x
|   x x x x
|   x x x x
x x x x   |
x x x x   |
x x x x   |
|   x x x x   |
|   x x x x   |
|   x x x x   |
```

## Conclusion

Long live expression templates. This specialized application into formatted output allows:
- creating objects with all the information required _comfortably_,
- creating _independent_ objects in different threads,
- creating _lightweight_ objects since the actual value to be printed is taken as a `const &` and the prefix and suffix strings are simple `std::string_view` objects.

The full solution using expression templates is attached to this blog post in [this file](/blog/2025_12_13/code.cpp). There is implemented the `std::formatter` so that `decorator` can be printed using `std::print` and `std::format` in C++23.