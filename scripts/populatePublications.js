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

function populateTable() {
	// read values in drop downs
	var ddYear = document.getElementById('ddYears');
	var ddTag = document.getElementById('ddClassifTags');
	var ddJournal = document.getElementById('ddJournals');
	var ddWorkType = document.getElementById('ddWorkTypes');
	
	function getTextDD(dd) { return dd.options[dd.selectedIndex].value; };
	var use_year = getTextDD(ddYear);
	var use_tag = getTextDD(ddTag);
	var use_journal = getTextDD(ddJournal);
	var use_work_type = getTextDD(ddWorkType);
	
	console.log("Contents of 'year' drop down: " + use_year);
	console.log("Contents of 'tag' drop down: " + use_tag);
	console.log("Contents of 'journal' drop down: " + use_journal);
	console.log("Contents of 'work type' drop down: " + use_work_type);
	
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
		if (use_journal == "all_journals") { return true; }
		return work.journal == use_journal;
	}
	function filter_work_type(work) {
		if (use_work_type == "all_work_types") { return true; }
		return work.work_type == use_work_type;
	}
	
	// list of papers
	var papersList = document.getElementById('papersList');
	
	function makeFormattedCitation(work) {
		var par = null;
		
		// add DOI, or arXiv id, or handle
		if (work.journal == __ARXIV_short_name) {
			par = format_ARXIV(work);
		}
		else if (work.journal == __JSTAT_short_name) {
			par = format_JSTAT(work);
		}
		else if (work.journal == __UPC_short_name) {
			par = format_UPC(work);
		}
		else {
			console.log("Formatting of citation for journal '" + work.journal + "' not implemented.");
			return null;
		}
		
		var full = document.createElement("li");
		full.appendChild(par);
		
		var ta = document.createElement("textarea");
		ta.textContent = work.biblatex_citation;
		ta.style = "resize : none";
		ta.cols = 100;
		ta.rows = 5;
		ta.readOnly = true;
		full.appendChild(ta);
		
		return full;
	};
	
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
			
			console.log("Item: " + key + " is to be included in the list");
			
			var entry = makeFormattedCitation(workI);
			papersList.appendChild(entry);
		}
	}
}
