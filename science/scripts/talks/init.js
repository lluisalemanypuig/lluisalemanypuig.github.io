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
	var ddSeminarConf = document.createElement('select');
	var ddInstitutions = document.createElement('select');
	var ddCities = document.createElement('select');
	var ddAuthors = document.createElement('select');
	
	// modify dropdowns' attributes
	
	// onChange
	ddYears.onchange = populateTalksList;
	ddClassifTags.onchange = populateTalksList;
	ddSeminarConf.onchange = populateTalksList;
	ddInstitutions.onchange = populateTalksList;
	ddCities.onchange = populateTalksList;
	ddAuthors.onchange = populateTalksList;
	
	// ids
	ddYears.id = __talks_dd_years_id;
	ddClassifTags.id = __talks_dd_tags_id;
	ddSeminarConf.id = __talks_dd_seminar_conference;
	ddInstitutions.id = __talks_dd_institutions;
	ddCities.id = __talks_dd_cities;
	ddAuthors.id = __talks_dd_authors_id;
	
	var center = document.createElement('center');
	center.appendChild(ddYears);
	center.appendChild(ddClassifTags);
	center.appendChild(ddSeminarConf);
	center.appendChild(ddInstitutions);
	center.appendChild(ddCities);
	center.appendChild(ddAuthors);
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
	console.log("Populating publication list...");
	populateTalksList();
};
