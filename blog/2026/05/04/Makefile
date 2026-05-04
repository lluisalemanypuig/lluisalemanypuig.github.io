
CXX = $(HOME)/software/gcc-16.1.0/bin/g++

EXES = main

all: $(EXES)

main: main.o
	$(CXX) -std=c++26 -o main main.o -freflection

main.o: main.cpp serializer.hpp
	$(CXX) -std=c++26 -c main.cpp -freflection

clean:
	rm -f *.o

distclean:
	make clean
	rm -f $(EXES)