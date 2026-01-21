# Placement new operator is more useful than you think

In [my last post](/blog/2026/01/20) I wrote about a case where calling the destructor of a class is necessary to avoid memory leaks. That came about from moving a `std::vector` into an array `char[]` using placement new, and then choosing one of two options
- retrieving the `std::vector` in an easier way, which leads to needing to call the destructor,
- retrieving the `std::vector` in a more difficult way, which uses the placement new operator, which removes the need to call the destructor.

Here I want to write about another case where placement new is used, but this time its better justified, I think. This involves the `std::pmr::vector` class and changing the memory resource allocator after initialization.

## Context

The `std::pmr::vector` class is an "extension" of the usual `std::vector` class, which contains an extra pointer to an object of type [std::pmr::memory_resource](https://en.cppreference.com/w/cpp/memory/memory_resource.html); this is an interface to an object that represents some memory resource, such as a memory arena, or some other resource. Essentially, a `std::pmr::vector` is

```c++
template <typename T>
struct vector {
    T *data;
    size_t size;
    size_t capacity;
    std::pmr::memory_resource *mem;
};
```

This is useful when we make the memory resource behave like a memory arena: the arena object `A` first allocates, say, 100MB, and then the `std::pmr::vector` objects initialized with `A` will allocate their memory within the buffer allocated by `A`, so this way we avoid making calls to the kernel. Of course, the memory resource object should still be capable of doing "normal" allocations in case its buffer is exhausted.

## Application

What if you have a class whose vectors are actual `std::pmr::vector` (not the usual `std::vector`) objects but you want to give a choice to your users to whether or not use a memory resource allocators? For example, like this
```c++
template <typename T>
class your_data_structure {
public:

    your_data_structure() = default;
    // ... other constructors

private:

    std::pmr::vector<T> m_container;
    // ... other members
};
```

That is, you do not want to initialize `your_data_structure` via a constructor. Instead, you choose to initialize it via an `initialize` member function, like this:

```c++
template <typename T>
void your_data_structure<T>::initialize(std::pmr::memory_resource *mem) {
    // ...
}
```

The `initialize` method has to set the pointer to the memory resource inside `m_container`. However, there is no such member function for this class to do this. How would you go about implementing it?

### The solution

Unfortunately, we have to reconstruct the vector from scratch, and that implies deallocating the memory it had. First, we need to deallocate the vector, and then use the placement new operator to reconstruct the vector with the memory resource passed as parameter.

```c++
template <typename T>
void your_data_structure<T>::initialize(std::pmr::memory_resource *mem) {
    m_container.~vector<T, std::pmr::polymorphic_allocator<T>>();
    new (&m_container) std::pmr::vector<T>(
        std::pmr::polymorphic_allocator<T>{mem_res}
    );
}
```

## Conclusion

In this post I have shown an application where
- calling the destructor is actually necessary to free memory,
- placement new operator is necessary to "forcefully" rebuild and object with something that it cannot be replaced through the more "respectful" ways (using member functions, which are not available in this case).
