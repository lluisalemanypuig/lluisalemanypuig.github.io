/*
 * Personal webpage's scripts
 * Copyright (C) 2025  Lluís Alemany Puig
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

async function all_directories() {
    const response = await fetch("manifest.json");
    const manifest = await response.json();
    return manifest.directories;
}

async function get_tags(dir) {
    const response = await fetch(dir + "/tags.json");
    const tags = await response.json();
    return tags;
}

function createDropDowns() {
	var div = document.getElementById("filtered_entries");
	// clean up the whole thing
	div.innerHTML = '';
	
	// create the dropddowns
	var ddProject = document.createElement('select');
	var ddTopics = document.createElement('select');
	
	// modify dropdowns' attributes
	
	// onChange
	ddProject.onchange = populateFilteredEntriesList;
	ddTopics.onchange = populateFilteredEntriesList;
	
	// ids
	ddProject.id = "projects_select";
	ddTopics.id = "topics_select";
	
	var center = document.createElement("center");
	center.appendChild(ddProject);
	center.appendChild(ddTopics);
	div.appendChild(center);
}

var directory_data = undefined;

window.onload = function() {
    const all_dirs = all_directories();
    directory_data = [];
    for (var i = 0; i < all_dirs.length; ++i) {
		const tags = get_tags(all_dirs[i]);
        directory_data.push(tags);
	}
    console.log(directory_data);

	// Add the dropdowns in the appropriate 'div' class
	console.log("Adding drop down menus...");
	createDropDowns(directory_data);
	
	// Populate the dropdown buttons with all the possible
	// values. These drop downs are initialised with the defaut value
	// "All tags", "All years", "All ...", ...
	console.log("Populating drop down menus...");
	populateDropDowns(directory_data);
	
	// populate the publications list
	console.log("Populating entries list...");
    populateAllEntriesList(directory_data);
	populateFilteredEntriesList(directory_data);
};
