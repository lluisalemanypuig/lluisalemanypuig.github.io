/*
 * Personal webpage's scripts
 * Copyright (C) 2025  Lluís Alemany Puig
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


// function to compute sets of unique elements
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

// populate dropdown: use long names for the text, and the short
// names for the values.
function addToDropDown(dd, item, relate) {
    var opt = document.createElement('option');
    
    if (relate == null) {
        opt.text = item;
        opt.value = item;
    }
    else {
        opt.text = relate[item];
        opt.value = item;
    }
    dd.appendChild(opt);
}

function populateDropDown(id, what, tag_all) {
    var all_values = manifest_data["unique_tags"][what]
    all_values.sort(
        function(a,b) {
            if (a == tag_all) { return -1; }
            if (b == tag_all) { return  1; }
            return b - a;
        }
    );
    all_values.unshift(tag_all);
    console.log(`    Add ${all_values.length} ${what}: ${all_values}`);
    var dd = document.getElementById(id);
    dd.textContent = '';
    all_values.forEach(function(item) { addToDropDown(dd, item, null); });
    console.log(`    Values in ${what} drop down: ${dd.childNodes.length}`);
}

function populateDropDowns() {
    populateDropDown("years_select", "years", "All years");
    populateDropDown("projects_select", "projects", "All projects");
    populateDropDown("topics_select", "topics", "All topics");
    populateDropDown("languages_select", "languages", "All languages");
}
