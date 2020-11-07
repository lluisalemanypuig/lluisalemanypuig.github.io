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

// function to compute sets of unique elements
function onlyUnique(value, index, self) { 
	return self.indexOf(value) === index;
}

// populate dropdown: use long names for the text, and the short
// names for the values.
function addToDropDown(dd, item, relate) {
	var opt = document.createElement('option');
	opt.value = item;
	opt.text = relate[item];
	dd.appendChild(opt);
}

function populateDropDowns() {
	// gather all 'hidden' names
	var all_tags = [];		// tags used in 'works'
	var all_years = [];		// years used in 'works'
	var all_journals = [];	// journals used in 'works'
	var all_work_types = [];// work types used in 'works'
	
	// default tags
	all_tags.push(__tag_all);
	all_years.push(__years_all);
	all_journals.push(__journal_all);
	all_work_types.push(__wt_all);
	
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
	
	// keep unique tags only
	all_years = all_years.filter(onlyUnique);
	all_tags = all_tags.filter(onlyUnique);
	all_journals = all_journals.filter(onlyUnique);
	all_work_types = all_work_types.filter(onlyUnique);
	
	// post process tags
	all_years.sort(function(a,b){b-a});
	all_tags.sort(function(a,b){ return a.localeCompare(b); });
	all_journals.sort(function(a,b){ return a.localeCompare(b); });
	all_work_types.sort(function(a,b){ return a.localeCompare(b); });
	
	console.log("    Add " + all_years.length + " years: " + all_years);
	console.log("    Add " + all_tags.length + " tags: " + all_tags);
	console.log("    Add " + all_journals.length + " journals: " + all_journals);
	console.log("    Add " + all_work_types.length + " work types: " + all_work_types);
	
	var ddYears = document.getElementById(__pubs_dd_years_id);
	var ddTags = document.getElementById(__pubs_dd_tags_id);
	var ddJournals = document.getElementById(__pubs_dd_journals_insts_id);
	var ddWorkTypes = document.getElementById(__pubs_dd_wt_id);
	
	ddYears.textContent = '';
	ddTags.textContent = '';
	ddJournals.textContent = '';
	ddWorkTypes.textContent = '';
	
	all_years.forEach(function(item) { addToDropDown(ddYears, item, __years_relate); });
	all_tags.forEach(function(item) { addToDropDown(ddTags, item, __tag_relate); });
	all_journals.forEach(function(item) { addToDropDown(ddJournals, item, __journal_relate); });
	all_work_types.forEach(function(item) { addToDropDown(ddWorkTypes, item, __wt_relate); });
	
	console.log("    Values in years drop down: " + ddYears.childNodes.length);
	console.log("    Values in tags drop down: " + ddTags.childNodes.length);
	console.log("    Values in journals drop down: " + ddJournals.childNodes.length);
	console.log("    Values in work types drop down: " + ddWorkTypes.childNodes.length);
}
