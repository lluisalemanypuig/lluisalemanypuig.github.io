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
	type : // type of the talk (at a seminar, at a conference)
	name : // name of the workshop/conference/seminar/...
	url : // url to the workshop/conference/seminar/...
	
	title : // title of the workshop/conference/seminar/...
	year : // year of publication
	date : // the exact date when I gave the talk
	session : // the session number (optional)
	
	slides_url : // url to the slides used
	
	// either this
	institution : // insitution where the talk was given
	institution_url : // a url to the insitution where the talk was given
	//
	// or this
	institutions : // insitution where the talk was given
	institutions_url : // a url to the insitution where the talk was given
	
	location : // city where the talk was given
	location_mode : // (online) / (in person)
	
	tags : // tags classifying this work
	
	info_url : // an url for extra information (optional)
},
*/

// -----------------------------------------------------------
// My talks (workshops, conferences, seminars, ...)

const talks = {
	PhD_Defense_2024_09_28 : {
		type : __talktype_PhD_Defense,
		name : __talkname_PhD_Defense,
		
		title : "Theory, Algorithms and Applications of Arrangements of Trees: Generation, Expectation and Optimization",
		authors : [__author_me],
		
		year : 2024,
		date : "2024/09/28",
		
		slides_url : "https://github.com/lluisalemanypuig/lluisalemanypuig.github.io/blob/master/science/talks/files/PhD_defense_2024_09_26/defense.pdf",
		
		institutions : [__institution_UPC],
		institutions_url : ["https://www.upc.edu/ca"],
		
		location : __location_Barcelona,
		location_mode : "(in person)",
		
		tags : [__tag_LinArr, __tag_Algos, __tag_Minimization, __tag_Maximization, __tag_Linear_Arrangement_Library, __tag_Expected_Values]
	},
	
	QUALICO_2023 : {
		type : __talktype_conference,
		name : __talkname_QUALICO,
		url : "https://wp.unil.ch/qualico2023/",
		
		title : "Syntactic development and optimality of dependency distances for Japanese as a second language",
		authors : [__author_SKomori, __author_MSugiura, __author_RFerreriCancho, __author_me, __author_Wli],
		
		year : 2023,
		date : "2023/06/28 -- 2023/07/30",
		session : "A5 -- Dependencies 3 -- Talk 2",
		
		slides_url : null,
		
		institutions : [__institution_IQLA, __institution_UNIL],
		institutions_url : ["http://iqla.org/", "https://www.unil.ch/central/en/home.html"],
		
		location : __location_Lausanne,
		location_mode : "(in person)",
		
		tags : [__tag_Quantitative_Dependency_Syntax, __tag_LinArr, __tag_Optimality, __tag_Measuring_Learners_Proficiency]
	},
	
	SyntaxFest_2022 : {
		type : __talktype_poster,
		name : __talkname_SynatxFest + " (2021)",
		url : "https://syntaxfest.github.io/syntaxfest21/",
		
		title : "The Linear Arrangement Library. A new tool for research on syntactic dependency structures",
		authors : [__author_me, __author_JLEsteban, __author_RFerreriCancho],
		
		year : 2022,
		date : "2022/03/21 -- 2022/03/24",
		
		slides_url : "https://github.com/lluisalemanypuig/lluisalemanypuig.github.io/blob/master/science/talks/files/SyntaxFest2021_LAL_poster.pdf",
		
		institutions : [__institution_Sofia_University, __institution_IICT_BAS],
		institutions_url : ["https://www.sofia.edu/", "https://iict.bas.bg/en/"],
		
		location : __location_Sofia + " (online)",
		location_mode : "(in person)",
		
		tags : [__tag_Quantitative_Dependency_Syntax, __tag_Linear_Arrangement_Library]
	},

	IQLA_GIAT_2021_07__2 : {
		type : __talktype_workshop,
		name : __talkname_IQLA_GIAT_summer_school,
		url : "http://www.giat.org/?page_id=11&lang=en",
		
		title : "An introduction to Quantitative Dependency Syntax with the Linear Arrangement Library",
		authors : [__author_me, __author_RFerreriCancho],
		
		year : 2021,
		date : "2021/07/29",
		session : "2/2",
		
		slides_url : "https://mydisk.cs.upc.edu/s/Jrp4pAB23Y3DgEQ",
		
		institutions : [__institution_IQLA, __institution_GIAT],
		institutions_url : ["http://iqla.org/", "http://www.giat.org/"],
		
		location : __location_Padova,
		location_mode : "(online)",
		
		tags : [__tag_Quantitative_Dependency_Syntax, __tag_LinArr, __tag_Linear_Arrangement_Library],
		
		info_url : "https://cqllab.upc.edu/lal/course_iqla_giat_july_2021/"
	},
	IQLA_GIAT_2021_07__1 : {
		type : __talktype_workshop,
		name : __talkname_IQLA_GIAT_summer_school,
		url : "http://www.giat.org/?page_id=11&lang=en",
		
		title : "An introduction to Quantitative Dependency Syntax with the Linear Arrangement Library",
		authors : [__author_me, __author_RFerreriCancho],
		
		year : 2021,
		date : "2021/07/29",
		session : "1/2",
		
		slides_url : "https://mydisk.cs.upc.edu/s/znEWkrZbLbAmrZ9",
		
		institutions : [__institution_IQLA, __institution_GIAT],
		institutions_url : ["http://iqla.org/", "http://www.giat.org/"],
		
		location : __location_Padova,
		location_mode : "(online)",
		
		tags : [__tag_Quantitative_Dependency_Syntax, __tag_LinArr, __tag_Linear_Arrangement_Library],
		
		info_url : "https://cqllab.upc.edu/lal/course_iqla_giat_july_2021/"
	},
	
	CHINA_2021_06_04 : {
		type : __talktype_workshop,
		name : __talkname_Zheijang_University_Python_seminar,
		url : "https://cqllab.upc.edu/lal/course_china_june_2021/",
		
		title : "Quantitative Dependency Syntax with the Linear Arrangement Library (LAL). An introduction",
		authors : [__author_me, __author_RFerreriCancho, __author_JLEsteban],
		
		institution : __institution_Zheihang_University,
		institution_url : "https://www.zju.edu.cn/english/main.htm",
		
		slides_url : "https://mydisk.cs.upc.edu/s/Hoacc7mF4m8FdST",
		
		location : __location_China,
		location_mode : "(online)",
		
		tags : [__tag_Quantitative_Dependency_Syntax, __tag_LinArr, __tag_Linear_Arrangement_Library],
		
		year : 2021,
		date : "2021/06/04",
		session : "3/3"
	},
	CHINA_2021_06_03 : {
		type : __talktype_workshop,
		name : __talkname_Zheijang_University_Python_seminar,
		url : "https://cqllab.upc.edu/lal/course_china_june_2021/",
		
		title : "Quantitative Dependency Syntax with the Linear Arrangement Library (LAL). An introduction",
		authors : [__author_me, __author_RFerreriCancho, __author_JLEsteban],
		
		institution : __institution_Zheihang_University,
		institution_url : "https://www.zju.edu.cn/english/main.htm",
		
		slides_url : "https://mydisk.cs.upc.edu/s/cTEySQPDrapbLKz",
		
		location : __location_China,
		location_mode : "(online)",
		
		tags : [__tag_Quantitative_Dependency_Syntax, __tag_LinArr, __tag_Linear_Arrangement_Library],
		
		year : 2021,
		date : "2021/06/03",
		session : "2/3"
	},
	CHINA_2021_06_01 : {
		type : __talktype_workshop,
		name : __talkname_Zheijang_University_Python_seminar,
		url : "https://cqllab.upc.edu/lal/course_china_june_2021/",
		
		title : "Quantitative Dependency Syntax with the Linear Arrangement Library (LAL). An introduction",
		authors : [__author_me, __author_RFerreriCancho, __author_JLEsteban],
		
		institution : __institution_Zheihang_University,
		institution_url : "https://www.zju.edu.cn/english/main.htm",
		
		slides_url : "https://mydisk.cs.upc.edu/s/bG3WcAmzpzfZQc2",
		
		location : __location_China,
		location_mode : "(online)",
		
		tags : [__tag_Quantitative_Dependency_Syntax, __tag_LinArr, __tag_Linear_Arrangement_Library],
		
		year : 2021,
		date : "2021/06/01",
		session : "1/3"
	},
	
	LIMDA_2019_12_18 : {
		type : __talktype_seminar,
		name : __talkname_LIMDA,
		url : "https://gapcomb.upc.edu/en/seminar-en/",
		
		title : "Edge crossings in random arrangements",
		authors : [__author_me, __author_RFerreriCancho],
		
		institution : __institution_UPC,
		institution_url : "https://www.upc.edu/en",
		
		slides_url : "https://github.com/lluisalemanypuig/lluisalemanypuig.github.io/blob/master/science/talks/files/LIMDA_2019_12_18.pdf",
		
		location : __location_Barcelona,
		location_mode : "(in person)",
		
		tags : [__tag_Networks, __tag_NetworkScience, __tag_LinArr, __tag_RandGraphs],
		
		year : 2019,
		date : "2019/12/18"
	}
};
