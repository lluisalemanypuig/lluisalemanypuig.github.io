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
	var list = [];
	for (var i = 0; i < dd.childNodes.length; ++i) {
		list.push(dd.childNodes[i].value);
	}
	dd.selectedIndex = list.indexOf(query);
}

function createCounter() {
	var div = document.getElementById(__div_publist);
	var itemCount = document.createElement("p");
	itemCount.id = __par_pubs_item_count_id;
	div.appendChild(itemCount);
}

function setCounterText(n) {
	var itemCount = document.getElementById(__par_pubs_item_count_id);
	itemCount.innerHTML = '';
	itemCount.appendChild(document.createTextNode("Number of items returned: " + n.toString()));
}

function add_title_h1(div, y) {
	var h1 = document.createElement('h2');
	h1.textContent = y;
	div.appendChild(h1);
}

function make_url(header, text, url, par) {
	if (url == null) { return; }
	
	par.appendChild(document.createTextNode(header));
	var url_ref = document.createElement("a");
	url_ref.textContent = text;
	url_ref.href = url;
	par.appendChild(url_ref);
}

function full_name_plus_short(full_name, short_name) {
	if (full_name.search(short_name) == -1) {
		return full_name + " (" + short_name + ")";
	}
	return full_name;
}

// what to do when author tag is clicked
var authorTagClicked = function(event) {
	console.log("Clicked on author tag:", event.target.textContent);
	setSelection(document.getElementById(__pubs_dd_authors_id), event.target.textContent);
	populatePublicationList();
};

// what to do when type tag is clicked
var typeTagClicked = function(event) {
	console.log("Clicked on publication type tag:", event.target.textContent);
	setSelection(document.getElementById(__pubs_dd_tags_id), event.target.textContent);
	populatePublicationList();
};

function make_DOI_url(doi, par, prefix = "") {
	var url = (doi == null ? null : "https://doi.org/" + doi);
	make_url(prefix + " DOI: ", doi, url, par);
}

function make_ARXIV_url(arxivid, par, prefix = "") {
	var url = (arxivid == null ? null : "https://arxiv.org/abs/" + arxivid);
	make_url(prefix + " arXiv: ", arxivid, url, par);
}

function append_authors_list(par, author_list) {
	
	par.appendChild(document.createTextNode(" "));
	for (var a = 0; a < author_list.length; ++a) {
		var author_name = author_list[a];
		
		if (author_name != __author_me) {
			var author_ref = document.createElement("a");
			author_ref.onclick = authorTagClicked;
			author_ref.style = "color:red;text-decoration:underline;cursor:pointer";
			author_ref.textContent = author_name;
			par.appendChild(author_ref);
		}
		else {
			par.appendChild(document.createTextNode(author_name));
		}
		
		if (a < author_list.length - 1) {
			par.appendChild(document.createTextNode(", "));
		}
	}
	par.appendChild(document.createTextNode("."));
}

function make_tags_list(tag_list) {
	var tags = document.createElement("p");
	if (tag_list.length > 0) {
		tags.appendChild(document.createTextNode("Tags: "));
	}
	for (var t = 0; t < tag_list.length; ++t) {
		var tag_text = tag_list[t];
		
		var tag_ref = document.createElement("a");
		tag_ref.onclick = typeTagClicked;
		tag_ref.style = "color:green;text-decoration:underline;cursor:pointer";
		tag_ref.textContent = tag_text;
		
		tags.appendChild(tag_ref);
		if (t < tag_list.length - 1) {
			tags.appendChild(document.createTextNode(", "));
		}
	}
	if (tag_list.length > 0) {
		tags.appendChild(document.createTextNode("."));
	}
	
	return tags;
}

function format_thesis(par, work) {
	var CITE = work.citation;
	
	// title and author
	par.appendChild(document.createTextNode(" \"" + CITE.title + "\"."));
	append_authors_list(par, CITE.authors);
	
	par.appendChild(document.createTextNode(" " + work.work_type));
	
	// school
	make_url(". School: ", CITE.school, CITE.school_url, par);
	
	// when published
	par.appendChild(document.createTextNode(". " + CITE.when));
	
	// url
	make_url(". Online at: ", CITE.url, CITE.url, par);
	// DOI
	make_DOI_url(CITE.doi, par, ".");
	// arXiv url
	make_ARXIV_url(CITE.arxiv_id, par, ".");
	par.appendChild(document.createTextNode("."));
}

function format_preprint_generic(par, work) {
	var CITE = work.citation;
	
	// title
	par.appendChild(document.createTextNode(" \"" + CITE.title + "\"."));
	append_authors_list(par, CITE.authors);
	
	// where published
	{
	par.appendChild(document.createTextNode(" In repository: "));
	var preprint_italics = document.createElement("i");
	preprint_italics.textContent = full_name_plus_short(CITE.repository, __rejoinproc_relate[CITE.repository]);
	par.appendChild(preprint_italics);
	}
	
	// when published
	par.appendChild(document.createTextNode(". " + CITE.when));
	
	// DOI
	make_DOI_url(CITE.doi, par, ".");
	// arXiv url
	make_ARXIV_url(CITE.arxiv_id, par, ".");
	
	// finish
	par.appendChild(document.createTextNode("."));
}

function format_journal_generic(par, work) {
	var CITE = work.citation;
	
	// title and author
	par.appendChild(document.createTextNode(" \"" + CITE.title + "\"."));
	append_authors_list(par, CITE.authors);
	
	// where published
	par.appendChild(document.createTextNode(" "));
	{
	var journal_italics = document.createElement("i");
	journal_italics.textContent =
		full_name_plus_short(CITE.journal, __rejoinproc_relate[CITE.journal]);
	
	par.appendChild(journal_italics);
	}
	
	// when published
	par.appendChild(document.createTextNode(". " + CITE.when));
	
	// pages in issue
	if (CITE.pages.indexOf('-') != -1) {
		par.appendChild(document.createTextNode(". pp. " + CITE.pages));
	}
	else {
		par.appendChild(document.createTextNode(". p. " + CITE.pages));
	}
	
	// DOI
	make_DOI_url(CITE.doi, par, ".");
	// arXiv url
	make_ARXIV_url(CITE.arxiv_id, par, ".");
	
	// finish
	par.appendChild(document.createTextNode("."));
}

function format_conference_proceedings(par, work) {
	var CITE = work.citation;
	
	// title and author
	par.appendChild(document.createTextNode(" \"" + CITE.title + "\"."));
	append_authors_list(par, CITE.authors);
	
	// where published
	par.appendChild(document.createTextNode(" In "));
	
	if (CITE.proceedings_url != null) {
		var proceedings_italics = document.createElement("i");
		
		var url_ref = document.createElement("a");
		url_ref.textContent =
			full_name_plus_short(CITE.proceedings, __rejoinproc_relate[CITE.proceedings]);
		
		url_ref.href = CITE.proceedings_url;
		
		proceedings_italics.appendChild(url_ref);
		par.appendChild(proceedings_italics);
	}
	else {
		var proceedings_italics = document.createElement("i");
		proceedings_italics.textContent =
			full_name_plus_short(CITE.proceedings, __rejoinproc_relate[CITE.proceedings]);
		
		par.appendChild(proceedings_italics);
	}
	
	// when published
	par.appendChild(document.createTextNode(". " + CITE.when));
	
	// DOI
	make_DOI_url(CITE.doi, par, ".");
	// arXiv url
	make_ARXIV_url(CITE.arxiv_id, par, ".");
	// url to proceedings paper
	make_url(". Online at: ", CITE.paper_url, CITE.paper_url, par);
	// url to poster paper
	make_url(". Poster: ", CITE.poster_url, CITE.poster_url, par);
	
	// finish
	par.appendChild(document.createTextNode("."));
}

function makeFormattedCitation(workid, work) {
	var par = document.createElement("p");
	
	if (work.work_type == __worktype_preprint) {
		format_preprint_generic(par, work);
	}
	else if (work.work_type == __worktype_JournalPaper) {
		format_journal_generic(par, work);
	}
	else if (work.work_type == __worktype_MastersThesis) {
		format_thesis(par, work);
	}
	else if (work.work_type == __worktype_PhDThesis) {
		format_thesis(par, work);
	}
	else if (work.work_type == __worktype_ConferenceProceedings) {
		format_conference_proceedings(par, work);
	}
	else {
		console.error("        Formatting of citation for work type '" + work.work_type + "' not implemented.");
		return null;
	}
	
	// Text area with the raw biblatex citation.
	var textarea = document.createElement("textarea");
	textarea.textContent = work.biblatex_citation;
	textarea.style = "resize:none; width:100%";
	
	var rows = work.biblatex_citation.split("\n");
	//~ var maxRowLength = 0;
	//~ for (var i = 0; i < rows.length; ++i) {
		//~ if (maxRowLength < rows[i].length) {
			//~ maxRowLength = rows[i].length;
		//~ }
	//~ }
	//~ maxRowLength += 8; // tab size in characters
	//~ textarea.cols = maxRowLength;
	textarea.rows = rows.length;
	textarea.id = "textarea_" + workid;
	textarea.readOnly = true;
	
	var notes_paragraph = null;
	if (work.notes != null) {
		notes_paragraph = document.createElement("p");
		notes_paragraph.appendChild(
			document.createTextNode("Notes: " + work.notes)
		);
	}
	
	var tags = make_tags_list(work.tags);
	
	var full = document.createElement("li");
	full.appendChild(par);
	full.appendChild(textarea);
	if (work.notes != null) {
		full.append(notes_paragraph);
	}
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
	console.log("    Create 'counter text'");
	createCounter();
	
	// read values in drop downs
	const ddYear = document.getElementById(__pubs_dd_years_id);
	const ddTag = document.getElementById(__pubs_dd_tags_id);
	const ddReJoInProc = document.getElementById(__pubs_dd_journals_insts_id);
	const ddWorkType = document.getElementById(__pubs_dd_worktype_id);
	const ddAuthors = document.getElementById(__pubs_dd_authors_id);
	
	function getTextDD(dd) { return dd.options[dd.selectedIndex].value; }
	var use_year = getTextDD(ddYear);
	var use_tag = getTextDD(ddTag);
	var use_rejoinproc = getTextDD(ddReJoInProc);
	var use_work_type = getTextDD(ddWorkType);
	var use_author = getTextDD(ddAuthors);
	
	console.log("    Contents of 'year' drop down: " + use_year);
	console.log("    Contents of 'tag' drop down: " + use_tag);
	console.log("    Contents of 'journal' drop down: " + use_rejoinproc);
	console.log("    Contents of 'work type' drop down: " + use_work_type);
	console.log("    Contents of 'author' drop down: " + use_author);
	
	// filtering functions
	function filter_year(work) {
		if (use_year == __year_all) { return true; }
		return work.year == use_year;
	}
	function filter_tag(work) {
		if (use_tag == __tag_all) { return true; }
		return work.tags.includes(use_tag);
	}
	function filter_rejoinproc(work) {
		if (use_rejoinproc == __rejoinproc_all) { return true; }
		
		var data = null;
		if (work.work_type == __worktype_preprint) {
			data = work.citation.repository;
		}
		else if (work.work_type == __worktype_JournalPaper) {
			data = work.citation.journal;
		}
		else if (work.work_type == __worktype_MastersThesis) {
			data = work.citation.school;
		}
		else if (work.work_type == __worktype_PhDThesis) {
			data = work.citation.school;
		}
		else if (work.work_type == __worktype_ConferenceProceedings) {
			data = work.citation.proceedings;
		}
		return data == use_rejoinproc;
	}
	function filter_work_type(work) {
		if (use_work_type == __worktype_all) { return true; }
		return work.work_type == use_work_type;
	}
	function filter_author(work) {
		if (use_author == __author_all) { return true; }
		return work.citation.authors.includes(use_author);
	}
	
	console.log("    Filtering works... (" + Object.keys(works).length + " found)");
	
	// list of works to be listed
	var worksList = [];
	
	// iterate through works and filter
	for (var i = 0; i < Object.keys(works).length; ++i) {
		var key = Object.keys(works)[i];
		var workI = works[key];
		
		var to_be_included = 
			filter_year(workI) &&
			filter_tag(workI) &&
			filter_rejoinproc(workI) &&
			filter_work_type(workI) &&
			filter_author(workI);
		
		if (to_be_included) {
			console.log("        Item: " + key + " is to be included in the list");
			worksList.push(key);
		}
		else {
			console.log("        Item: " + key + " is NOT to be included in the list");
			console.log("            Reason:");
			console.log("                year:", filter_year(workI));
			console.log("                tag:", filter_tag(workI));
			console.log("                rejoinproc:", filter_rejoinproc(workI));
			console.log("                work type:", filter_work_type(workI));
			console.log("                author:", filter_author(workI));
		}
	}
	
	console.log("    Formatting works...");
	
	if (worksList.length > 0) {
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
	}
	
	// ******* Set counter text
	console.log("Setting 'counter''s text'");
	setCounterText(worksList.length);
}
