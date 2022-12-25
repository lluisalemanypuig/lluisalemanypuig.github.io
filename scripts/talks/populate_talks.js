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

function createCounter() {
	var div = document.getElementById(__div_talklist);
	var itemCount = document.createElement("p");
	itemCount.id = __par_talks_item_count_id;
	div.appendChild(itemCount);
}

function setCounterText(n) {
	var itemCount = document.getElementById(__par_talks_item_count_id);
	itemCount.innerHTML = '';
	itemCount.appendChild(document.createTextNode("Amount of items returned: " + n.toString()));
}

function add_title_h1(div, y) {
	var h1 = document.createElement('h2');
	h1.textContent = y;
	div.appendChild(h1);
}

function make_info_url(header, text, url, par) {
	par.appendChild(document.createTextNode(header));
	
	if (url != null) {
		var url_ref = document.createElement("a");
		url_ref.textContent = text;
		url_ref.href = url;
		par.appendChild(url_ref);
	}
	else {
		par.appendChild(document.createTextNode(text));
	}
}

function makeFormattedTalk(talkid, TALK) {
	var par = document.createElement("p");
	
	// add title of the talk
	par.appendChild(document.createTextNode("Title of the " + TALK.talk_type + ": "));
	{
	var title_italics = document.createElement("i");
	title_italics.textContent = TALK.talk_title;
	par.appendChild(title_italics);
	}
	
	// add session number
	if (TALK.session != null) {
		par.appendChild(document.createTextNode(". Session: " + TALK.session));
	}
	
	// add date
	par.appendChild(document.createTextNode(". " + TALK.year + " (" + TALK.date + ")"));
	
	// add seminar name (and url if applicable)
	make_info_url(". " + TALK.talk_type + ": ", TALK.what_talk, TALK.talk_url, par);
	
	// add location
	{
	var full_location = TALK.location;
	if (TALK.location_mode != null) {
		full_location += " " + TALK.location_mode
	}
	par.appendChild(document.createTextNode(". " + full_location));
	}
	
	// add institution name (and url if applicable)
	make_info_url( ". ", TALK.institution, TALK.institution_url, par);
	
	// add url to the slides
	make_info_url(". ", "Slides", TALK.slides_url, par);
	
	// add url to the course
	if (TALK.course_url != null) {
		make_info_url(". ", "Link to the full " + TALK.talk_type, TALK.course_url, par);
	}
	
	// finish
	par.appendChild(document.createTextNode("."));
	
	var tags = document.createElement("p");
	if (TALK.tags.length > 0) {
		tags.appendChild(document.createTextNode("Tags: "));
	}
	for (var t = 0; t < TALK.tags.length; ++t) {
		var tag_text = TALK.tags[t];
		const url_tag_filt = __url_publications + "?" + __param_tag + "=" + tag_text;
		
		var tagClicked = function(event) {
			console.log("Clicked on talks type tag:", event.target.textContent);
			setSelection(document.getElementById(__talks_dd_tags_id), event.target.textContent);
			populateTalksList();
		};
		
		var tag_ref = document.createElement("a");
		tag_ref.onclick = tagClicked;
		tag_ref.style = "color:blue;text-decoration:underline";
		tag_ref.textContent = tag_text;
		
		tags.appendChild(tag_ref);
		if (t < TALK.tags.length - 1) {
			tags.appendChild(document.createTextNode(", "));
		}
	}
	if (TALK.tags.length > 0) {
		tags.appendChild(document.createTextNode("."));
	}
	
	var full = document.createElement("li");
	full.appendChild(par);
	full.append(tags);
	
	return full;
}

function populateTalksList() {
	// class where to add the publications list
	var div = document.getElementById(__div_talklist);
	
	// prior to doing any work, first wipe the div class, namely
	// remove all the h1 and ul objects except the dropdowns
	while (div.childNodes.length > 1) {
		div.removeChild(div.lastChild);
	}
	
	// ******* Add message 'placeholder'
	console.log("Create 'counter text'");
	createCounter();
	
	// read values in drop downs
	const ddYear = document.getElementById(__talks_dd_years_id);
	const ddTag = document.getElementById(__talks_dd_tags_id);
	const ddSemConf = document.getElementById(__talks_dd_seminar_conference);
	const ddInstitutions = document.getElementById(__talks_dd_institutions);
	const ddCities = document.getElementById(__talks_dd_cities);
	
	function getTextDD(dd) { return dd.options[dd.selectedIndex].value; };
	var use_year = getTextDD(ddYear);
	var use_tag = getTextDD(ddTag);
	var use_semconf = getTextDD(ddSemConf);
	var use_institution = getTextDD(ddInstitutions);
	var use_city = getTextDD(ddCities);
	
	console.log("    Contents of 'year' drop down: " + use_year);
	console.log("    Contents of 'tag' drop down: " + use_tag);
	console.log("    Contents of 'seminar conference' drop down: " + use_semconf);
	console.log("    Contents of 'institution' drop down: " + use_institution);
	console.log("    Contents of 'city' drop down: " + use_city);
	
	// filtering functions
	function filter_year(talk) {
		if (use_year == __year_all) { return true; }
		return use_year == talk.year;
	}
	function filter_tag(talk) {
		if (use_tag == __tag_all) { return true; }
		return talk.tags.includes(use_tag);
	}
	function filter_semconf(talk) {
		if (use_semconf == __talkname_all) { return true; }
		return use_semconf == talk.what_talk;
	}
	function filter_institution(talk) {
		if (use_institution == __institution_all) { return true; }
		return use_institution == talk.institution;
	}
	function filter_city(talk) {
		if (use_city == __location_all) { return true; }
		return use_city == talk.location;
	}
	
	console.log("    Filtering works...");
	
	// list of works to be listed
	var talksList = [];
	
	// iterate through works and filter
	for (var i = 0; i < Object.keys(talks).length; ++i) {
		var key = Object.keys(talks)[i];
		var talkI = talks[key];
		
		var to_be_included = 
			filter_year(talkI) &&
			filter_tag(talkI) &&
			filter_semconf(talkI) &&
			filter_institution(talkI) &&
			filter_city(talkI);
		
		if (to_be_included) {
			console.log("        Item: " + key + " is to be included in the list");
			talksList.push(key);
		}
	}
	
	console.log("    Formatting works...");
	
	// current year of publication
	var currentYear = talksList[0].year;
	// current list of publications
	var currentList = document.createElement('ul');
	currentList.id = "publist_" + currentYear;
	// ids of lists of publication lists
	var list_ids = [currentList.id];
	
	// add the first year title
	add_title_h1(div, currentYear);
	
	// largest amount of columns among textareas
	var maxCols = 0;
	for (var i = 0; i < talksList.length; ++i) {
		var key = talksList[i];
		var talkI = talks[key];
		console.log("        Formatting " + key + "...");
		
		// add new year title, create new list
		if (talkI.year != currentYear) {
			
			// add to div the current list
			div.appendChild(currentList);
			
			// update the year and add it
			currentYear = talkI.year;
			add_title_h1(div, currentYear);
			
			// make a new list
			currentList = document.createElement('ul');
			currentList.id = "publist_" + currentYear;
			list_ids.push(currentList.id);
		}
		
		// make the entry for the current work and
		// keep track of the maximum number of columns
		var entry = makeFormattedTalk(key, talkI);
		currentList.appendChild(entry);
		
		// text area
		var textArea = entry.childNodes[1];
		if (maxCols < textArea.cols) {
			maxCols = textArea.cols;
		}
	}
	// add the current list
	div.appendChild(currentList);
	
	// ******* Set counter text
	console.log("Setting 'counter''s text'");
	setCounterText(talksList.length);
}
