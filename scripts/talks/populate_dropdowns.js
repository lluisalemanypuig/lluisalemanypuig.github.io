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
function addToDropDown(dd, item) {
	var opt = document.createElement('option');
	opt.value = item;
	opt.text = item;
	dd.appendChild(opt);
}

function populateDropDowns() {
	// gather all 'hidden' names
	var all_years = [];		// years used in 'talks'
	var all_tags = [];		// tags used in 'talks'
	var all_semconf = [];	// seminars/cities used in 'talks'
	var all_insts = [];		// institutions used in 'talks'
	var all_locations = [];	// cities used in 'talks'
	var all_authors = [];		// authors in 'works'
	
	// default tags
	all_years.push(__year_all);
	all_tags.push(__tag_all);
	all_semconf.push(__talkname_all);
	all_insts.push(__institution_all);
	all_locations.push(__location_all);
	all_authors.push(__author_all);
	
	// traverse all talks and gather all tags
	for (var i = 0; i < Object.keys(talks).length; ++i) {
		var key = Object.keys(talks)[i];
		var talkI = talks[key];
		for (var j = 0; j < talkI.tags.length; ++j) {
			all_tags.push(talkI.tags[j]);
		}
		
		all_years.push(talkI.year);
		all_semconf.push(talkI.name);
		all_insts.push(talkI.institution);
		all_locations.push(talkI.location);
		all_authors = all_authors.concat(talkI.authors);
	}
	
	// keep unique tags only
	all_years = all_years.filter(onlyUnique);
	all_tags = all_tags.filter(onlyUnique);
	all_semconf = all_semconf.filter(onlyUnique);
	all_insts = all_insts.filter(onlyUnique);
	all_locations = all_locations.filter(onlyUnique);
	all_authors = all_authors.filter(onlyUnique);
	all_authors = all_authors.filter(function(a) { return a != __author_me; });
	
	// post process tags
	all_years.sort(function(a,b){b-a});
	all_tags.sort(function(a,b){ return a.localeCompare(b); });
	all_semconf.sort(function(a,b){ return a.localeCompare(b); });
	all_insts.sort(function(a,b){ return a.localeCompare(b); });
	all_locations.sort(function(a,b){ return a.localeCompare(b); });
	all_authors.sort(
		function(a,b) {
			if (a == __worktype_all) { return -1; }
			if (b == __worktype_all) { return  1; }
			return a.localeCompare(b);
		}
	);
	
	console.log("    Add " + all_years.length + " years: " + all_years);
	console.log("    Add " + all_tags.length + " tags: " + all_tags);
	console.log("    Add " + all_semconf.length + " semianrs/conferences: " + all_semconf);
	console.log("    Add " + all_insts.length + " institutions: " + all_insts);
	console.log("    Add " + all_locations.length + " cities: " + all_locations);
	console.log("    Add " + all_authors.length + " authors: " + all_authors);
	
	var ddYears = document.getElementById(__talks_dd_years_id);
	var ddTags = document.getElementById(__talks_dd_tags_id);
	var ddSeminarConf = document.getElementById(__talks_dd_seminar_conference);
	var ddInstitutions = document.getElementById(__talks_dd_institutions);
	var ddCities = document.getElementById(__talks_dd_cities);
	var ddAuthors = document.getElementById(__talks_dd_authors_id);
	
	ddYears.textContent = '';
	ddTags.textContent = '';
	ddSeminarConf.textContent = '';
	ddInstitutions.textContent = '';
	ddCities.textContent = '';
	ddAuthors.textContent = '';
	
	all_years.forEach(function(item) { addToDropDown(ddYears, item); });
	all_tags.forEach(function(item) { addToDropDown(ddTags, item); });
	all_semconf.forEach(function(item) { addToDropDown(ddSeminarConf, item); });
	all_insts.forEach(function(item) { addToDropDown(ddInstitutions, item); });
	all_locations.forEach(function(item) { addToDropDown(ddCities, item); });
	all_authors.forEach(function(item) { addToDropDown(ddAuthors, item, null); });
	
	console.log("    Values in years drop down: " + ddYears.childNodes.length);
	console.log("    Values in tags drop down: " + ddTags.childNodes.length);
	console.log("    Values in seminars/conferences drop down: " + ddSeminarConf.childNodes.length);
	console.log("    Values in institutions drop down: " + ddInstitutions.childNodes.length);
	console.log("    Values in cities drop down: " + ddCities.childNodes.length);
	console.log("    Values in authors drop down: " + ddAuthors.childNodes.length);
}
