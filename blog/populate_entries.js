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

function get_ordinal(n) {
    const s = ["", "st", "nd", "rd"];
    const r = n % 10;
    return n + (1 <= r && r <= 3 ? s[r] : "th");
}

function format_date(input) {
    const [year, month, day] = input.split("_").map(Number);

    const month_names = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    // Format as "8th September, 2025"
    return `${month_names[month - 1]} ${get_ordinal(day)}, ${year}`;
}

function format_entry(li, entry) {
    
    var url = document.createElement("a");
    url.href = `/blog/${entry.date}`;
    url.textContent = entry.title;
    
    li.appendChild(url);
    li.appendChild(document.createTextNode(" (" + format_date(entry.date) + ")"));
}

function populateFilteredEntriesList() {
    var div = document.getElementById("entries");
	
	while (div.childNodes.length > 1) {
		div.removeChild(div.lastChild);
	}

    const ddYears = document.getElementById("years_select");
    const ddProjects = document.getElementById("projects_select");
	const ddTopics = document.getElementById("topics_select");
    const ddLanguages = document.getElementById("languages_select");

    function getTextDD(dd) { return dd.options[dd.selectedIndex].value; }
    var use_year = getTextDD(ddYears);
	var use_project = getTextDD(ddProjects);
	var use_topic = getTextDD(ddTopics);
    var use_language = getTextDD(ddLanguages);

    function filter_year(entry) {
		if (use_year == "All years") { return true; }
		return entry.date.split("_").map(Number)[0] == use_year;
	}
    function filter_project(entry) {
		if (use_project == "All projects") { return true; }
		return entry.project.includes(use_project);
	}
	function filter_topic(entry) {
		if (use_topic == "All topics") { return true; }
		return entry.topics.includes(use_topic);
	}
    function filter_language(entry) {
		if (use_language == "All languages") { return true; }
		return entry.languages.includes(use_language);
	}

    var previous_year = undefined;

    for (var i = directory_data.length - 1; i >= 0; --i) {
        const entry = directory_data[i];
        const to_be_included =
            filter_year(entry) &&
            filter_project(entry) &&
            filter_topic(entry) &&
            filter_language(entry);

        if (!to_be_included) {
            continue;
        }

        const [year, _, __] = entry.date.split("_").map(Number);
        if (previous_year == undefined || year != previous_year) {
            previous_year = year;
            const h2 = document.createElement("h2");
            h2.appendChild(document.createTextNode(previous_year));
            div.appendChild(h2);
        }
        
        var li = document.createElement("li");
        format_entry(li, entry);
        div.appendChild(li);
    }
}
