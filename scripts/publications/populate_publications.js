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

function createCounter() {
	var div = document.getElementById(__div_publist);
	var itemCount = document.createElement("p");
	itemCount.id = __par_pubs_item_count_id;
	div.appendChild(itemCount);
}

function setCounterText(n) {
	var itemCount = document.getElementById(__par_pubs_item_count_id);
	itemCount.innerHTML = '';
	itemCount.appendChild(document.createTextNode("Amount of items returned: " + n.toString()));
}

function add_title_h1(div, y) {
	var h1 = document.createElement('h2');
	h1.textContent = y;
	div.appendChild(h1);
}

function make_arXiv_url(CITE, par, with_dot) {
	if (with_dot) {
		par.appendChild(document.createTextNode(". arXiv url: "));
	}
	else {
		par.appendChild(document.createTextNode(" arXiv url: "));
	}
	var url_ref = document.createElement("a");
	url_ref.textContent = CITE.arxiv_url;
	url_ref.href = CITE.arxiv_url;
	par.appendChild(url_ref);
	par.appendChild(document.createTextNode("."));
}

function format_JSTAT(work) {
	var CITE = work.citation;
	var par = document.createElement("p");
	
	// title and author
	par.appendChild(document.createTextNode(" \"" + CITE.title + "\"."));
	par.appendChild(document.createTextNode(" " + CITE.authors + "."));
	
	// where published
	par.appendChild(document.createTextNode(" In: "));
	var journal_italics = document.createElement("i");
	journal_italics.textContent = CITE.journal;
	par.appendChild(journal_italics);
	
	// when published
	par.appendChild(document.createTextNode(" " + CITE.when));
	
	// DOI
	par.appendChild(document.createTextNode(". DOI: "));
	var doi_ref = document.createElement("a");
	doi_ref.textContent = CITE.doi;
	doi_ref.href = CITE.doi;
	par.appendChild(doi_ref);
	par.appendChild(document.createTextNode("."));
	
	// arXiv url
	make_arXiv_url(CITE, par, false)
	
	return par;
}

function format_UPC(work) {
	var CITE = work.citation;
	var par = document.createElement("p");
	
	// title and author
	par.appendChild(document.createTextNode(" \"" + CITE.title + "\"."));
	par.appendChild(document.createTextNode(" " + CITE.authors + "."));
	
	if (work.work_type == __wt_MastersThesis) {
		par.appendChild(document.createTextNode(" Masters Thesis."));
	}
	
	// where published
	par.appendChild(document.createTextNode(" In: "));
	var journal_italics = document.createElement("i");
	journal_italics.textContent = CITE.journal;
	par.appendChild(journal_italics);
	
	// when published
	par.appendChild(document.createTextNode(" " + CITE.when));
	
	// url (UPC handle)
	par.appendChild(document.createTextNode(". URL: "));
	var doi_ref = document.createElement("a");
	doi_ref.textContent = CITE.doi;
	doi_ref.href = CITE.doi;
	par.appendChild(doi_ref);
	par.appendChild(document.createTextNode("."));
	
	return par;
}

function format_ARXIV(work) {
	var CITE = work.citation;
	var par = document.createElement("p");
	
	// title and author
	par.appendChild(document.createTextNode(" \"" + CITE.title + "\"."));
	par.appendChild(document.createTextNode(" " + CITE.authors + "."));
	
	// where published
	par.appendChild(document.createTextNode(" In: "));
	var journal_italics = document.createElement("i");
	journal_italics.textContent = CITE.journal;
	par.appendChild(journal_italics);
	
	// when published
	par.appendChild(document.createTextNode(" " + CITE.when));
	
	// arXiv url
	make_arXiv_url(CITE, par, true)
	
	return par;
}

function makeFormattedCitation(workid, work) {
	var par = null;
	
	if (work.journal == __journal_ARXIV_name) {
		par = format_ARXIV(work);
	}
	else if (work.journal == __journal_JSTAT_name) {
		par = format_JSTAT(work);
	}
	else if (work.journal == __journal_UPC_name) {
		par = format_UPC(work);
	}
	else {
		console.error("        Formatting of citation for journal '" + work.journal + "' not implemented.");
		return null;
	}
	
	// Text area with the raw biblatex citation.
	// I like being a nice person.
	var ta = document.createElement("textarea");
	ta.textContent = work.biblatex_citation;
	ta.style = "resize : none";
	
	var rows = work.biblatex_citation.split("\n");
	var maxRowLength = 0;
	for (var i = 0; i < rows.length; ++i) {
		if (maxRowLength < rows[i].length) {
			maxRowLength = rows[i].length;
		}
	}
	maxRowLength += 8; // tab size in characters
	ta.cols = maxRowLength;
	ta.rows = rows.length;
	ta.id = "textarea_" + workid;
	ta.readOnly = true;
	
	var tags = document.createElement("p");
	if (work.tags.length > 0) {
		tags.appendChild(document.createTextNode("Tags: "));
	}
	for (var t = 0; t < work.tags.length; ++t) {
		var tag_text = work.tags[t];
		const url_tag_filt = __url_publications + "?" + __param_tag + "=" + tag_text;
		
		var tag_ref = document.createElement("a");
		tag_ref.href = url_tag_filt;
		tag_ref.textContent = __tag_relate[tag_text];
		tags.appendChild(tag_ref);
		if (t < work.tags.length - 1) {
			tags.appendChild(document.createTextNode(", "));
		}
	}
	if (work.tags.length > 0) {
		tags.appendChild(document.createTextNode("."));
	}
	
	var full = document.createElement("li");
	full.appendChild(par);
	full.appendChild(ta);
	full.append(tags);
	
	return full;
}

function populatePublicationList() {
	// class where to add the publications list
	var div = document.getElementById(__div_publist);
	
	// prior to doing any work, first wipe the div class, namely
	// remove all the h1 and ul objects except the dropdowns
	while (div.childNodes.length > 1) {
		div.removeChild(div.lastChild);
	}
	
	// ******* Add message 'placeholder'
	console.log("Create 'counter text'");
	createCounter();
	
	// read values in drop downs
	const ddYear = document.getElementById(__pubs_dd_years_id);
	const ddTag = document.getElementById(__pubs_dd_tags_id);
	const ddJournal = document.getElementById(__pubs_dd_journals_insts_id);
	const ddWorkType = document.getElementById(__pubs_dd_wt_id);
	
	function getTextDD(dd) { return dd.options[dd.selectedIndex].value; }
	var use_year = getTextDD(ddYear);
	var use_tag = getTextDD(ddTag);
	var use_journal = getTextDD(ddJournal);
	var use_work_type = getTextDD(ddWorkType);
	
	console.log("    Contents of 'year' drop down: " + use_year);
	console.log("    Contents of 'tag' drop down: " + use_tag);
	console.log("    Contents of 'journal' drop down: " + use_journal);
	console.log("    Contents of 'work type' drop down: " + use_work_type);
	
	// filtering functions
	function filter_year(work) {
		if (use_year == "all_years") { return true; }
		return work.year == use_year;
	}
	function filter_tag(work) {
		if (use_tag == "all_tags") { return true; }
		return work.tags.includes(use_tag);
	}
	function filter_journal(work) {
		if (use_journal == "all_journals_institutions") { return true; }
		return work.journal == use_journal;
	}
	function filter_work_type(work) {
		if (use_work_type == "all_work_types") { return true; }
		return work.work_type == use_work_type;
	}
	
	console.log("    Filtering works...");
	
	// list of works to be listed
	var worksList = [];
	
	// iterate through works and filter
	for (var i = 0; i < Object.keys(works).length; ++i) {
		var key = Object.keys(works)[i];
		var workI = works[key];
		
		var to_be_included = 
			filter_year(workI) &&
			filter_tag(workI) &&
			filter_journal(workI) &&
			filter_work_type(workI);
		
		if (to_be_included) {
			console.log("        Item: " + key + " is to be included in the list");
			worksList.push(key);
		}
	}
	
	console.log("    Formatting works...");
	
	// current year of publication
	var currentYear = worksList[0].year;
	// current list of publications
	var currentList = document.createElement('ul');
	currentList.id = "publist_" + currentYear;
	// ids of lists of publication lists
	var list_ids = [currentList.id];
	
	// add the first year title
	add_title_h1(div, currentYear);
	
	// largest amount of columns among textareas
	var maxCols = 0;
	for (var i = 0; i < worksList.length; ++i) {
		var key = worksList[i];
		var workI = works[key];
		console.log("        Formatting " + key + "...");
		
		// add new year title, create new list
		if (workI.year != currentYear) {
			
			// add to div the current list
			div.appendChild(currentList);
			
			// update the year and add it
			currentYear = workI.year;
			add_title_h1(div, currentYear);
			
			// make a new list
			currentList = document.createElement('ul');
			currentList.id = "publist_" + currentYear;
			list_ids.push(currentList.id);
		}
		
		// make the entry for the current work and
		// keep track of the maximum number of columns
		var entry = makeFormattedCitation(key, workI);
		currentList.appendChild(entry);
		
		// text area
		var textArea = entry.childNodes[1];
		if (maxCols < textArea.cols) {
			maxCols = textArea.cols;
		}
	}
	// add the current list
	div.appendChild(currentList);
	
	// make all text areas have the same number of columns.
	for (var j = 0; j < list_ids.length; ++j) {
		var list = document.getElementById(list_ids[j]);
		
		for (var i = 0; i < list.childNodes.length; ++i) {
			// item is a <li> object
			var itemChildren = list.childNodes[i].childNodes;
			// text area
			var textArea = itemChildren[1];
			textArea.cols = maxCols;
		}
	}
	
	// ******* Set counter text
	console.log("Setting 'counter''s text'");
	setCounterText(worksList.length);
}
