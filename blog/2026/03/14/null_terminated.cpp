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

	std::ifstream fin2(full_name.data());
	print_entire_file(fin2);

	std::ifstream fin1(partial_name.data());
	print_entire_file(fin1);
}
