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

// -----------------
// -- Insitutions --
const __institution_show_all = "All insitutions";
const __institution_all = "all_institutions";

const __institution_show_UPC = "Universitat Politècnica de Catalunya";
const __institution_UPC = "UPC";

var __institution_relate = {};
__institution_relate[__institution_show_all] = __institution_all;
__institution_relate[__institution_all] = __institution_show_all;
__institution_relate[__institution_show_UPC] = __institution_UPC;
__institution_relate[__institution_UPC] = __institution_show_UPC;

// ------------
// -- Cities --
const __city_show_all = "All cities";
const __city_all = "all_cities";

const __city_show_Barcelona = "Barcelona";
const __city_Barcelona = "barcelona";

var __city_relate = {};
__city_relate[__city_show_all] = __city_all;
__city_relate[__city_all] = __city_show_all;
__city_relate[__city_show_Barcelona] = __city_Barcelona;
__city_relate[__city_Barcelona] = __city_show_Barcelona;

// --------------
// -- Journals --
const __journal_show_all = "All journals/institutions";
const __journal_all = "all_journals_institutions";

const __journal_show_ARXIV_name = "arXiv";
const __journal_show_JSCS_name = "Journal of Statistical Computation and Simulation";
const __journal_show_JSTAT_name = "Journal of Statistical Mechanics: Theory and Experiment";
const __journal_show_UPC_name = "Universitat Politècnica de Catalunya";

const __journal_ARXIV_name = "arXiv";
const __journal_JSCS_name = "JSCS";
const __journal_JSTAT_name = "JSTAT";
const __journal_UPC_name = "UPC";

var __journal_relate = {};
__journal_relate[__journal_show_all] = __journal_all;
__journal_relate[__journal_all] = __journal_show_all;
__journal_relate[__journal_show_ARXIV_name] = __journal_ARXIV_name;
__journal_relate[__journal_ARXIV_name] = __journal_show_ARXIV_name;
__journal_relate[__journal_show_JSCS_name] = __journal_JSCS_name;
__journal_relate[__journal_JSCS_name] = __journal_show_JSCS_name;
__journal_relate[__journal_show_JSTAT_name] = __journal_JSTAT_name;
__journal_relate[__journal_JSTAT_name] = __journal_show_JSTAT_name;
__journal_relate[__journal_show_UPC_name] = __journal_UPC_name;
__journal_relate[__journal_UPC_name] = __journal_show_UPC_name;

// ----------
// -- Tags --
const __tag_show_all = "All tags";
const __tag_all = "all_tags";

const __tag_show_Networks = "Networks";
const __tag_show_NetworkScience = "Network Science";
const __tag_show_WordOrder = "Word order";
const __tag_show_RandGraphs = "Random graphs";
const __tag_show_LinArr = "Linear arrangements";

const __tag_Networks = "networks";
const __tag_NetworkScience = "network_science";
const __tag_WordOrder = "word_order";
const __tag_RandGraphs = "random_graphs";
const __tag_LinArr = "linear_arrangements";

var __tag_relate = {};
__tag_relate[__tag_show_all] = __tag_all;
__tag_relate[__tag_all] = __tag_show_all;
__tag_relate[__tag_show_Networks] = __tag_Networks;
__tag_relate[__tag_Networks] = __tag_show_Networks;
__tag_relate[__tag_NetworkScience] = __tag_show_NetworkScience;
__tag_relate[__tag_show_NetworkScience] = __tag_NetworkScience;
__tag_relate[__tag_WordOrder] = __tag_show_WordOrder;
__tag_relate[__tag_show_WordOrder] = __tag_WordOrder;
__tag_relate[__tag_show_RandGraphs] = __tag_RandGraphs;
__tag_relate[__tag_RandGraphs] = __tag_show_RandGraphs;
__tag_relate[__tag_show_LinArr] = __tag_LinArr;
__tag_relate[__tag_LinArr] = __tag_show_LinArr;

// ----------------
// -- Work types --
const __wt_show_all = "All work types";
const __wt_all = "all_work_types";

const __wt_show_preprint = "Preprint";
const __wt_preprint = "preprint";

const __wt_show_JournalPaper = "Journal Paper";
const __wt_JournalPaper = "journal_paper";

const __wt_show_MastersThesis = "Masters Thesis";
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

// ----------------
// -- Talk types --
const __tt_show_all = "All talk types";
const __tt_all = "all_talk_types";

const __tt_show_seminar = "Seminar";
const __tt_seminar = "seminar";

const __tt_show_conference = "Conference";
const __tt_conference = "conference";

var __tt_relate = {};
__tt_relate[__tt_show_all] = __tt_all;
__tt_relate[__tt_all] = __tt_show_all;
__tt_relate[__tt_show_seminar] = __tt_seminar;
__tt_relate[__tt_seminar] = __tt_show_seminar;
__tt_relate[__tt_show_conference] = __tt_conference;
__tt_relate[__tt_conference] = __tt_show_conference;

// ----------------
// -- Talk names --
const __talkname_show_all = "All seminars/conferences";
const __talkname_all = "all_seminars_conferences";

const __talkname_show_LIMDA = "LIMDA";
const __talkname_LIMDA = "limda";

var __talkname_relate = {};
__talkname_relate[__talkname_show_all] = __talkname_all;
__talkname_relate[__talkname_all] = __talkname_show_all;
__talkname_relate[__talkname_show_LIMDA] = __talkname_LIMDA;
__talkname_relate[__talkname_LIMDA] = __talkname_show_LIMDA;

// -----------
// -- Years --
const __year_show_all = "All years";
const __year_all = "all_years";
const __year_2020 = "2020";
const __year_2019 = "2019";

var __year_relate = {};
__year_relate[__year_show_all] = __year_all;
__year_relate[__year_all] = __year_show_all;
__year_relate[__year_2020] = "2020";
__year_relate[__year_2019] = "2019";

// ---------------------------------------
// -- PUBLCATIONS PAGE: drop down names --
const __pubs_dd_years_id = "pubs_ddYears";
const __pubs_dd_tags_id = "pubs_ddClassifTags";
const __pubs_dd_journals_insts_id = "pubs_ddJournalsInstitutions";
const __pubs_dd_wt_id = "pubs_ddWorkTypes";

// ---------------------------------
// -- TALKS PAGE: drop down names --
const __talks_dd_years_id = "talks_ddYears";
const __talks_dd_tags_id = "talks_ddClassifTags";
const __talks_dd_institutions = "talks_ddInstitutions";
const __talks_dd_cities = "talks_ddCities";

// -------------------
// -- html elements --
const __div_publist = "publications_list_div";
const __par_pubs_item_count_id = "pubs_item_count";

const __div_talklist = "talks_list_div";
const __par_talks_item_count_id = "talks_item_count";

// -------------------------
// -- Names of parameters --
const __param_year = "lapyear";
const __param_tag = "laptag";
const __param_journal = "lapjournal_inst";
const __param_wt = "lapwork_type";
const __param_institution = "lapinst";
const __param_city = "lapcity";
