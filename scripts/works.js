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

// -----------------------------------------------------------
// My works (theses, journal articles, papers, preprints, ...)

const works = {
	
	w04 : {
		// classification of work
		work_type : __wt_preprint,
		journal : __journal_ARXIV_name,
		tags : [__tag_Networks, __tag_RandGraphs],
		year : 2020,
		// "formatted" citation
		citation : {
			authors : "L. Alemany-Puig and R. Ferrer-i-Cancho",
			title : "Fast calculation of the variance of edge crossings in random linear arrangements",
			journal : __journal_ARXIV_show_name,
			when : "(2020)",
			arxiv_id : "2003.03258",
			arxiv_url : "http://arxiv.org/abs/2003.03258",
			submitted_to : __journal_JSCS_show_name,
			submitted_on : "February 2020"
		},
		// raw latex citation
		biblatex_citation : "@article{Alemany2020c, \n\tarchivePrefix = {arXiv}, \n\tarxivId = {2003.03258}, \n\tauthor = {Alemany-Puig, Llu{\\'{i}}s and Ferrer-i-Cancho, Ramon}, \n\teprint = {2003.03258}, \n\tjournal = {Arxiv}, \n\ttitle = {{Fast calculation of the variance of edge crossings in random linear arrangements}}, \n\turl = {http://arxiv.org/abs/2003.03258}, \n\tyear = {2020}\n}"
	},
	w03 : {
		// classification of work
		work_type : __wt_preprint,
		journal : __journal_ARXIV_name,
		tags : [__tag_Networks, __tag_RandGraphs, __tag_LinArr],
		year : 2020,
		// "formatted" citation
		citation : {
			authors : "L. Alemany-Puig and Mora, Mercè and R. Ferrer-i-Cancho",
			title : "Reappraising the distribution of the number of edge crossings of graphs on a sphere",
			journal : __journal_ARXIV_show_name,
			when : "(2020)",
			arxiv_id : "2003.03353",
			arxiv_url : "http://arxiv.org/abs/2003.03353",
			submitted_to : __journal_JSTAT_show_name,
			submitted_on : "February 2020"
		},
		// raw latex citation
		biblatex_citation : "@article{Alemany2020b, \n\tarchivePrefix = {arXiv}, \n\tarxivId = {2003.03353}, \n\tauthor = {Alemany-Puig, Llu{\\'{i}}s and Mora, Merc{\\`{e}} and Ferrer-i-Cancho, Ramon}, \n\teprint = {2003.03353}, \n\tjournal = {Arxiv}, \n\ttitle = {{Reappraising the distribution of the number of edge crossings of graphs on a sphere}}, \n\turl = {http://arxiv.org/abs/2003.03353}, \n\tyear = {2020}\n}"
	},
	w02 : {
		// classification of work
		work_type : __wt_JournalPaper,
		journal : __journal_JSTAT_name,
		tags : [__tag_Networks, __tag_RandGraphs, __tag_LinArr],
		year : 2020,
		// "formatted" citation
		citation : {
			authors : "L. Alemany-Puig and R. Ferrer-i-Cancho",
			title : "Edge crossings in random linear arrangements",
			journal : __journal_JSTAT_show_name,
			when : "2020.2 (Feb 2020)",
			doi : "http://doi.org/10.1088/1742-5468/ab6845"
		},
		// raw latex citation
		biblatex_citation : "@article{Alemany2020a, \n\tdoi = {10.1088/1742-5468/ab6845}, \n\turl = {http://dx.doi.org/10.1088/1742-5468/ab6845}, \n\tyear = 2020, \n\tmonth = {feb}, \n\tpublisher = {{IOP} Publishing}, \n\tvolume = {2020}, \n\tnumber = {2}, \n\tpages = {023403}, \n\tauthor = {Llu{\\'{i}}s Alemany-Puig and Ramon Ferrer-i-Cancho}, \n\ttitle = {Edge crossings in random linear arrangements}, \n\tjournal = {Journal of Statistical Mechanics: Theory and Experiment}\n}"
	},
	w01 : {
		// classification of work
		work_type : __wt_MastersThesis,
		journal : __journal_UPC_name,
		tags : [__tag_Networks, __tag_RandGraphs, __tag_LinArr],
		year : 2019,
		// "formatted" citation
		citation : {
			authors : "L. Alemany-Puig",
			title : "Edge crossings in linear arrangements: from theory to algorithms and applications",
			journal : __journal_UPC_show_name,
			when : "July 2019",
			doi : "http://hdl.handle.net/2117/168124"
		},
		// raw latex citation
		biblatex_citation : "@mastersthesis{Alemany2019a, \n\tauthor = {Alemany-Puig, Llu{\\'{i}}s}, \n\tnumber = {July}, \n\tschool = {Universitat Polit{\\`{e}}cnica de Catalunya}, \n\ttitle = {{Edge crossings in linear arrangements: from theory to algorithms and applications}}, \n\ttype = {Master Thesis}, \n\turl = {http://hdl.handle.net/2117/168124}, \n\tyear = {2019}\n}"
	}
};
