#include <cassert>
#include <vector>
#include <ranges>
#include <print>

struct data {
	int a;
	char b;
	char c;
};

using data_vec = std::vector<data>;

static constexpr size_t VECTOR_ELEMS = 40;
static constexpr size_t BUFFER_ELEMS = 32;
static constexpr auto VECTOR_ALIGN = alignof(std::vector<data>);

template <typename T, typename U>
T to(U u)
{
	return static_cast<T>(u);
}

int main()
{
	alignas(VECTOR_ALIGN) char Qbuffer[BUFFER_ELEMS];

	data_vec Mbuffer(VECTOR_ELEMS);
	for (std::size_t i = 0; i < VECTOR_ELEMS; ++i) {
		Mbuffer[i].a = i;
		Mbuffer[i].b = 'a' + (2 * i + 0) % ('z' - 'a' + 1);
		Mbuffer[i].c = 'a' + (2 * i + 1) % ('z' - 'a' + 1);
	}

	static_assert(sizeof(std::vector<data>) <= BUFFER_ELEMS);
	assert(Mbuffer.size() * sizeof(data) > BUFFER_ELEMS);

	// write into the buffer
	{
		char *p = &Qbuffer[0];

		new (p) data_vec(std::move(Mbuffer));
		p += sizeof(data_vec);

		assert(p <= &Qbuffer[BUFFER_ELEMS - 1]);
		assert(Mbuffer.size() == 0);
		assert(Mbuffer.capacity() == 0);
	}

	// NOTE! Compile the code with either (1) or (2), but not both

	// (1) read from the buffer
	{
		char *p = &Qbuffer[0];

		data_vec& v = *to<data_vec *>(to<void *>(p));
		std::println("Vector size: {}", v.size());
		for (const data& d : v | std::views::drop(10)) {
			std::println("{} {} {}", d.a, d.b, d.c);
		}

		// _v.clear() does not free the memory allocated by the vector;
		// it only runs over the elements in the array and calls their
		// destructor, and then sets the size of the vector to 0.
		v.~vector<data>();
	}

	// (2) read from the buffer
	{
		char *p = &Qbuffer[0];

		data_vec v;
		new (&v) data_vec(std::move(*to<data_vec *>(to<void *>(p))));

		std::println("Vector size: {}", v.size());
		for (const data& d : v | std::views::drop(10)) {
			std::println("{} {} {}", d.a, d.b, d.c);
		}
	}
}
