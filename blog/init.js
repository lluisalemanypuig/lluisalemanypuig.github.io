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

const base_url = "https://raw.githubusercontent.com/lluisalemanypuig/lluisalemanypuig.github.io/master";

var manifest_data = undefined;

function github_path(file) {
    return `${base_url}/blog/${file}`;
}

async function get_manifest_data() {
    const response = await fetch(github_path("manifest.json"));
    const manifest = await response.json();
    return manifest;
}

window.onload = async function() {
    manifest_data = await get_manifest_data();
    
    // Populate the dropdown buttons with all the possible
    // values. These drop downs are initialised with the defaut value
    // "All tags", "All years", "All ...", ...
    console.log("Populating drop down menus...");
    populateDropDowns();

    // populate the publications list
    console.log("Populating entries list...");
    populateFilteredEntriesList();
};
