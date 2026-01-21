/*
 * Personal webpage's scripts
 * Copyright (C) 2025 - 2026  Lluís Alemany Puig
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Contact: Lluís Alemany Puig (lluis.alemany.puig@gmail.com)
 */

// function to compute sets of unique elements
function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

// populate dropdown: use long names for the text, and the short
// names for the values.
function addToDropDown(dd, item, tag_all, func) {
	var opt = document.createElement("option");
	const [text, value] = func(item, tag_all);
	opt.text = text;
	opt.value = value;
	dd.appendChild(opt);
}

function populateDropDown(id, what, tag_all, func) {
	var all_values = manifest_data.unique_tags[what];

	all_values = all_values.filter(onlyUnique);
	all_values.sort(function (a, b) {
		if (a == tag_all) {
			return -1;
		}
		if (b == tag_all) {
			return 1;
		}
		return b - a;
	});
	all_values.unshift(tag_all);

	var dd = document.getElementById(id);
	dd.textContent = "";
	all_values.forEach(function (item) {
		addToDropDown(dd, item, tag_all, func);
	});
}

function identity(value, _tag_all) {
	return [value, value];
}

function repositoryProject(value, tag_all) {
	if (value == tag_all) {
		return [tag_all, tag_all];
	}
	const [repo, project] = retrieveProjectRaw(value);
	const dropdown_text = makeProjectDropdownText(repo, project);
	const dropdown_value = makeProjectValue(repo, project);
	return [dropdown_text, dropdown_value];
}

function populateDropDowns() {
	populateDropDown("years_select", "years", "All years", identity);
	populateDropDown(
		"projects_select",
		"projects",
		"All projects",
		repositoryProject
	);
	populateDropDown("topics_select", "topics", "All topics", identity);
	populateDropDown(
		"languages_select",
		"languages",
		"All languages",
		identity
	);
}
