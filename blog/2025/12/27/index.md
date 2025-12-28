# How to apply expression templates applied to Bézier curves

In my [previous post](https://lluisalemanypuig.github.io/blog/2025/12/13/) I wrote about how expression templates can be used to writing formatted output with a prefix and suffix strings for every line. In this post, I would like to insist a little bit more on expression templates, this time applied to Bézier curves. Most of the code snippets that I present below are taken from the simplified code [here](/code/simple/bezier.hpp). For simplicity's sake, these snippets do not use forwarding references so there's going to be unnecessary copies going on; for the more general code that uses forwarding references, see the code [here](/code/general/bezier.hpp). The implementations contain some bits of C++23 (such as `std::generator`) but these are not discussed here and everything explained down below is limited to C++20.

## Bézier curves

Wikipedia has a nice [introduction to Bézier curves](https://en.wikipedia.org/wiki/B%C3%A9zier_curve). Here is a self-contained introduction.

Simply put, a Bézier curve $B$ can be understood most easily if we look at $B$ as the recursive interpolation of several points $p_1, \dots, p_n$ (all in 2D, or all in 3D, ...). The interpolation happens at a specific value of a parameter, usually denoted as $t$, for $0\le t\le 1$, and the result of that interpolation is a single point, denoted as $B(t)$. The set of points $\{B(t)\}$ at all values of $t$ represent the Bézier curve. The "recursive" aspect of these curves simply means that $B$ is built recursively from other two Bézier curves $B_1$ and $B_2$. For the mathematically inclined:
$$
B(t) = (1 - t)B_1 + tB_2
$$

We can get a better intuition more easily through an example. Consider the ordered list of points $A$, $B$, $C$, $D$, $E$, $F$. The Bézier curve on these points is build by applying the following incremental steps (a summary of [de Casteljau's algorithm](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm), a figure of which is included below):

1. Interpolate pairs of consecutive points in the list (that is why the list is ordered), so we obtain the curves
    - $B_1^{(1)}=A\cdot B$
    - $B_2^{(1)}=B\cdot C$
    - $B_3^{(1)}=C\cdot D$
    - $B_4^{(1)}=D\cdot E$
    - $B_5^{(1)}=E\cdot F$

    Each of these is a Bézier curve and they interpolate only two points. The symbol $\cdot$ here represents interpolation:
    $$
    B_1^{(1)} = A\cdot B
    \quad
    \longleftrightarrow
    \quad
    B_1^{(1)}(t) = (1 - t)A + tB
    $$
    and it applies to interpolation of Bézier curves as well.

2. Apply the same process to consecutive curves, so we obtain the curves
    - $B_1^{(2)}=(A\cdot B)\cdot (B\cdot C)$
    - $B_2^{(2)}=(B\cdot C)\cdot (C\cdot D)$
    - $B_3^{(2)}=(C\cdot D)\cdot (D\cdot E)$
    - $B_4^{(2)}=(D\cdot E)\cdot (E\cdot F)$

3. Apply the same process again:
    - $B_1^{(3)}= B_1^{(2)} \cdot B_2^{(2)}$
    - $B_2^{(3)}= B_2^{(2)} \cdot B_3^{(2)}$
    - $B_3^{(3)}= B_3^{(2)} \cdot B_4^{(2)}$

4. And again:
    - $B_1^{(4)}= B_1^{(3)} \cdot B_2^{(3)}$
    - $B_2^{(4)}= B_2^{(3)} \cdot B_3^{(3)}$

5. Until we _finally_ get our precious Bézier curve
    - $B = B_1^{(5)} = B_1^{(4)} \cdot B_2^{(4)}$

You can already see that what we get is some kind of tree of interpolation operations. At the leaves we have our points, in the next level there are the curves $B_i^{(1)}$, in the next level the curves $B_i^{(2)}$, and so on and so forth.

<img src="graphics/tree.png" alt="The tree of interpolation operations for the points A, B, C, D, E, F" width="400"/>

In the following figure you can see an example with points $A=(0,0)$, $B=(2,3)$, $C=(4,3)$, $D=(6,-3)$, $E=(8,-3)$, $F=(10,0)$.

<img src="graphics/curve.png" alt="An example of a Bézier curve with 6 points" width="400"/>

I have included a [geogebra file](/graphics/bezier.ggb) for you to play with this specific Bézier curve interactively.

## Implementing Bézier curves at compile time

I decided to implement Bézier curves using expression templates. Why? Because I already knew that it is possible to implement them with some kind of `std::vector` of points, and then implement some quadratic algorithm to evaluate the tree. It would just take more or less time depending on how performant I wanted the implementation to be, and I felt it would not make for an interesting blog post. But the expression templates approach has the following advantages
- the evaluation of a Bézier curve at some point would be much easier to implement in a way that reflects the mathematical formulation.
- the tree of interpolation is embedded into the type of the `bezier` object we will implement.
- and also... computations at compilation time!

### Our goal

Our goal is to make the following code work:
```c++
const point<2> A{0, 0};
const point<2> B{1, 1};
const point<2> C{2, 0};
const point<2> D{3, 1};
const point<2> E{4, 0};
const point<2> F{5, 1};

const auto AB = A              | B;
const auto Ab = A              | point<2>{1, 1};
const auto aB = point<2>{0, 0} | B;
const auto ab = point<2>{0, 0} | point<2>{1, 1};
const auto CD = C              | D;
const auto EF = E              | F;

const auto ABC = A              | B              | C;
const auto ABc = A              | B              | point<2>{2, 0};
const auto AbC = A              | point<2>{1, 1} | C;
const auto aBC = point<2>{0, 0} | B              | C;
const auto aBc = point<2>{0, 0} | B              | point<2>{2, 0};
const auto abC = point<2>{0, 0} | point<2>{1, 1} | C;
const auto Abc = A              | point<2>{1, 1} | point<2>{2, 0};
const auto abc = point<2>{0, 0} | point<2>{1, 1} | point<2>{2, 0};
const auto DEF = D              | E              | F;

const auto ABCDEF_op = ABC | DEF;
// ...
```

In the code above `point<N>` is a class that implements `N`-dimensional points, and the `operator|` is the thing that denotes interpolation (the "$\cdot$" above).

Our main goal is to implement our expression template so that
- we keep references when the objects exist (that is, rvalues), and
- we keep copies when the points are given as temporary objects (that is lvalues).

This, of course, extends to intermediate Bézier curve objects:
- when interpolating two curves we should store constant references when available, and
- we keep a copy of that Bézier curve object when storing a temporary object.

### The starting point

We start with the following class.

```c++
template <typename T, typename U>
struct bezier {
	using left_type = T;
	using right_type = U;
	T l;
	U r;
};
```

At this point we have to ask ourselves two questions:
- _Why not `const T` and `const U`?_ We may want non-const member variables to modify them at some point... Maybe. But no. The `const` qualifier comes into conflict with the goals defined above.

- _Why not `T&` and `U&` (or their const-qualified counterpart)?_ Because with `T` and `U` we are giving ourselves the "type freedom" to have constant references to existing objects (thus avoiding copies, especially of the `point` objects given below) and copies of temporary objects (necessary in these cases). And this is key: if we add the reference `&` coding this will get very ugly very quickly for temporary objects.

  It looks like that without it _all_ objects will be copied. We just need to pass the right types to the `bezier` object. But not all of the code snippets presented below show how to make sure that the right types (a mere `T` or a `const T&`) are passed to the `bezier` object and, for the sake of simplicity, I will show mostly code that copies everything (taken from [here](/code/simple/bezier.hpp)). The more general version of the code can be found [here](/code/general/bezier.hpp).

- _Why not some `bezier`-related type instead of `T` and `U`?_ Because this implementation will have point objects in its leaves, and further up the tree there will be Bézier curve objects. So we need to keep things generic to hold different types. Also, because at times we want to store constant references, and other times we will store copies of values.

Our point class will be an `N`-dimensional point class, where the parameter `N` is given as a non-type template parameter.

```c++
template <size_t N, typename numeric_t = float>
struct point {
	std::array<numeric_t, N> coords;
};
```

And all that is left to do now is implement the `|` operators.

### Interpolating `point` -- `point`

We start with the easiest: the Bézier curve of just two points. First, I show the code with constant references.

```c++
template <Point P, Point Q>
[[nodiscard]] constexpr auto operator| (const P& p, const Q& q) noexcept
{
	return bezier{.l = p, .r = q};
}
```

Simple enough, isn't it? Unfortunately, this will copy _into the `bezier` object_ whatever value that goes through the parameters. And that is fine for temporary objects, but we will also be copying existing values when we could take constant references. The following code fixes it.

```c++
template <Point P, Point Q>
[[nodiscard]] constexpr auto operator| (P&& p, Q&& q) noexcept
{
	return bezier<P, Q>{.l = std::forward<P>(p), .r = std::forward<Q>(q)};
}
```

### Interpolating `point` -- `bezier`

We want to interpolate a point $A$ with a whole bezier curve. Consider a case where the Bézier curve is just the interpolation of two points $B$ and $C$. This means, that the result has to be equivalent to interpolating the points $A$, $B$ and $C$. That is, the result is
$$
(A\cdot B) \cdot (B\cdot C).
$$

This can be represented graphically with the following figure.

<img src="graphics/point_bezier.png" alt="Interpolating a point and a segment, or three points" width="400"/>

This time the result is a `bezier` object. This is how we can do this:

```c++
template <Point P, Bezier B>
[[nodiscard]] constexpr auto operator| (const P& p, const B& b) noexcept
{
	return bezier{.l = p | b.l, .r = b};
}
```

The field `.l = p | b.l` represents the curve $P\cdot A$ and the field `.r = b` represents the curve $B\cdot C$. Obviously, for the sake of completeness, we would have to add another operator for `bezier` and `point`, but that is straightforward from the given implementation and so it is not included here. The same applies to other operators further down.

The code that makes sure that no extra copies of points are made is the following.

```c++
template <Point P, Bezier B>
[[nodiscard]] constexpr auto operator| (P&& p, B&& b) noexcept
{
	using left_subtype = typename std::remove_cvref_t<B>::left_type;

	auto res = std::forward<P>(p) | std::forward<left_subtype>(b.l);
	return bezier<decltype(res), B>{
		.l = std::move(res), .r = std::forward<B>(b)
	};
}
```
Beautiful.

### Interpolating `bezier` -- `bezier`

This is the most difficult operation to implement. We are going to implement a recursive method that interpolates the points of one curve with the other curve just like we did in the previous operator. For this, it is best to think first how to interpolate a series of points that are not part of any Bézier curve. If we wanted to do this we could do it this way:

```c++
template <typename Point, typename... Points>
[[nodiscard]] constexpr auto
bezier_from_points(const Point& P, const Point& Q, const Points&...ps) noexcept
{
	if constexpr (sizeof...(Points) == 0) {
		return P | Q;
	}
	else {
		return P | bezier_from_points(Q, ps...);
	}
}
```

The reason why this works should follow directly from the explanations above.

#### The wrong approach

If we think for a little while we will quickly realize that we need to know the number of points in a Bézier curve and implement some kind of for loop. For this we need to know the number of points. Since the depth of the tree and the number of points are off by one with respect to each other, we only need to know the "depth of a Bézier" curve. The depth can be added as a member variable in the `bezier` class and assign it the appropriate value at every `operator|`, and then use it like this.

```c++
namespace detail {

template <Bezier T, Bezier U>
[[nodiscard]] constexpr auto
interpolated_bezier_and_point(const T& l, const U& r, const size_t i) noexcept
{
	auto b = l | r.get_point(i);
	if (i == r.depth) {
		return b;
	}
	else {
		return interpolated_bezier_and_point(b, r, i + 1);
	}
}

} // namespace detail

template <Bezier T, Bezier U>
[[nodiscard]] constexpr auto operator| (const T& l, const U& r) noexcept
{
	return detail::interpolated_bezier_and_point(l, r, 0);
}
```

But this is incorrect. Why? The _idea_ is correct? We take the leftmost point of the Bézier curve `r` and interpolate that with `l` to make `auto b = l | r.get_point(i);` and we continue doing that until we have reached the last point `if (i == r.depth)`. But the problem is that the function has two return statements each with its own return type. Since neither branch of the `if` statement is within compile-time, both return types are in conflict.

By the way, at the time of writing this post, this function caused `gcc 14.2.0` to hang in an infinite loop.

#### The right approach

To properly implement the method above we need to know the depth of a Bézier curve _at compile time_ so that we can use `if constexpr`and get rid of the return statements with different types. Luckily, as you might have been thinking, this depth is embedded into the type of the `bezier` object! This was mentioned as an advantage of implementing Bézier curves and so we can totally calculate this depth at compile time. We can write a trait, or we can add it to the `bezier` and `point` classes as a `static constexpr size_t` member.

```c++
template <size_t N, typename numeric_t = float>
struct point {
	// ...
    static constexpr size_t depth = 0;
};
template <typename T, typename U, typename numeric_t = float>
struct bezier {
	// ...
    static constexpr size_t depth = 1 + T::depth;
};
```

And with this change, our operator for interpolating Bézier curves can be easily implemented.

```c++
namespace detail {

template <size_t i, Bezier T, Bezier U>
[[nodiscard]] constexpr auto
interpolate_bezier_and_point(const T& l, const U& r) noexcept
{
	auto b = l | r.get_point(i);
	if constexpr (I == U::depth) {
		return b;
	}
	else {
		return interpolate_bezier_and_point<i + 1>(b, r);
	}
}

} // namespace detail

template <Bezier T, Bezier U>
[[nodiscard]] constexpr auto operator| (const T& l, const U& r) noexcept
{
	return detail::interpolate_bezier_and_point<0>(l, r);
}
```

where `get_point(size_t)` is a member function that returns the `i`-th point of the Bézier curve, and `Bezier` is a concept that is true when the type is a `bezier` object.

## Actual interpolation of the points

Now, the moment we all have been waiting for! Yay... It is time to implement method that does the actual interpolation. This is simple enough thanks to our efforts in mimicking the tree structure of de Casteljau's algorithm.

```c++
template <typename T, typename U, typename numeric_t = float>
struct bezier {
    // ...
    [[nodiscard]] constexpr auto operator() (const numeric_t t) const noexcept
    {
        return l(t) * (numeric_t(1.0) - t) + r(t) * t;
    }
};
```

Obviously we need to add the same operator to the point class, and it should just return itself.

```c++
template <size_t N, typename numeric_t = float>
struct point {
	// ...
	[[nodiscard]] constexpr point<N, numeric_t> operator() (const numeric_t
	) const noexcept
	{
		return *this;
	}
};
```

## Conclusion

The first drawback of this approach is that we are duplicating many parts of the computation tree. As the tree grows, the `bezier` objects get copied twice (since many of these elements have two parents), and the size grows exponentially in the number of points. Not good. This is why it is important to avoid copies, even in the `bezier` objects.

The second drawback is that this implementation does not allow for direct incremental and programatic modification of a Bézier curve, something like `b = b | P;`, because such operation would _change the type_ of variable `b`. One might think that in order to circumvent this problem we could use `std::any`. But, no, the type of a `std::any` has to be `std::any_cast`-ed out of the object specifying the exact type:

```c++
std::any my_bezier = A;
my_bezier = std::any_cast<point<2>>(my_bezier) | B;
my_bezier = std::any_cast<interpolated<2>>(my_bezier) | C;
my_bezier = std::any_cast<bezier<??>>(my_bezier) | D;
my_bezier = std::any_cast<bezier<??>>(my_bezier) | E;
```

The third, and most important, drawback is that the algorithm is very slow. According to Wikipedia the [cost of de Casteljau's algorithm](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm) is $O(dn^2)$ where $d$ is the number of dimensions and $n$ is the number of points. Therefore if we wanted to be more effcient we would need to implement one of the better alternatives (some are cited in the wikipedia article), and implement the Bézier curve in a way that helps implementing those algorithms.

Fourth, the implementation of the interpolation between two Bézier curves when using forward references, only manages to _not copy_ one of the two parameters. The code above certainly does not reuse any of the memory in the parameters. But when using forwarding references we have a chance to reuse as much memory as possible; nevertheless, I could only reuse one of the two curves, the first parameter.

In spite of these drawbacks, this has been an interesting exercise of writing compile-time functions, along with templates and working out properties of a structure based on its type. Obviously, the code above should be adapted to forward references so as to be able to move values to avoid unnecessary copies; as mentioned at the very beginning of this post, this adapted, more general code can be found [here](/code/general/bezier.hpp).
