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
	const r = n < 10 || n > 19 ? n % 10 : n;
	return n + (1 <= r && r <= 3 ? s[r] : "th");
}

function format_date(input) {
	const [year, month, day] = input.split("/").map(Number);

	const month_names = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	// Format as "8th September, 2025"
	return `${month_names[month - 1]} ${get_ordinal(day)}, ${year}`;
}

function format_entry(li, entry) {
	var url = document.createElement("a");
	url.href = `/blog/${entry.date}`;
	url.textContent = entry.title;

	li.appendChild(url);
	li.appendChild(
		document.createTextNode(" (" + format_date(entry.date) + ")")
	);
}

function projectNameClicked(event) {
	const project = event.target.value;
	const ddProjects = document.getElementById("projects_select");
	ddProjects.value = project;
	ddProjects.onchange();
}

function topicNameClicked(event) {
	const topic = event.target.value;
	const ddTopics = document.getElementById("topics_select");
	ddTopics.value = topic;
	ddTopics.onchange();
}

function make_tab_span() {
	const bullet_span = document.createElement("span");
	bullet_span.style.display = "inline-block";
	bullet_span.style.width = "1em";
	bullet_span.style.height = "1em";
	bullet_span.style.verticalAlign = "middle";
	return bullet_span;
}

function format_tags(div, entry) {
	if (entry.projects.length > 0) {
		var li = document.createElement("li");
		li.style.listStyleType = "none";

		li.appendChild(make_tab_span());
		li.appendChild(document.createTextNode("Projects:"));

		for (var [index, address_project] of entry.projects.entries()) {
			var project_name_field = document.createElement("span");

			const [repo, project] = retrieveProjectRaw(address_project);

			const tag_text = makeProjectTagText(repo, project);
			const tag_value = makeProjectValue(repo, project);

			project_name_field.textContent = ` ${tag_text}`;
			project_name_field.value = tag_value;
			project_name_field.style.color = "green";
			project_name_field.onclick = projectNameClicked;
			li.appendChild(project_name_field);

			var url = document.createElement("a");
			url.href = `https://github.com/${repo}/${project}`;
			url.textContent = "🔗";
			url.style.color = "green";
			li.appendChild(url);
			if (index < entry.projects.length - 1) {
				li.appendChild(document.createTextNode(","));
			}
		}

		div.appendChild(li);
	}

	if (entry.topics.length > 0) {
		var li = document.createElement("li");
		li.style.listStyleType = "none";

		li.appendChild(make_tab_span());
		li.appendChild(document.createTextNode("Topics:"));

		for (var [index, topic] of entry.topics.entries()) {
			var topic_name = document.createElement("span");
			topic_name.textContent = ` ${topic}`;
			topic_name.style.color = "purple";
			topic_name.value = topic;
			topic_name.onclick = topicNameClicked;

			li.appendChild(topic_name);
			if (index < entry.topics.length - 1) {
				li.appendChild(document.createTextNode(","));
			}
		}

		div.appendChild(li);
	}
}

function populateFilteredEntriesList() {
	var div = document.getElementById("entries");

	while (div.childNodes.length > 0) {
		div.removeChild(div.lastChild);
	}

	const ddYears = document.getElementById("years_select");
	const ddProjects = document.getElementById("projects_select");
	const ddTopics = document.getElementById("topics_select");
	const ddLanguages = document.getElementById("languages_select");

	function getValueDD(dd) {
		return dd.options[dd.selectedIndex].value;
	}
	var use_year = getValueDD(ddYears);
	var use_project = getValueDD(ddProjects);
	var use_topic = getValueDD(ddTopics);
	var use_language = getValueDD(ddLanguages);

	function filter_by_year(entry) {
		if (use_year == "All years") {
			return true;
		}
		return entry.date.split("/").map(Number)[0] == use_year;
	}
	function filter_by_project(entry) {
		if (use_project == "All projects") {
			return true;
		}

		return entry.projects
			.map(function (project_in_entry) {
				const [repo, project] = retrieveProjectRaw(project_in_entry);
				return makeProjectValue(repo, project);
			})
			.includes(use_project);
	}
	function filter_by_topic(entry) {
		if (use_topic == "All topics") {
			return true;
		}
		return entry.topics.includes(use_topic);
	}
	function filter_by_language(entry) {
		if (use_language == "All languages") {
			return true;
		}
		return entry.languages.includes(use_language);
	}

	var previous_year = undefined;

	const directory_data = manifest_data["directories"];
	for (var i = 0; i < directory_data.length; ++i) {
		const entry = directory_data[i];
		const to_be_included =
			filter_by_year(entry) &&
			filter_by_project(entry) &&
			filter_by_topic(entry) &&
			filter_by_language(entry);

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

		if (display_tags) {
			format_tags(div, entry);
		}
	}
}
