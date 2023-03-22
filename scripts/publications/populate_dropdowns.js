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
	
	if (relate == null) {
		opt.text = item;
		opt.value = item;
	}
	else {
		opt.text = relate[item];
		opt.value = item;
	}
	dd.appendChild(opt);
}

function populateDropDowns() {
	// gather all 'hidden' names
	var all_tags = [];			// tags used in 'works'
	var all_years = [];			// years used in 'works'
	var all_rejoinproc = [];	// journals used in 'works'
	var all_work_types = [];	// work types used in 'works'
	var all_authors = [];		// authors in 'works'
	
	// default tags
	all_tags.push(__tag_all);
	all_years.push(__year_all);
	all_rejoinproc.push(__rejoinproc_all);
	all_work_types.push(__worktype_all);
	all_authors.push(__author_all);
	
	// traverse all works
	for (var i = 0; i < Object.keys(works).length; ++i) {
		var key = Object.keys(works)[i];
		var workI = works[key];
		
		all_tags = all_tags.concat(workI.tags);
		all_authors = all_authors.concat(workI.citation.authors);
		
		// gather years
		all_years.push(workI.year);
		// gather work types
		all_work_types.push(workI.work_type);
		
		// gather reposiroties/journals/institutions/proceedings
		if (workI.work_type == __worktype_preprint) {
			all_rejoinproc.push(workI.citation.repository);
		}
		else if (workI.work_type == __worktype_JournalPaper) {
			all_rejoinproc.push(workI.citation.journal);
		}
		else if (workI.work_type == __worktype_MastersThesis) {
			all_rejoinproc.push(workI.citation.school);
		}
		else if (workI.work_type == __worktype_ConferenceProceedings) {
			all_rejoinproc.push(workI.citation.proceedings);
		}
	}
	
	// keep unique tags only
	all_years = all_years.filter(onlyUnique);
	all_tags = all_tags.filter(onlyUnique);
	all_rejoinproc = all_rejoinproc.filter(onlyUnique);
	all_work_types = all_work_types.filter(onlyUnique);
	all_authors = all_authors.filter(onlyUnique);
	all_authors = all_authors.filter(function(a) { return a != __author_me; });
	
	// post process tags
	all_years.sort(
		function(a,b) {
			if (a == __year_all) { return -1; }
			if (b == __year_all) { return  1; }
			return b - a;
		}
	);
	all_tags.sort(
		function(a,b) {
			if (a == __tag_all) { return -1; }
			if (b == __tag_all) { return  1; }
			return a.localeCompare(b);
		}
	);
	all_rejoinproc.sort(
		function(a,b) {
			if (a == __rejoinproc_all) { return -1; }
			if (b == __rejoinproc_all) { return  1; }
			return a.localeCompare(b);
		}
	);
	all_work_types.sort(
		function(a,b) {
			if (a == __worktype_all) { return -1; }
			if (b == __worktype_all) { return  1; }
			return a.localeCompare(b);
		}
	);
	all_authors.sort(
		function(a,b) {
			if (a == __worktype_all) { return -1; }
			if (b == __worktype_all) { return  1; }
			return a.localeCompare(b);
		}
	);
	
	console.log("    Add " + all_years.length + " years: " + all_years);
	console.log("    Add " + all_tags.length + " tags: " + all_tags);
	console.log("    Add " + all_rejoinproc.length + " journals: " + all_rejoinproc);
	console.log("    Add " + all_work_types.length + " work types: " + all_work_types);
	console.log("    Add " + all_authors.length + " authors: " + all_authors);
	
	var ddYears = document.getElementById(__pubs_dd_years_id);
	var ddTags = document.getElementById(__pubs_dd_tags_id);
	var ddJournals = document.getElementById(__pubs_dd_journals_insts_id);
	var ddWorkTypes = document.getElementById(__pubs_dd_worktype_id);
	var ddAuthors = document.getElementById(__pubs_dd_authors_id);
	
	ddYears.textContent = '';
	ddTags.textContent = '';
	ddJournals.textContent = '';
	ddWorkTypes.textContent = '';
	ddAuthors.textContent = '';
	
	all_years.forEach(function(item) { addToDropDown(ddYears, item, null); });
	all_tags.forEach(function(item) { addToDropDown(ddTags, item, null); });
	all_rejoinproc.forEach(function(item) { addToDropDown(ddJournals, item, __rejoinproc_relate); });
	all_work_types.forEach(function(item) { addToDropDown(ddWorkTypes, item, null); });
	all_authors.forEach(function(item) { addToDropDown(ddAuthors, item, null); });
	
	console.log("    Values in years drop down: " + ddYears.childNodes.length);
	console.log("    Values in tags drop down: " + ddTags.childNodes.length);
	console.log("    Values in journals drop down: " + ddJournals.childNodes.length);
	console.log("    Values in work types drop down: " + ddWorkTypes.childNodes.length);
	console.log("    Values in authors drop down: " + ddAuthors.childNodes.length);
}
