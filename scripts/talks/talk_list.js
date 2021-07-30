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
	location : // city where the talk was given
	tags : // tags classifying this work
	year : // year of publication
	date : // the exact date when I gave the talk
	title : // title of the talk
	
	// OPTIONAL
	session : // if the seminar has more than one session,
	part_of_the_course : // if the seminar is part of a course which has a public url (like LAL's courses)
},
*/

// -----------------------------------------------------------
// My works (theses, journal articles, papers, preprints, ...)

const talks = {
	IQLA_GIAT_2021_07__2 : {
		talk_type : __tt_workshop,
		what_talk : __talkname_IQLA_GIAT_2021_07,
		
		institution : __institution_IQLA_GIAT_Summer_School,
		location : __location_Italy,
		tags : [__tag_Quantitative_Dependency_Syntax, __tag_LinArr, __tag_Linear_Arrangement_Library],
		year : 2021,
		date : "2021/07/29",
		title : "An introduction to Quantitative Dependency Syntax with the Linear Arrangement Library",
		slides_url : "https://mydisk.cs.upc.edu/s/Jrp4pAB23Y3DgEQ",
		
		session : "2",
		part_of_the_course : "https://cqllab.upc.edu/lal/course_iqla_giat_july_2021/"
	},
	
	IQLA_GIAT_2021_07__1 : {
		talk_type : __tt_workshop,
		what_talk : __talkname_IQLA_GIAT_2021_07,
		
		institution : __institution_IQLA_GIAT_Summer_School,
		location : __location_Italy,
		tags : [__tag_Quantitative_Dependency_Syntax, __tag_LinArr, __tag_Linear_Arrangement_Library],
		year : 2021,
		date : "2021/07/29",
		title : "An introduction to Quantitative Dependency Syntax with the Linear Arrangement Library",
		slides_url : "https://mydisk.cs.upc.edu/s/znEWkrZbLbAmrZ9",
		
		session : "1",
		part_of_the_course : "https://cqllab.upc.edu/lal/course_iqla_giat_july_2021/"
	},
	
	CHINA_2021_06_04 : {
		talk_type : __tt_seminar,
		what_talk : __talkname_Zheijang_University_Python_06_2021,
		
		institution : __institution_Zheihang_University,
		location : __location_China,
		tags : [__tag_Quantitative_Dependency_Syntax, __tag_LinArr, __tag_Linear_Arrangement_Library],
		year : 2021,
		date : "2021/06/04",
		title : "Quantitative Dependency Syntax with the Linear Arrangement Library (LAL). An introduction",
		slides_url : "https://mydisk.cs.upc.edu/s/Hoacc7mF4m8FdST",
		
		session : "3",
		part_of_the_course : "https://cqllab.upc.edu/lal/course_china_june_2021/"
	},
	
	CHINA_2021_06_03 : {
		talk_type : __tt_seminar,
		what_talk : __talkname_Zheijang_University_Python_06_2021,
		
		institution : __institution_Zheihang_University,
		location : __location_China,
		tags : [__tag_Quantitative_Dependency_Syntax, __tag_LinArr, __tag_Linear_Arrangement_Library],
		year : 2021,
		date : "2021/06/03",
		title : "Quantitative Dependency Syntax with the Linear Arrangement Library (LAL). An introduction",
		slides_url : "https://mydisk.cs.upc.edu/s/cTEySQPDrapbLKz",
		
		session : "2",
		part_of_the_course : "https://cqllab.upc.edu/lal/course_china_june_2021/"
	},
	
	CHINA_2021_06_01 : {
		talk_type : __tt_seminar,
		what_talk : __talkname_Zheijang_University_Python_06_2021,
		
		institution : __institution_Zheihang_University,
		location : __location_China,
		tags : [__tag_Quantitative_Dependency_Syntax, __tag_LinArr, __tag_Linear_Arrangement_Library],
		year : 2021,
		date : "2021/06/01",
		title : "Quantitative Dependency Syntax with the Linear Arrangement Library (LAL). An introduction",
		slides_url : "https://mydisk.cs.upc.edu/s/bG3WcAmzpzfZQc2",
		
		session : "1",
		part_of_the_course : "https://cqllab.upc.edu/lal/course_china_june_2021/"
	},
	
	LIMDA_2019_12_18 : {
		talk_type : __tt_seminar,
		what_talk : __talkname_LIMDA,
		
		institution : __institution_UPC,
		location : __location_Barcelona,
		tags : [__tag_Networks, __tag_NetworkScience, __tag_LinArr, __tag_RandGraphs],
		year : 2019,
		date : "2019/12/18",
		title : "Edge crossings in random arrangements",
		slides_url : "https://github.com/lluisalemanypuig/lluisalemanypuig.github.io/blob/master/talks_files/LIMDA_2019_12_18.pdf"
	}
};
