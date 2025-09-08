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

async function all_directories() {
    const response = await fetch("manifest.json");
    const manifest = await response.json();
    return manifest.directories;
}

async function get_tags(dir) {
    const response = await fetch(dir + "/tags.json");
    const tags = await response.json();
    return tags;
}

function populateDropDowns() {
    console.log("asdf");

	var all_projects = ["All projects"];
	var all_topics = ["All topics"];
	
    const all_dirs = all_directories();

	// traverse all works
	for (var i = 0; i < all_dirs.length; ++i) {
		const tags = get_tags(all_dirs[i]);
		
        for (var i = 0; i < tags.projects.length; ++i) {
            all_projects.push(tags.projects[i]);
        }
		for (var i = 0; i < tags.topics.length; ++i) {
            all_topics.push(tags.topics[i]);
        }
	}
	
	// keep unique tags only
	all_projects = all_projects.filter(onlyUnique);
	all_topics = all_topics.filter(onlyUnique);
	
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
	
	// default tags
	all_projects.unshift("All projects");
	all_topics.unshift("All topics");
	
	console.log("    Add " + all_projects.length + " projects: " + all_projects);
	console.log("    Add " + all_topics.length + " topics: " + all_topics);
	
	var ddProjects = document.getElementById("projects_select");
	var ddTopics = document.getElementById("topics_select");
	
	ddProjects.textContent = '';
	ddTopics.textContent = '';
	
	all_projects.forEach(function(item) { addToDropDown(ddProjects, item, null); });
	all_topics.forEach(function(item) { addToDropDown(ddTopics, item, null); });
	
	console.log("    Values in projects drop down: " + ddProjects.childNodes.length);
	console.log("    Values in topics drop down: " + ddTopics.childNodes.length);
}
