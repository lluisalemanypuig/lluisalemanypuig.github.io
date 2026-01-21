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

const base_url =
	"https://raw.githubusercontent.com/lluisalemanypuig/lluisalemanypuig.github.io/master";

var manifest_data = undefined;
var display_tags = true;

function github_path(file) {
	return `${base_url}/blog/${file}`;
}

async function get_manifest_data() {
	const response = await fetch(github_path("manifest.json"));
	const manifest = await response.json();
	return manifest;
}

function configureFilterElements() {
	var ddYears = document.getElementById("years_select");
	var ddProjects = document.getElementById("projects_select");
	var ddTopics = document.getElementById("topics_select");
	var ddLanguages = document.getElementById("languages_select");

	ddYears.onchange = populateFilteredEntriesList;
	ddProjects.onchange = populateFilteredEntriesList;
	ddTopics.onchange = populateFilteredEntriesList;
	ddLanguages.onchange = populateFilteredEntriesList;

	var show_tags = document.getElementById("show_tags");
	show_tags.onclick = function (_event) {
		display_tags = !display_tags;
		populateFilteredEntriesList();
	};

	var show_tags_label = document.getElementById("show_tags_label");
	show_tags_label.onclick = function (_event) {
		show_tags.click();
	};
}

window.onload = async function () {
	manifest_data = await get_manifest_data();

	configureFilterElements();

	// Populate the dropdown buttons with all the possible
	// values. These drop downs are initialised with the defaut value
	// "All tags", "All years", "All ...", ...
	populateDropDowns();

	// populate the publications list
	populateFilteredEntriesList();
};
