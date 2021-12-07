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
// -- Institutions --
const __institution_show_all = "All institutions";
const __institution_all = "all_institutions";

const __institution_show_UPC = "Universitat Politècnica de Catalunya";
const __institution_UPC = "UPC";

const __institution_show_Zheihang_University = "Zeijhang University";
const __institution_Zheihang_University = "zheijang_university";

const __institution_show_IQLA_GIAT_Summer_School = "IQLA-GIAT";
const __institution_IQLA_GIAT_Summer_School = "iqla_giat";

var __institution_relate = {};
__institution_relate[__institution_show_all] = __institution_all;
__institution_relate[__institution_all] = __institution_show_all;

__institution_relate[__institution_show_UPC] = __institution_UPC;
__institution_relate[__institution_UPC] = __institution_show_UPC;

__institution_relate[__institution_show_Zheihang_University] = __institution_Zheihang_University;
__institution_relate[__institution_Zheihang_University] = __institution_show_Zheihang_University;

__institution_relate[__institution_show_IQLA_GIAT_Summer_School] = __institution_IQLA_GIAT_Summer_School;
__institution_relate[__institution_IQLA_GIAT_Summer_School] = __institution_show_IQLA_GIAT_Summer_School;

// ----------------------
// -- Locations --
const __location_show_all = "All cities/countries";
const __location_all = "all_cities_countries";

const __location_show_Barcelona = "Barcelona";
const __location_Barcelona = "barcelona";

const __location_show_Hangzhou = "Hangzhou";
const __location_Hangzhou = "hangzhou";

const __location_show_China = "China";
const __location_China = "china";

const __location_show_Italy = "Italy";
const __location_Italy = "italy";

var __location_relate = {};
__location_relate[__location_show_all] = __location_all;
__location_relate[__location_all] = __location_show_all;
__location_relate[__location_show_Barcelona] = __location_Barcelona;
__location_relate[__location_Barcelona] = __location_show_Barcelona;
__location_relate[__location_show_Hangzhou] = __location_Hangzhou;
__location_relate[__location_Hangzhou] = __location_show_Hangzhou;
__location_relate[__location_show_China] = __location_China;
__location_relate[__location_China] = __location_show_China;
__location_relate[__location_show_Italy] = __location_Italy;
__location_relate[__location_Italy] = __location_show_Italy;

// --------------
// -- Journals --
const __journal_show_all = "All journals/institutions";
const __journal_all = "all_journals_institutions";

const __journal_show_ARXIV_name = "arXiv";
const __journal_show_JSCS_name = "Journal of Statistical Computation and Simulation";
const __journal_show_JSTAT_name = "Journal of Statistical Mechanics: Theory and Experiment";
const __journal_show_UPC_name = "Universitat Politècnica de Catalunya";
const __journal_show_IPL_name = "Information Processing Letters";
const __journal_show_PRE_name = "Physical Review E";

const __journal_ARXIV_name = "arXiv";
const __journal_JSCS_name = "JSCS";
const __journal_JSTAT_name = "JSTAT";
const __journal_UPC_name = "UPC";
const __journal_IPL_name = "IPL";
const __journal_PRE_name = "PRE";

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
__journal_relate[__journal_show_IPL_name] = __journal_IPL_name;
__journal_relate[__journal_IPL_name] = __journal_show_IPL_name;
__journal_relate[__journal_show_PRE_name] = __journal_PRE_name;
__journal_relate[__journal_PRE_name] = __journal_show_PRE_name;

// ----------
// -- Tags --
const __tag_show_all = "All tags";
const __tag_all = "all_tags";

const __tag_show_Networks = "Networks";
const __tag_show_NetworkScience = "Network Science";
const __tag_show_WordOrder = "Word order";
const __tag_show_RandGraphs = "Random graphs";
const __tag_show_LinArr = "Linear arrangements";
const __tag_show_Algos = "Algorithms";
const __tag_show_Minimizaion = "Minimization";
const __tag_show_Linear_Arrangement_Library = "Linear Arrangement Library (LAL)";
const __tag_show_Expected_Values = "Expected Values";
const __tag_show_Quantitative_Dependency_Syntax = "Quantitative Dependency Syntax";

const __tag_Networks = "networks";
const __tag_NetworkScience = "network_science";
const __tag_WordOrder = "word_order";
const __tag_RandGraphs = "random_graphs";
const __tag_LinArr = "linear_arrangements";
const __tag_Algos = "algorithms";
const __tag_Minimization = "minimization";
const __tag_Linear_Arrangement_Library = "LAL";
const __tag_Expected_Values = "exp_values";
const __tag_Quantitative_Dependency_Syntax = "quant_dep_syntax";

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

__tag_relate[__tag_show_Algos] = __tag_Algos;
__tag_relate[__tag_Algos] = __tag_show_Algos;

__tag_relate[__tag_show_Minimizaion] = __tag_Minimization;
__tag_relate[__tag_Minimization] = __tag_show_Minimizaion;

__tag_relate[__tag_show_Linear_Arrangement_Library] = __tag_Linear_Arrangement_Library;
__tag_relate[__tag_Linear_Arrangement_Library] = __tag_show_Linear_Arrangement_Library;

__tag_relate[__tag_show_Expected_Values] = __tag_Expected_Values;
__tag_relate[__tag_Expected_Values] = __tag_show_Expected_Values;

__tag_relate[__tag_show_Quantitative_Dependency_Syntax] = __tag_Quantitative_Dependency_Syntax;
__tag_relate[__tag_Quantitative_Dependency_Syntax] = __tag_show_Quantitative_Dependency_Syntax;

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

const __tt_show_workshop = "Workshop";
const __tt_workshop = "workshop";

var __tt_relate = {};
__tt_relate[__tt_show_all] = __tt_all;
__tt_relate[__tt_all] = __tt_show_all;
__tt_relate[__tt_show_seminar] = __tt_seminar;
__tt_relate[__tt_seminar] = __tt_show_seminar;
__tt_relate[__tt_show_conference] = __tt_conference;
__tt_relate[__tt_conference] = __tt_show_conference;
__tt_relate[__tt_show_workshop] = __tt_workshop;
__tt_relate[__tt_workshop] = __tt_show_workshop;

// ----------------
// -- Talk names --
const __talkname_show_all = "All seminars/conferences";
const __talkname_all = "all_seminars_conferences";

const __talkname_show_LIMDA = "LIMDA";
const __talkname_LIMDA = "limda";

const __talkname_show_Zheijang_University_Python_06_2021 = "Zheijang University Python - June 2021";
const __talkname_Zheijang_University_Python_06_2021 = "zheijang_university_python_june_2021";

const __talkname_show_IQLA_GIAT_2021_07 = "IQLA-GIAT Summer School - July 2021";
const __talkname_IQLA_GIAT_2021_07 = "iqla_giat_summer_school_2021_07";

var __talkname_relate = {};
__talkname_relate[__talkname_show_all] = __talkname_all;
__talkname_relate[__talkname_all] = __talkname_show_all;

__talkname_relate[__talkname_show_LIMDA] = __talkname_LIMDA;
__talkname_relate[__talkname_LIMDA] = __talkname_show_LIMDA;

__talkname_relate[__talkname_show_Zheijang_University_Python_06_2021] = __talkname_Zheijang_University_Python_06_2021;
__talkname_relate[__talkname_Zheijang_University_Python_06_2021] = __talkname_show_Zheijang_University_Python_06_2021;

__talkname_relate[__talkname_show_IQLA_GIAT_2021_07] = __talkname_IQLA_GIAT_2021_07;
__talkname_relate[__talkname_IQLA_GIAT_2021_07] = __talkname_show_IQLA_GIAT_2021_07;

// -----------
// -- Years --
const __year_show_all = "All years";
const __year_all = "all_years";
const __year_2019 = "2019";
const __year_2020 = "2020";
const __year_2021 = "2021";

var __year_relate = {};
__year_relate[__year_show_all] = __year_all;
__year_relate[__year_all] = __year_show_all;
__year_relate[__year_2019] = "2019";
__year_relate[__year_2020] = "2020";
__year_relate[__year_2021] = "2021";

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
const __talks_dd_seminar_conference = "talks_ddSeminarConference";

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
const __param_seminar_conf = "lapsemconf";
