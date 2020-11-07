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
// sample of a talk
// Name of talk. Replace 'XX' by a two-digit number
wXX : {
	talk_type : // type of the talk (at a seminar, at a conference)
	
	institution : // insitution where the talk was given
	city : // city where the talk was given
	tags : // tags classifying this work
	year : // year of publication
	
	title : // title of the talk
},
*/

// -----------------------------------------------------------
// My works (theses, journal articles, papers, preprints, ...)

const talks = {
	LIMDA_12_2019 : {
		talk_type : __tt_seminar,
		what_talk : __talkname_LIMDA,
		
		institution : __institution_UPC,
		city : __city_Barcelona,
		tags : [__tag_Networks, __tag_NetworkScience, __tag_LinArr, __tag_RandGraphs],
		year : 2019,
		title : "Edge crossings in random arrangements",
		slides_url : "https://github.com/lluisalemanypuig/lluisalemanypuig.github.io/blob/master/talks_files/LIMDA_2019_12_18.pdf"
	}
};
