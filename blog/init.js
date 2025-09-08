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

window.onload = function() {
	console.log = function(str) {}
	
	// ****** Add the dropdowns in the appropriate 'div' class
	console.log("Adding drop down menus...");
	createDropDowns();
	
	// ****** Populate the dropdown buttons with all the possible
	// values. These drop downs are initialised with the defaut value
	// "All tags", "All years", "All ...", ...
	console.log("Populating drop down menus...");
	populateDropDowns();
	
	// populate the publications list
	console.log("Populating entries list...");
    populateAllEntriesList();
	populateFilteredEntriesList();
};
