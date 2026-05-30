/*
 * Personal webpage's scripts
 * Copyright (C) 2020 - 2026  Lluís Alemany Puig
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

    // 2024
    w4: {
		work_type: __worktype_preprint,
		tags: [
			__tag_WordOrder,
			__tag_Formal_constraints,
		],
		year: 2024,
		citation: {
			authors: [__author_RFerreriCancho],
			title: "Predictability maximization and the origins of word order harmony",
			repository: __publishedin_ARXIV_name,
			when: "October 2024",
            doi: null,
			arxiv_id: "2408.16570",
		},
		biblatex_citation:
			"@article{Ferrer2024b,\n\ttitle = {{Predictability maximization and the origins of word order harmony}},\n\tauthor = {{Ferrer-i-Cancho}, Ramon},\n\tarxivId = {2408.16570},\n\tjournal = {arXiv},\n\turl = {https://arxiv.org/abs/2408.16570},\n\tyear = {2024}\n}",
	},

	w3: {
		work_type: __worktype_JournalPaper,
		tags: [
			__tag_WordOrder,
			__tag_Formal_constraints,
		],
		year: 2024,
		citation: {
			authors: [__author_RFerreriCancho],
			title: "The Optimal Placement of the Head in the Noun Phrase. The Case of Demonstrative, Numeral, Adjective and Noun",
			journal: __publishedin_JQL_name,
			when: "October 2024",
            pages: "26--53",
			doi: "10.1080/09296174.2024.2400847",
			arxiv_id: "2402.10311",
		},
		biblatex_citation:
			"@article{Ferrer2024a,\n\ttitle = {{The Optimal Placement of the Head in the Noun Phrase. The Case of Demonstrative, Numeral, Adjective and Noun}},\n\tvolume = {32},\n\tISSN = {1744-5035},\n\turl = {http://dx.doi.org/10.1080/09296174.2024.2400847},\n\tdoi = {10.1080/09296174.2024.2400847},\n\tnumber = {1},\n\tjournal = {Journal of Quantitative Linguistics},\n\tpublisher = {Informa UK Limited},\n\tauthor = {{Ferrer-i-Cancho}, Ramon},\n\tyear = {2024},\n\tmonth = Oct,\n\tpages = {26--53}\n}",
	},

    // 2023
	w2: {
		work_type: __worktype_JournalPaper,
		tags: [
			__tag_WordOrder,
			__tag_Formal_constraints,
		],
		year: 2022,
		citation: {
			authors: [__author_RFerreriCancho, __author_SNamboodiripad],
			title: "Swap distance minimization in SOV languages. Cognitive and mathematical foundations",
			journal: __publishedin_Glottometrics_name,
            volume: 55,
			when: "April 2023",
            pages: "59--88",
			doi: "10.53482/2023_55_412",
			arxiv_id: "2312.04219",
		},
		biblatex_citation:
			"@article{Ferrer2023a,\n\ttitle = {{Swap distance minimization in SOV languages. Cognitive and mathematical foundations}},\n\tauthor = {{{Ferrer-i-Cancho}, Ramon and Namboodiripad, Savithry},\n\tvolume = {55},\n\turl = {https://doi.org/10.53482/2023_55_412},\n\tdoi = {10.53482/2023_55_412},\n\tjournal = {Glottometrics},\n\tpublisher = {International Quantitative Linguistics Association},\n\tyear = {2023},\n\tpages = {59--88},\n\tISSN = {2625-8226}\n}",
	},

    // 2022
	w1: {
		work_type: __worktype_JournalPaper,
		tags: [
			__tag_WordOrder,
			__tag_Formal_constraints,
		],
		year: 2022,
		citation: {
			authors: [__author_CGomezRodriguez, __author_MHChristiansen, __author_RFerreriCancho],
			title: "Memory limitations are hidden in grammar",
			journal: __publishedin_Glottometrics_name,
            volume: 52,
			when: "April 2022",
            pages: "39--64",
			doi: "10.53482/2022_52_397",
			arxiv_id: "1908.06629",
		},
		biblatex_citation:
			"@article{Gomez2022a,\n\ttitle = {{Memory limitations are hidden in grammar}},\n\tauthor = {{G\\'{o}mez-Rodr\\'{i}guez}, Carlos and Christiansen, {Morten H.} and {Ferrer-i-Cancho}, Ramon},\n\tvolume = {52},\n\turl = {http://dx.doi.org/10.53482/2022_52_397},\n\tdoi = {10.53482/2022_52_397},\n\tjournal = {Glottometrics},\n\tpublisher = {International Quantitative Linguistics Association},\n\tyear = {2022},\n\tpages = {39--64},\n\tISSN = {2625-8226}\n}",
	},

    // 2021
	w0: {
		work_type: __worktype_JournalPaper,
		tags: [
			__tag_LinArr,
            __tag_Maximization,
            __tag_Minimization
		],
		year: 2021,
		citation: {
			authors: [__author_RFerreriCancho, __author_CGomezRodriguez, __author_JLEsteban],
			title: "Bounds of the sum of edge lengths in linear arrangements of trees",
			journal: __publishedin_JSTAT_name,
            volume: 2021,
			when: "February 2021",
            pages: "023403",
			doi: "10.1088/1742-5468/abd4d7",
			arxiv_id: "2006.14069",
		},
		biblatex_citation:
			"@article{FerreriCancho2021,\n\ttitle = {{Bounds of the sum of edge lengths in linear arrangements of trees}},\n\tauthor = {Ferrer-i-Cancho, Ramon and G\'{o}mez-Rodr\'{i}guez, Carlos and Esteban, {Juan Luis}},\n\tjournal = {Journal of Statistical Mechanics: Theory and Experiment},\n\tvolume = {2021},\n\tISSN = {1742-5468},\n\turl = {http://dx.doi.org/10.1088/1742-5468/abd4d7},\n\tdoi = {10.1088/1742-5468/abd4d7},\n\tnumber = {2},\n\tpublisher = {IOP Publishing},\n\tyear = {2021},\n\tmonth = Feb,\n\tpages = {023403}\n}",
	},
};
