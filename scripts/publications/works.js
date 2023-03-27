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
	tags : // tags classifying this work
	year : // year of publication
	
	// "formatted" citation for journal articles. The information that used to
	// produce the citation with formatted text (italics, bold face, ...)
	citation : {
		authors : // authors
		title : // title
		journal : // journal (show)
		when : // year
		doi : // DOI, if applicable
		arxiv_url : // arxiv url, if applicable
		url : null // in case DOI is null, provide a url if applicable.
	},
	
	// "formatted" citation for theses. The information that used to
	// produce the citation with formatted text (italics, bold face, ...)
	citation : {
		authors : // authors
		title : // title
		school : // University/School
		school_url : // A url to the school
		doi : // DOI, if applicable
		arxiv_url : // arxiv url, if applicable
		url : null // other urls (typically handles), if applicable
	},
	
	biblatex_citation : // raw latex citation
},
*/

// -----------------------------------------------------------
// My works (theses, journal articles, papers, preprints, ...)

const works = {
	
	// -----------------------------------------------------------------
	// 2022
	
	w10 : {
		work_type : __worktype_preprint,
		tags : [__tag_Quantitative_Dependency_Syntax, __tag_LinArr, __tag_Expected_Values, __tag_Algos],
		year : 2022,
		citation : {
			authors : [__author_me, __author_RFerreriCancho],
			title : "Linear-time calculation of the expected sum of edge lengths in random planar linearizations of trees",
			repository : __rejoinproc_ARXIV_name,
			when : "2022",
			doi : null,
			arxiv_url : "https://arxiv.org/abs/2207.05564"
		},
		biblatex_citation : "@article{Alemany2022d, \n\tarxivId = {2003.03258}, \n\tauthor = {{Alemany-Puig}, {Llu{\\'{i}}s} and {Ferrer-i-Cancho}, {Ramon}},\n\tjournal = {arXiv},\n\ttitle = {{Linear-time calculation of the expected sum of edge lengths in random planar linearizations of trees}},\n\turl = {https://arxiv.org/abs/2207.05564}, \n\tyear = {2022}\n}"
	},
	
	w09 : {
		work_type : __worktype_preprint,
		tags : [__tag_LinArr, __tag_Maximization, __tag_Algos],
		year : 2022,
		citation : {
			authors : [__author_me, __author_JLEsteban, __author_RFerreriCancho],
			title : "The Maximum Linear Arrangement for trees under projectivity and planarity",
			repository : __rejoinproc_ARXIV_name,
			when : "2022",
			doi : null,
			arxiv_url : "https://arxiv.org/abs/2206.06924"
		},
		biblatex_citation : "@article{Alemany2022c, \n\tarxivId = {2003.03258}, \n\tauthor = {{Alemany-Puig}, {Llu{\\'{i}}s} and {Esteban}, {Juan Luis} and {Ferrer-i-Cancho}, {Ramon}},\n\tjournal = {arXiv},\n\ttitle = {{The Maximum Linear Arrangement for trees under projectivity and planarity}},\n\turl = {https://arxiv.org/abs/2206.06924}, \n\tyear = {2022}\n}"
	},
	
	w05 : {
		work_type : __worktype_JournalPaper,
		tags : [__tag_Quantitative_Dependency_Syntax, __tag_LinArr, __tag_Expected_Values, __tag_Algos],
		year : 2022,
		citation : {
			authors : [__author_me, __author_RFerreriCancho],
			title : "Linear-time calculation of the expected sum of edge lengths in random projective linearizations of trees",
			journal : __rejoinproc_CL_name,
			when : "September 2022",
			doi : "10.1162/coli_a_00442",
			arxiv_url : "https://arxiv.org/abs/2107.03277"
		},
		biblatex_citation : "@article{Alemany2022b,\n\ttitle = {{Linear-time calculation of the expected sum of edge lengths in random projective linearizations of trees}},\n\tauthor = {{Alemany-Puig}, {Llu\\'{i}s} and {Ferrer-i-Cancho}, {Ramon}},\n\tjournal = {Computational Linguistics},\n\tmonth = {09},\n\tyear = {2022},\n\tpages = {1-25},\n\tissn = {0891-2017},\n\tdoi = {10.1162/coli_a_00442},\n\turl = {https://arxiv.org/abs/2107.03277}\n}"
	},
	
	w04 : {
		work_type : __worktype_JournalPaper,
		tags : [__tag_Networks, __tag_NetworkScience, __tag_LinArr, __tag_WordOrder, __tag_Optimality],
		year : 2022,
		citation : {
			authors : [__author_RFerreriCancho, __author_CGomezRodriguez, __author_JLEsteban, __author_me],
			title : "The optimality of syntactic dependency distances",
			journal : __rejoinproc_PRE_name,
			when : "Volume 105 (1) -- 18 January",
			doi : "10.1088/1742-5468/aba0ab",
			arxiv_url : "https://arxiv.org/abs/2007.15342"
		},
		biblatex_citation : "@article{Ferrer2022a,\n\ttitle = {{Optimality of syntactic dependency distances}},\n\tauthor = {{Ferrer-i-Cancho}, {Ramon} and {G\\'{o}mez-Rodr\\'{i}guez}, {Carlos} and {Esteban}, {Juan Luis} and {Alemany-Puig}, {Llu\\'{i}s}},\n\tjournal = {Physical Review E},\n\tvolume = {105},\n\tissue = {1},\n\tpages = {014308},\n\tnumpages = {34},\n\tyear = {2022},\n\tmonth = {Jan},\n\tpublisher = {American Physical Society},\n\tdoi = {10.1088/1742-5468/aba0ab},\n\turl = {https://arxiv.org/abs/2007.15342}\n}"
	},
	
	w08 : {
		work_type : __worktype_JournalPaper,
		tags : [__tag_LinArr, __tag_Minimization, __tag_Algos],
		year : 2022,
		citation : {
			authors : [__author_me, __author_JLEsteban, __author_RFerreriCancho],
			title : "Minimum projective linearization of trees in linear time",
			journal : __rejoinproc_IPL_name,
			when : "Volume 174 (2022)",
			doi : "10.1016/j.ipl.2021.106204",
			arxiv_url : "https://arxiv.org/abs/2102.03277"
		},
		biblatex_citation : "@article{Alemany2022a,\n\ttitle = {{Minimum projective linearizations of trees in linear time}},\n\tjournal = {Information Processing Letters},\n\tauthor = {{Alemany-Puig}, {Llu\\'{i}s} and {Esteban}, {Juan Luis} and {Ferrer-i-Cancho}, {Ramon}},\n\turl = {https://arxiv.org/abs/2102.03277},\n\tvolume = {174},\n\tpages = {106204},\n\tyear = {2022},\n\tissn = {0020-0190},\n\tdoi = {10.1016/j.ipl.2021.106204}\n}"
	},
	
	// -----------------------------------------------------------------
	// 2021
	
	w07 : {
		work_type : __worktype_ConferenceProceedings,
		tags : [__tag_Linear_Arrangement_Library, __tag_Quantitative_Dependency_Syntax, __tag_LinArr, __tag_Algos],
		year : 2021,
		citation : {
			authors : [__author_me, __author_JLEsteban, __author_RFerreriCancho],
			title : "The Linear Arrangement Library. A new tool for research on syntactic dependency structures",
			proceedings : __rejoinproc_SyntaxFestQuasy2021_name,
			when : "2021",
			doi : null,
			arxiv_url : "https://arxiv.org/abs/2112.02512",
			proceedings_url : "https://aclanthology.org/volumes/2021.quasy-1/",
			poster_url : "https://github.com/lluisalemanypuig/lluisalemanypuig.github.io/blob/master/talks_files/SyntaxFest2021_LAL_poster.pdf"
		},
		biblatex_citation : "@inproceedings{Alemany2021a,\n\tauthor = {{Alemany-Puig}, Llu{\\'{i}}s and {Esteban}, {Juan Luis} and {Ferrer-i-Cancho}, {Ramon}},\n\tarxivId = {2112.02512},\n\ttitle = {{The Linear Arrangement Library. A new tool for research on syntactic dependency structures}},\n\tbooktitle = {{P}roceedings of the {S}econd {W}orkshop on {Q}uantitative {S}yntax ({Q}uasy, {S}yntaxFest 2021)},\n\turl = {https://aclanthology.org/2021.quasy-1.1},\n\tmonth = {dec},\n\tyear = {2021},\n\taddress = {Sofia, Bulgaria},\n\tpublisher = {Association for Computational Linguistics},\n\tpages = {1--16}\n}"
	},
	
	// -----------------------------------------------------------------
	// 2020
	
	w06 : {
		work_type : __worktype_preprint,
		tags : [__tag_Networks, __tag_NetworkScience, __tag_RandGraphs, __tag_Algos],
		year : 2020,
		citation : {
			authors : [__author_me, __author_RFerreriCancho],
			title : "Fast calculation of the variance of edge crossings in random arrangements",
			repository : __rejoinproc_ARXIV_name,
			when : "2020",
			doi : null,
			arxiv_url : "https://arxiv.org/abs/2003.03258"
		},
		biblatex_citation : "@article{Alemany2020c, \n\tarxivId = {2003.03258}, \n\tauthor = {{Alemany-Puig}, {Llu{\\'{i}}s} and {Ferrer-i-Cancho}, {Ramon}},\n\tjournal = {arXiv},\n\ttitle = {{Fast calculation of the variance of edge crossings in random arrangements}},\n\turl = {https://arxiv.org/abs/2003.03258}, \n\tyear = {2020}\n}"
	},
	
	w03 : {
		work_type : __worktype_JournalPaper,
		tags : [__tag_Networks, __tag_RandGraphs],
		year : 2020,
		citation : {
			authors : [__author_me, __author_MMora, __author_RFerreriCancho],
			title : "Reappraising the distribution of the number of edge crossings of graphs on a sphere",
			journal : __rejoinproc_JSTAT_name,
			when : "2020.8 (Aug 2020)",
			doi : "10.1088/1742-5468/aba0ab",
			arxiv_url : "https://arxiv.org/abs/2003.03353"
		},
		biblatex_citation : "@article{Alemany2020b, \n\tdoi = {10.1088/1742-5468/aba0ab}, \n\turl = {https://arxiv.org/abs/2003.03353}, \n\tyear = 2020, \n\tmonth = {aug}, \n\tpublisher = {{IOP} {P}ublishing}, \n\tvolume = {2020}, \n\tnumber = {8}, \n\tpages = {083401}, \n\tauthor = {{Alemany-Puig}, {Llu{\\'{i}}s} and {Mora}, {Merc{\\`{e}}} and {Ferrer-i-Cancho}, {Ramon}}, \n\ttitle = {{Reappraising the distribution of the number of edge crossings of graphs on a sphere}}, \n\tjournal = {Journal of Statistical Mechanics: Theory and Experiment}\n}"
	},
	
	w02 : {
		work_type : __worktype_JournalPaper,
		tags : [__tag_Networks, __tag_NetworkScience, __tag_RandGraphs, __tag_LinArr],
		year : 2020,
		citation : {
			authors : [__author_me, __author_RFerreriCancho],
			title : "Edge crossings in random linear arrangements",
			journal : __rejoinproc_JSTAT_name,
			when : "2020.2 (Feb 2020)",
			doi : "10.1088/1742-5468/ab6845",
			arxiv_url : "https://arxiv.org/abs/1910.03926"
		},
		biblatex_citation : "@article{Alemany2020a, \n\tdoi = {10.1088/1742-5468/ab6845}, \n\turl = {https://arxiv.org/abs/1910.03926}, \n\tyear = 2020, \n\tmonth = {feb}, \n\tpublisher = {{IOP} {P}ublishing}, \n\tvolume = {2020}, \n\tnumber = {2}, \n\tpages = {023403}, \n\tauthor = {{Alemany-Puig}, {Llu{\\'{i}}s} and {Ferrer-i-Cancho}, {Ramon}}, \n\ttitle = {{Edge crossings in random linear arrangements}}, \n\tjournal = {Journal of Statistical Mechanics: Theory and Experiment}\n}"
	},
	
	// -----------------------------------------------------------------
	// 2019
	
	w01 : {
		work_type : __worktype_MastersThesis,
		tags : [__tag_Networks, __tag_RandGraphs, __tag_LinArr],
		year : 2019,
		citation : {
			authors : [__author_me],
			title : "Edge crossings in linear arrangements: from theory to algorithms and applications",
			school : __rejoinproc_UPC_name,
			school_url : "https://www.upc.edu/en",
			when : "July 2019",
			doi : null,
			arxiv_url : null,
			url : "https://hdl.handle.net/2117/168124"
		},
		biblatex_citation : "@mastersthesis{Alemany2019a, \n\tauthor = {{Alemany-Puig}, {Llu{\\'{i}}s}}, \n\tnumber = {July}, \n\tschool = {Universitat Polit{\\`{e}}cnica de Catalunya}, \n\ttitle = {{Edge crossings in linear arrangements: from theory to algorithms and applications}}, \n\ttype = {Master Thesis}, \n\turl = {https://hdl.handle.net/2117/168124}, \n\tyear = {2019}\n}"
	}
};
