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

// ----------
// -- urls --
const __url_cqllab = "https://cqllab.upc.edu";
const __url_lalemany = __url_cqllab + "/people/lalemany";
const __url_publications = __url_lalemany + "/publications";

// --------------
// -- journals --
const __journal_show_all = "All journals/institutions";
const __journal_all = "all_journals_institutions";

const __journal_ARXIV_show_name = "arXiv";
const __journal_JSCS_show_name = "Journal of Statistical Computation and Simulation";
const __journal_JSTAT_show_name = "Journal of Statistical Mechanics: Theory and Experiment";
const __journal_UPC_show_name = "Universitat Politècnica de Catalunya";

const __journal_ARXIV_name = "arXiv";
const __journal_JSCS_name = "JSCS";
const __journal_JSTAT_name = "JSTAT";
const __journal_UPC_name = "UPC";

var __journal_relate = {};
__journal_relate[__journal_show_all] = __journal_all;
__journal_relate[__journal_all] = __journal_show_all;
__journal_relate[__journal_ARXIV_show_name] = __journal_ARXIV_name;
__journal_relate[__journal_ARXIV_name] = __journal_ARXIV_show_name;
__journal_relate[__journal_JSCS_show_name] = __journal_JSCS_name;
__journal_relate[__journal_JSCS_name] = __journal_JSCS_show_name;
__journal_relate[__journal_JSTAT_show_name] = __journal_JSTAT_name;
__journal_relate[__journal_JSTAT_name] = __journal_JSTAT_show_name;
__journal_relate[__journal_UPC_show_name] = __journal_UPC_name;
__journal_relate[__journal_UPC_name] = __journal_UPC_show_name;

// ----------------
// -- tags/fiels --
const __tag_show_all = "All tags";
const __tag_all = "all_tags";

const __tag_show_Networks = "Networks";
const __tag_show_RandGraphs = "Random graphs";
const __tag_show_LinArr = "Linear arrangements";

const __tag_Networks = "networks";
const __tag_RandGraphs = "random_graphs";
const __tag_LinArr = "linear_arrangements";

var __tag_relate = {};
__tag_relate[__tag_show_all] = __tag_all;
__tag_relate[__tag_all] = __tag_show_all;
__tag_relate[__tag_show_Networks] = __tag_Networks;
__tag_relate[__tag_Networks] = __tag_show_Networks;
__tag_relate[__tag_show_RandGraphs] = __tag_RandGraphs;
__tag_relate[__tag_RandGraphs] = __tag_show_RandGraphs;
__tag_relate[__tag_show_LinArr] = __tag_LinArr;
__tag_relate[__tag_LinArr] = __tag_show_LinArr;

// ----------------
// -- work types --
const __wt_show_all = "All work types";
const __wt_all = "all_work_types";

const __wt_show_preprint = "Preprint";
const __wt_show_JournalPaper = "Journal Paper";
const __wt_show_MastersThesis = "Master Thesis";

const __wt_preprint = "preprint";
const __wt_JournalPaper = "journal_paper";
const __wt_MastersThesis = "master_thesis";

var __wt_relate = {};
__wt_relate[__wt_show_all] = __wt_all;
__wt_relate[__wt_all] = __wt_show_all;
__wt_relate[__wt_show_preprint] = __wt_preprint;
__wt_relate[__wt_preprint] = __wt_show_preprint;
__wt_relate[__wt_show_JournalPaper] = __wt_JournalPaper;
__wt_relate[__wt_JournalPaper] = __wt_show_JournalPaper;
__wt_relate[__wt_show_MastersThesis] = __wt_MastersThesis;
__wt_relate[__wt_MastersThesis] = __wt_show_MastersThesis;

// -----------
// -- years --
const __years_show_all = "All years";
const __years_all = "all_years";
const __year_2020 = "2020";
const __year_2019 = "2019";

var __years_relate = {};
__years_relate[__years_show_all] = __years_all;
__years_relate[__years_all] = __years_show_all;
__years_relate[__year_2020] = "2020";
__years_relate[__year_2019] = "2019";

// -------------------------------------
// -- drop down names and papers list --
const __dd_years = "ddYears";
const __dd_tags = "ddClassifTags";
const __dd_journals_insts = "ddJournalsInstitutions";
const __dd_wt = "ddWorkTypes";
const __ul_papers = "papersList";

// -------------------------
// -- names of parameters --
const __param_year = "lapyear";
const __param_tag = "laptag";
const __param_journal = "lapjournal_inst";
const __param_wt = "lapwork_type";
