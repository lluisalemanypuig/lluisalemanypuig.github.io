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
	const query_journal = urlParams.get(__param_journal);
	const query_worktype = urlParams.get(__param_wt);
	
	console.log("    Value of parameter: year= " + query_year);
	console.log("    Value of parameter: tag= " + query_tag);
	console.log("    Value of parameter: journal= " + query_journal);
	console.log("    Value of parameter: work type= " + query_worktype);
	
	if (query_year != null) {
		setSelection(document.getElementById(__dd_years), query_year);
	}
	if (query_tag != null) {
		setSelection(document.getElementById(__dd_tags), query_tag);
	}
	if (query_journal != null) {
		setSelection(document.getElementById(__dd_journals_insts), query_journal);
	}
	if (query_worktype != null) {
		setSelection(document.getElementById(__dd_wt), query_worktype);
	}
}

window.onload = function() {
	// First, populate the dropdown buttons with all the possible
	// values. These drop downs are initialised with the defaut value
	// "All tags", "All years", "All ...", ...
	console.log("Populating drop down menus...");
	populateDropDowns();
	
	console.log("Parsing parameters...");
	
	// Second, parse the parameters in the url.
	// Call the function populateTable appropriately
	const parameters = window.location.search;
	if (parameters.length == 0) {
		console.log("    No parameters recorded");
		// no need to set the values of the dropdowns
	}
	else {
		// parse parameters and set values to dropdowns
		parseParameters();
	}
	
	console.log("Populating publication list...");
	populatePublicationList();
};
