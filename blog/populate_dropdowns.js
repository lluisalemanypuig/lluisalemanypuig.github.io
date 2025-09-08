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
   	var all_projects = [];
	var all_topics = [];
	var all_languages = [];
	
	// traverse all works
	for (var i = 0; i < directory_data.length; ++i) {
		const dir_data = directory_data[i];
        for (var j = 0; j < dir_data.projects.length; ++j) {
            all_projects.push(dir_data.projects[j]);
        }
		for (var j = 0; j < dir_data.topics.length; ++j) {
            all_topics.push(dir_data.topics[j]);
        }
		for (var j = 0; j < dir_data.languages.length; ++j) {
            all_languages.push(dir_data.languages[j]);
        }
	}
	
	// keep unique tags only
	all_projects = all_projects.filter(onlyUnique);
	all_topics = all_topics.filter(onlyUnique);
	all_languages = all_languages.filter(onlyUnique);
	
	// post process tags
	all_projects.sort(
		function(a,b) {
			if (a == "All projects") { return -1; }
			if (b == "All projects") { return  1; }
			return b - a;
		}
	);
	all_topics.sort(
		function(a,b) {
			if (a == "All topics") { return -1; }
			if (b == "All topics") { return  1; }
			return a.localeCompare(b);
		}
	);
	all_languages.sort(
		function(a,b) {
			if (a == "All languages") { return -1; }
			if (b == "All languages") { return  1; }
			return a.localeCompare(b);
		}
	);
	
	// default tags
	all_projects.unshift("All projects");
	all_topics.unshift("All topics");
	all_languages.unshift("All languages");
	
	console.log("    Add " + all_projects.length + " projects: " + all_projects);
	console.log("    Add " + all_topics.length + " topics: " + all_topics);
	console.log("    Add " + all_languages.length + " languages: " + all_languages);
	
	var ddProjects = document.getElementById("projects_select");
	var ddTopics = document.getElementById("topics_select");
	var ddLanguages = document.getElementById("languages_select");
	
	ddProjects.textContent = '';
	ddTopics.textContent = '';
	ddLanguages.textContent = '';
	
	all_projects.forEach(function(item) { addToDropDown(ddProjects, item, null); });
	all_topics.forEach(function(item) { addToDropDown(ddTopics, item, null); });
	all_languages.forEach(function(item) { addToDropDown(ddLanguages, item, null); });
	
	console.log("    Values in projects drop down: " + ddProjects.childNodes.length);
	console.log("    Values in topics drop down: " + ddTopics.childNodes.length);
	console.log("    Values in languages drop down: " + ddLanguages.childNodes.length);
}
