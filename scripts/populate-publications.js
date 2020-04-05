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
	
	// url
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
	
	// url and arXiv id
	par.appendChild(document.createTextNode(". arXiv: " + CITE.arxiv_id));
	par.appendChild(document.createTextNode(". URL: "));
	var url_ref = document.createElement("a");
	url_ref.textContent = CITE.arxiv_url;
	url_ref.href = CITE.arxiv_url;
	par.appendChild(url_ref);
	par.appendChild(document.createTextNode("."));
	
	return par;
}

function makeFormattedCitation(workid, work) {
	var par = null;
	
	// add DOI, or arXiv id, or handle
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
		
		console.log("        Adding href for tag '" + tag_text + "'.");
		console.log("            url '" + url_tag_filt + "'.");
		
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
};

function populatePublicationList() {
	function getTextDD(dd) { return dd.options[dd.selectedIndex].value; };
	
	// read values in drop downs
	const ddYear = document.getElementById(__dd_years);
	const ddTag = document.getElementById(__dd_tags);
	const ddJournal = document.getElementById(__dd_journals_insts);
	const ddWorkType = document.getElementById(__dd_wt);
	
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
	
	// list of papers
	var papersList = document.getElementById(__ul_papers);
	papersList.textContent = '';
	
	// largest amount of columns among textareas
	var maxCols = 0;
	
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
			console.log("    Item: " + key + " is to be included in the list");
			console.log("    Formatting " + key + "...");
			
			var entry = makeFormattedCitation(key, workI);
			papersList.appendChild(entry);
			
			// text area
			var textArea = entry.childNodes[1];
			if (maxCols < textArea.cols) {
				maxCols = textArea.cols;
			}
		}
	}
	
	// make all text areas have the same number of columns.
	for (var i = 0; i < papersList.childNodes.length; ++i) {
		// item is a <li> object
		var itemChildren = papersList.childNodes[i].childNodes;
		// text area
		var textArea = itemChildren[1];
		textArea.cols = maxCols;
	}
}
