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

/*
// sample of work
// Name of work. Replace 'XX' by a two-digit number
wXX : {
	work_type : // type of work
	journal : // journal
	tags : // tags classifying this work
	year : // year of publication
	
	// "formatted" citation. The information that used to produce the
	// citation with formatted text (italics, bold face, ...)
	citation : {
		authors : // authors
		title : // title
		journal : // journal (show)
		when : // year
		doi : // DOI, if applicable
		arxiv_url : // arxiv url, if applicable
	},
	biblatex_citation : // raw latex citation
},
*/

// -----------------------------------------------------------
// My works (theses, journal articles, papers, preprints, ...)

const works = {
	
	// -----------------------------------------------------------------
	// 2022
	
	w06 : {
		work_type : __wt_JournalPaper,
		journal : __journal_IPL_name,
		tags : [__tag_LinArr, __tag_Minimization, __tag_Algos],
		year : 2022,
		// "formatted" citation
		citation : {
			authors : "L. Alemany-Puig and J. L. Esteban and R. Ferrer-i-Cancho",
			title : "Minimum projective linearization of trees in linear time",
			journal : __journal_show_IPL_name,
			when : "174 (2022)",
			doi : "https://doi.org/10.1016/j.ipl.2021.106204",
			arxiv_url : "http://arxiv.org/abs/2102.03277"
		},
		// raw latex citation
		biblatex_citation : "@article{Alemany2022a,\n\ttitle = {Minimum projective linearizations of trees in linear time},\n\tjournal = {Information Processing Letters},\n\tauthor = {Alemany-Puig, Llu\'is and Esteban, {Juan Luis} and {Ferrer-i-Cancho}, Ramon},\n\teprint = {2102.03277},\n\turl = {http://arxiv.org/abs/2102.03277},\n\tvolume = {174},\n\tpages = {106204},\n\tyear = {2022},\n\tissn = {0020-0190},\n\tdoi = {https://doi.org/10.1016/j.ipl.2021.106204}\n}"
	},
	
	// -----------------------------------------------------------------
	// 2021
	
	w07 : {
		work_type : __wt_preprint,
		journal : __journal_ARXIV_name,
		tags : [__tag_Quantitative_Dependency_Syntax, __tag_LinArr, __tag_Expected_Values, __tag_Algos],
		year : 2021,
		// "formatted" citation
		citation : {
			authors : "L. Alemany-Puig and R. Ferrer-i-Cancho",
			title : "Linear-time calculation of the expected sum of edge lengths in random projective linearizations of trees",
			journal : __journal_show_ARXIV_name,
			when : "(2021)",
			doi : null,
			arxiv_url : "http://arxiv.org/abs/2107.03277"
		},
		// raw latex citation
		biblatex_citation : "@article{Alemany2021b,\n\tarchivePrefix = {arXiv},\n\tarxivId = {2107.03277},\n\tauthor = {{Alemany-Puig}, Llu{\\'{i}}s and {Ferrer-i-Cancho}, Ramon},\n\teprint = {2107.03277},\n\tjournal = {Arxiv},\n\ttitle = {{Linear-time calculation of the expected sum of edge lengths in random projective linearizations of trees}},\n\turl = {http://arxiv.org/abs/2107.03277},\n\tyear = {2021}\n}"
	},
	
	// -----------------------------------------------------------------
	// 2020
	
	w05 : {
		work_type : __wt_preprint,
		journal : __journal_ARXIV_name,
		tags : [__tag_Networks, __tag_NetworkScience, __tag_LinArr, __tag_WordOrder],
		year : 2020,
		// "formatted" citation
		citation : {
			authors : "R. Ferrer-i-Cancho and C. Gómez-Rodríguez and J. L. Esteban and L. Alemany-Puig",
			title : "The optimality of syntactic dependency distances",
			journal : __journal_show_ARXIV_name,
			when : "(2020)",
			doi : null,
			arxiv_url : "http://arxiv.org/abs/2007.15342"
		},
		// raw latex citation
		biblatex_citation : "@article{Ferrer2020a, \n\tarchivePrefix = {arXiv}, \n\tarxivId = {2007.15342}, \n\tauthor = {{Ferrer-i-Cancho}, Ramon and G{\\'{o}}mez-Rodr{\\'{i}}guez, Carlos and Esteban, {Juan Luis} and {Alemany-Puig}, Llu{\\'{i}}s}, \n\teprint = {2007.15342}, \n\tjournal = {Arxiv}, \n\ttitle = {{The optimality of syntactic dependency distances}}, \n\turl = {http://arxiv.org/abs/2007.15342}, \n\tyear = {2020}\n}"
	},
	w04 : {
		work_type : __wt_preprint,
		journal : __journal_ARXIV_name,
		tags : [__tag_Networks, __tag_NetworkScience, __tag_RandGraphs],
		year : 2020,
		// "formatted" citation
		citation : {
			authors : "L. Alemany-Puig and R. Ferrer-i-Cancho",
			title : "Fast calculation of the variance of edge crossings in random arrangements",
			journal : __journal_show_ARXIV_name,
			when : "(2020)",
			doi : null,
			arxiv_url : "http://arxiv.org/abs/2003.03258"
		},
		// raw latex citation
		biblatex_citation : "@article{Alemany2020c, \n\tarchivePrefix = {arXiv}, \n\tarxivId = {2003.03258}, \n\tauthor = {{Alemany-Puig}, Llu{\\'{i}}s and {Ferrer-i-Cancho}, Ramon}, \n\teprint = {2003.03258}, \n\tjournal = {Arxiv}, \n\ttitle = {{Fast calculation of the variance of edge crossings in random arrangements}}, \n\turl = {http://arxiv.org/abs/2003.03258}, \n\tyear = {2020}\n}"
	},
	w03 : {
		// classification of work
		work_type : __wt_JournalPaper,
		journal : __journal_JSTAT_name,
		tags : [__tag_Networks, __tag_RandGraphs, __tag_LinArr],
		year : 2020,
		// "formatted" citation
		citation : {
			authors : "L. Alemany-Puig and M. Mora and R. Ferrer-i-Cancho",
			title : "Reappraising the distribution of the number of edge crossings of graphs on a sphere",
			journal : __journal_show_JSTAT_name,
			when : "2020.8 (Aug 2020)",
			doi : "http://doi.org/10.1088/1742-5468/aba0ab",
			arxiv_url : "http://arxiv.org/abs/2003.03353"
		},
		// raw latex citation
		biblatex_citation : "@article{Alemany2020b, \n\tdoi = {10.1088/1742-5468/aba0ab}, \n\turl = {http://dx.doi.org/10.1088/1742-5468/aba0ab}, \n\tyear = 2020, \n\tmonth = {aug}, \n\tpublisher = {{IOP} Publishing}, \n\tvolume = {2020}, \n\tnumber = {8}, \n\tpages = {083401}, \n\tauthor = {Llu{\\'{i}}s Alemany-Puig and Merc{\\`{e}} Mora and Ramon Ferrer-i-Cancho}, \n\ttitle = {Reappraising the distribution of the number of edge crossings of graphs on a sphere}, \n\tjournal = {Journal of Statistical Mechanics: Theory and Experiment}\n}"
	},
	w02 : {
		// classification of work
		work_type : __wt_JournalPaper,
		journal : __journal_JSTAT_name,
		tags : [__tag_Networks, __tag_NetworkScience, __tag_RandGraphs, __tag_LinArr],
		year : 2020,
		// "formatted" citation
		citation : {
			authors : "L. Alemany-Puig and R. Ferrer-i-Cancho",
			title : "Edge crossings in random linear arrangements",
			journal : __journal_show_JSTAT_name,
			when : "2020.2 (Feb 2020)",
			doi : "http://doi.org/10.1088/1742-5468/ab6845",
			arxiv_url : "https://arxiv.org/abs/1910.03926"
		},
		// raw latex citation
		biblatex_citation : "@article{Alemany2020a, \n\tdoi = {10.1088/1742-5468/ab6845}, \n\turl = {http://dx.doi.org/10.1088/1742-5468/ab6845}, \n\tyear = 2020, \n\tmonth = {feb}, \n\tpublisher = {{IOP} Publishing}, \n\tvolume = {2020}, \n\tnumber = {2}, \n\tpages = {023403}, \n\tauthor = {Llu{\\'{i}}s Alemany-Puig and Ramon Ferrer-i-Cancho}, \n\ttitle = {Edge crossings in random linear arrangements}, \n\tjournal = {Journal of Statistical Mechanics: Theory and Experiment}\n}"
	},
	
	// -----------------------------------------------------------------
	// 20219
	
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
			journal : __journal_show_UPC_name,
			when : "July 2019",
			doi : "http://hdl.handle.net/2117/168124",
			arxiv_id : null,
			arxiv_url : null
		},
		// raw latex citation
		biblatex_citation : "@mastersthesis{Alemany2019a, \n\tauthor = {{Alemany-Puig}, Llu{\\'{i}}s}, \n\tnumber = {July}, \n\tschool = {Universitat Polit{\\`{e}}cnica de Catalunya}, \n\ttitle = {{Edge crossings in linear arrangements: from theory to algorithms and applications}}, \n\ttype = {Master Thesis}, \n\turl = {http://hdl.handle.net/2117/168124}, \n\tyear = {2019}\n}"
	}
};
