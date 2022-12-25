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
	var div = document.getElementById(__div_publist);
	// clean up the whole thing
	div.innerHTML = '';
	
	// create the dropddowns
	var ddYears = document.createElement('select');
	var ddClassifTags = document.createElement('select');
	var ddJournalsInstitutions = document.createElement('select');
	var ddWorkTypes = document.createElement('select');
	
	// modify dropdowns' attributes
	
	// onChange
	ddYears.onchange = populatePublicationList;
	ddClassifTags.onchange = populatePublicationList;
	ddJournalsInstitutions.onchange = populatePublicationList;
	ddWorkTypes.onchange = populatePublicationList;
	
	// ids
	ddYears.id = __pubs_dd_years_id;
	ddClassifTags.id = __pubs_dd_tags_id;
	ddJournalsInstitutions.id = __pubs_dd_journals_insts_id;
	ddWorkTypes.id = __pubs_dd_wt_id;
	
	var center = document.createElement('center');
	center.appendChild(ddYears);
	center.appendChild(ddClassifTags);
	center.appendChild(ddJournalsInstitutions);
	center.appendChild(ddWorkTypes);
	div.appendChild(center);
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
	
	// populate the publications list
	console.log("Populating publication list...");
	populatePublicationList();
};
