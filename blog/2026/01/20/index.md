# When calling descructors is necessary (maybe)

In this short blog post I want to show a situation where calling the destructor is necessary, maybe. When I say _necessary_ I mean not just useful, but _necessary_ to avoid memory leaks. Of course, in C++ there are many different paths to achieve the same thing and here I want to show two of them: one calls the destructor while keeping initialization simple, the other does not but initialization is a bit quirky.

This situation arose in a project I keep going back to in order to apply time performance and memory improvements, [chesspebase](github.com/lluisalemanypuig/chesspebase). A code example can be found within this post, in [this file](/blog/2026/01/20/code.cpp).

## The context

In the project, I use a system of queues to speed up the loading time of data from a file into a data structure. Each queue belongs to a thread that is concurrent with the main thread. Each queue is, essentially, two buffers, one of which is very-well suited for a Single Producer Single Consumer thread; such buffer was implemented and published in a blog post by [Kaspar Daugaard](http://daugaard.org/blog/writing-a-fast-and-versatile-spsc-ring-buffer/). I will call these buffers Q-buffers. The other buffer belongs to the main thread; I will call these buffers M-buffers.

The program works as follows
1. The main thread allocates two buffers for each of the N queues.
2. The main thread starts reading a file line by line.
3. Each line is converted into some object by the main thread.
4. Each object is stored in one of the N buffers (that belong to the main thread) depending on some property of the object (one of the M-buffers).
5. When an M-buffer buffer is full, the data is copied into its corresponding Q-buffer (by the main thread) and then the corresponding concurrent thread is given the signal to store the objects in its Q-buffer in a data structure of its own.
6. When the file is consumed entirely, the main thread merges the independent data structures into a final data structure.

The M-buffers are simple `std::vector<T>` where `T` is the type of objects to read from the file. However, the Q-buffers are of type `char[S]` for some size `S` which has to be a power of 2 in the original implementation by Daugaard.

## Writing data to the Q-buffers

So, how do we write a set of objects of type `T` from an M-buffer into its corresponding Q-buffer (remember, of type `char[]`) so that the corresponding concurrent thread can consume that data? We don't! Instead, we _move_ the `std::vector<T>` into the buffer. To understand this, one has to bear in mind that a `std::vector<T>` is, essentially,
```c++
template <typename T>
struct vector {
	T *memory;
	size_t size;
	size_t capacity;
};
```
and that when we move a `std::vector` we are only moving these 3 members, and there is no actual copy of the elements of the `std::vector` from the M-buffer to the Q-buffer. In 64-bit platforms, we should have that `sizeof(std::vector<T>) == 24` for any type `T`. So the Q-buffer need not be large.

In order to _move_ a `std::vector` into buffer of type `char[]`, we need to use the placement new operator. Let's look at a bit more concrete example.

### A bit more concrete example

Now, consider the following `T`:
```c++
struct data {
	int a;
	char b;
	char c;
};
```
and the following vector type for the M-buffer
```c++
using data_vec = std::vector<data>;
```
Consider a vector of type `data_vec` of 1000 elements that represents a full M-buffer (so the M-buffer for _one_ queue has 1000 elements of type `data`). We can make the Q-buffer much smaller, though, say 64 bytes. In order to _move_ the vector, we use the placement new operator
```c++
data_vec Mbuffer(1000);
// initialize Mbuffer ...

char Qbuffer[64];
char *p = &Qbuffer[0];

new (p) data_vec(std::move(Mbuffer));
p += sizeof(data_vec); // move the pointer forward

Mbuffer = data_vec(); // reinitialize the M-buffer
```

Now the consumer thread (which, remember is concurrent with the main thread) can read the data in the vector that has just been placed at the beginning of its buffer. Notice that right now the main thread holds an empty M-buffer and the thread holds a very small buffer (the `Qbuffer` in the code) which contains a reference to a large vector that still exists in memory.

## Consuming the data from the Q-buffer

We only need to know how to consume the data (in the form of a `std::vector<T>`) from the Q-buffer. To read it from the buffer we just have to do some `static_cast` magic:

```c++
char *p = &Qbuffer[0];

data_vec& v = *static_cast<data_vec *>(static_cast<void *>(p));
std::println("Vector size: {}", v.size());
for (const data& d : v) {
	// ... process the data
}
```

This code is to be executed by the concurrent thread. Notice that since the main thread _moved_ the vector into `Qbuffer`, it no longer has access to the memory that the vector allocated and so the thread can use it in whichever way it wants without worrying about data races.

### Memory leaks

Precisely because the main thread no longer has access to the memory, the main thread is no longer in charge of deallocating the memory that `Mbuffer` once held, and that now is accessible only by `v` (again, whose pointer, size and capacity are stored in the `Qbuffer`). So only the concurrent thread can deallocate that memory. How?

C++ beginners are usually taught to use `std::vector::clear` to "clear the memory of a vector". But that does not deallocate any memory: it only destructs the objects in the allocated memory and then sets the size of the vector to 0. But the actual capacity does not change. So this:
```c++
v.clear();
```
does not prevent memory leaks. Instead, we need to call the destructor
```c++
v.~vector<data>();
```
in order to actually free the memory.

### An alternative to calling the destructor

You are probably thinking that the data type `data_vec&` is wrong and maybe we could use the more normal `data_vec` type for the variable `v`. Sure! To achieve this we use placement new again, here is how:

```c++
char *p = &Qbuffer[0];

data_vec v;
new (&v) data_vec(std::move(*static_cast<data_vec *>(static_cast<void *>(p))));

std::println("Vector size: {}", v.size());
for (const data& d : v) {
	// ... process the data
}
```

And we do not need to call the destructor on `v` here since it is going to be called by default (that is, as per C++'s rules) when variable `v` goes out of scope. But maybe the incantation required to construct `v` produces some adverse feelings of danger for your life, as it should, and maybe you prefer the first option.

## Conclusions

There are not many conclusions to draw, other than placement new and calling the destructor are more useful than one may first think, at least where moving and deallocating memory is concerned, especially when deallocating is not so clear, at a first glance, how it is going to be deallocated by default. The full code can be found in [this file](/blog/2026/01/20/code.cpp).