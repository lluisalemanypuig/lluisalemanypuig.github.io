/*
 * Personal webpage's scripts
 * Copyright (C) 2020  Lluís Alemany Puig
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
	var div = document.getElementById(__div_talklist);
	// clean up the whole thing
	div.innerHTML = '';
	
	// create the dropddowns
	var ddYears = document.createElement('select');
	var ddClassifTags = document.createElement('select');
	var ddInstitutions = document.createElement('select');
	var ddCities = document.createElement('select');
	
	// modify dropdowns' attributes
	
	// onChange
	ddYears.onchange = populateTalksList;
	ddClassifTags.onchange = populateTalksList;
	ddInstitutions.onchange = populateTalksList;
	ddCities.onchange = populateTalksList;
	
	// ids
	ddYears.id = __talks_dd_years_id;
	ddClassifTags.id = __talks_dd_tags_id;
	ddInstitutions.id = __talks_dd_institutions;
	ddCities.id = __talks_dd_cities;
	
	var center = document.createElement('center');
	center.appendChild(ddYears);
	center.appendChild(ddClassifTags);
	center.appendChild(ddInstitutions);
	center.appendChild(ddCities);
	div.appendChild(center);
}

function setSelection(dd, query) {
	// ddYears now contains the full list of years
	var list = [];
	for (var i = 0; i < dd.childNodes.length; ++i) {
		list.push(dd.childNodes[i].value);
	}
	dd.selectedIndex = list.indexOf(query);
}

function parseParameters() {
	const urlParams = new URLSearchParams(window.location.search);
	console.log("    Parameters: " + urlParams);
	
	const query_year = urlParams.get(__param_year);
	const query_tag = urlParams.get(__param_tag);
	const query_institution = urlParams.get(__param_institution);
	const query_city = urlParams.get(__param_city);
	
	console.log("    Value of parameter: year= " + query_year);
	console.log("    Value of parameter: tag= " + query_tag);
	console.log("    Value of parameter: place= " + query_institution);
	console.log("    Value of parameter: place= " + query_city);
	
	if (query_year != null) {
		setSelection(document.getElementById(__talks_dd_years_id), query_year);
	}
	if (query_tag != null) {
		setSelection(document.getElementById(__talks_dd_tags_id), query_tag);
	}
	if (query_institution != null) {
		setSelection(document.getElementById(__talks_dd_institutions), query_institution);
	}
	if (query_city != null) {
		setSelection(document.getElementById(__talks_dd_cities), query_city);
	}
}

window.onload = function() {
	// ****** Add the dropdowns in the appropriate 'div' class
	console.log("Adding drop down menus...");
	createDropDowns();
	
	// ****** Populate the dropdown buttons with all the possible
	// values. These drop downs are initialised with the defaut value
	// "All tags", "All years", "All ...", ...
	console.log("Populating drop down menus...");
	populateDropDowns();
	
	// ****** Parse the parameters in the url.
	// Call the function populateTable appropriately
	console.log("Parsing parameters...");
	const parameters = window.location.search;
	if (parameters.length == 0) {
		console.log("    No parameters recorded");
		// no need to set the values of the dropdowns
	}
	else {
		// parse parameters and set values to dropdowns
		parseParameters();
	}
	
	// populate the publications list
	console.log("Populating publication list...");
	populateTalksList();
};
