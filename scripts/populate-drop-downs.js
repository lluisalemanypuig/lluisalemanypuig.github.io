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

function populateDropDowns() {
	var all_tags = [];		// all tags used in 'works'
	var all_years = [];		// all years used in 'works'
	var all_journals = [];	// all journals used in 'works'
	var all_work_types = [];// all work types used in 'works'
	
	// traverse all works and gather all tags
	for (var i = 0; i < Object.keys(works).length; ++i) {
		var key = Object.keys(works)[i];
		var workI = works[key];
		for (var j = 0; j < workI.tags.length; ++j) {
			all_tags.push(workI.tags[j]);
		}
		
		all_years.push(workI.year);
		all_journals.push(workI.journal);
		all_work_types.push(workI.work_type);
	}
	
	// function to compute unique elements
	function onlyUnique(value, index, self) { 
		return self.indexOf(value) === index;
	}
	
	// keep unique tags only
	all_tags = all_tags.filter(onlyUnique);
	all_years = all_years.filter(onlyUnique);
	all_journals = all_journals.filter(onlyUnique);
	all_work_types = all_work_types.filter(onlyUnique);
	
	// post process tags
	all_tags.sort(function(a,b){b-a});
	all_years.sort(function(a,b){b-a});
	all_journals.sort(function(a,b){b-a});
	all_work_types.sort(function(a,b){b-a});
	
	// populate dropdown
	function addToDropDown(dd, item) {
		var opt = document.createElement('option');
		opt.value = item;
		opt.text = item;
		dd.appendChild(opt);
	}
	
	var ddYears = document.getElementById('ddYears');
	all_years.forEach(function(item) { addToDropDown(ddYears, item); });
	
	var ddTags = document.getElementById('ddClassifTags');
	all_tags.forEach(function(item) { addToDropDown(ddTags, item); });
	
	var ddJorunals = document.getElementById('ddJournals');
	all_journals.forEach(function(item) { addToDropDown(ddJorunals, item); });
	
	var ddWorkTypes = document.getElementById('ddWorkTypes');
	all_work_types.forEach(function(item) { addToDropDown(ddWorkTypes, item); });
}
