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
const __institution_all = "All institutions";
const __institution_UPC = "Universitat Politècnica de Catalunya - BarcelonaTech (UPC)";
const __institution_Zheihang_University = "Zeijhang University";
const __institution_IQLA_GIAT_Summer_School = "IQLA-GIAT Summer school";

// ----------------------
// -- Locations --
const __location_all = "All cities/countries";
const __location_Barcelona = "Barcelona";
const __location_Hangzhou = "Hangzhou";
const __location_China = "China";
const __location_Italy = "Italy";

// --------------
// -- Journals --
const __rejoinproc_all = "All repositories/journals/institutions/proceedings";
const __rejoinproc_short_all = __rejoinproc_all;

const __rejoinproc_ARXIV_name = "arXiv";
const __rejoinproc_short_ARXIV_name = "arXiv";

const __rejoinproc_JSCS_name = "Journal of Statistical Computation and Simulation";
const __rejoinproc_short_JSCS_name = "JSCS";

const __rejoinproc_JSTAT_name = "Journal of Statistical Mechanics: Theory and Experiment";
const __rejoinproc_short_JSTAT_name = "JSTAT";

const __rejoinproc_UPC_name = "Universitat Politècnica de Catalunya";
const __rejoinproc_short_UPC_name = "UPC";

const __rejoinproc_IPL_name = "Information Processing Letters";
const __rejoinproc_short_IPL_name = "IPL";

const __rejoinproc_PRE_name = "Physical Review E";
const __rejoinproc_short_PRE_name = "PRE";

const __rejoinproc_CL_name = "Computational Linguistics";
const __rejoinproc_short_CL_name = "CL";

const __rejoinproc_SyntaxFestQuasy2021_name = "Proceedings of the Second Workshop on Quantitative Syntax (Quasy, SyntaxFest 2021)";
const __rejoinproc_short_SyntaxFestQuasy2021_name = "Quasy, SyntaxFest 2021";

var __rejoinproc_relate = {};
__rejoinproc_relate[__rejoinproc_all] = __rejoinproc_short_all;
__rejoinproc_relate[__rejoinproc_short_all] = __rejoinproc_all;

__rejoinproc_relate[__rejoinproc_ARXIV_name] = __rejoinproc_short_ARXIV_name;
__rejoinproc_relate[__rejoinproc_short_ARXIV_name] = __rejoinproc_ARXIV_name;

__rejoinproc_relate[__rejoinproc_JSCS_name] = __rejoinproc_short_JSCS_name;
__rejoinproc_relate[__rejoinproc_short_JSCS_name] = __rejoinproc_JSCS_name;

__rejoinproc_relate[__rejoinproc_JSTAT_name] = __rejoinproc_short_JSTAT_name;
__rejoinproc_relate[__rejoinproc_short_JSTAT_name] = __rejoinproc_JSTAT_name;

__rejoinproc_relate[__rejoinproc_UPC_name] = __rejoinproc_short_UPC_name;
__rejoinproc_relate[__rejoinproc_short_UPC_name] = __rejoinproc_UPC_name;

__rejoinproc_relate[__rejoinproc_IPL_name] = __rejoinproc_short_IPL_name;
__rejoinproc_relate[__rejoinproc_short_IPL_name] = __rejoinproc_IPL_name;

__rejoinproc_relate[__rejoinproc_PRE_name] = __rejoinproc_short_PRE_name;
__rejoinproc_relate[__rejoinproc_short_PRE_name] = __rejoinproc_PRE_name;

__rejoinproc_relate[__rejoinproc_CL_name] = __rejoinproc_short_CL_name;
__rejoinproc_relate[__rejoinproc_short_CL_name] = __rejoinproc_CL_name;

__rejoinproc_relate[__rejoinproc_SyntaxFestQuasy2021_name] = __rejoinproc_short_SyntaxFestQuasy2021_name;
__rejoinproc_relate[__rejoinproc_short_SyntaxFestQuasy2021_name] = __rejoinproc_SyntaxFestQuasy2021_name;

// ----------
// -- Tags --
const __tag_all = "All tags";
const __tag_Networks = "Networks";
const __tag_NetworkScience = "Network Science";
const __tag_WordOrder = "Word order";
const __tag_RandGraphs = "Random graphs";
const __tag_LinArr = "Linear arrangements";
const __tag_Algos = "Algorithms";
const __tag_Minimization = "Minimization";
const __tag_Linear_Arrangement_Library = "Linear Arrangement Library (LAL)";
const __tag_Expected_Values = "Expected Values";
const __tag_Quantitative_Dependency_Syntax = "Quantitative Dependency Syntax";
const __tag_Optimality = "Optimality of Dependency Distances";

// ----------------
// -- Work types --
const __wt_all = "All work types";
const __wt_preprint = "Preprint";
const __wt_JournalPaper = "Journal Paper";
const __wt_MastersThesis = "Masters Thesis";
const __wt_ConferenceProceedings = "Conference Proceedings";

// ----------------
// -- Talk types --
const __tt_all = "All talk types";
const __tt_seminar = "Seminar";
const __tt_conference = "Conference";
const __tt_workshop = "Workshop";

// ----------------
// -- Talk names --
const __talkname_all = "All seminars/conferences";
const __talkname_LIMDA = "LIMDA";
const __talkname_Zheijang_University_Python_06_2021 = "Zheijang University -- Python Seminar (June 2021)";
const __talkname_IQLA_GIAT_2021_07 = "IQLA-GIAT Summer School (July 2021)";

// -----------
// -- Years --
const __year_all = "All years";
const __year_2019 = "2019";
const __year_2020 = "2020";
const __year_2021 = "2021";
const __year_2022 = "2022";

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
