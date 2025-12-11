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

function makeProjectTagText(repo, project) {
    if (repo == "lluisalemanypuig") {
        return `${project}`;
    }
    return `${repo}@${project}`;
}

function makeProjectDropdownText(repo, project) {
    if (repo == "lluisalemanypuig") {
        return project;
    }
    return `${repo}@${project}`;
}

function makeProjectValue(repo, project) {
    return `${repo}@${project}`;
}

function retrieveProjectRaw(address_project) {
    var [repo, project_name] = address_project.split("@");
    if (project_name == undefined) {
        project_name = repo;
        repo = "lluisalemanypuig";
    }
    return [repo, project_name];
}

function retrieveProjectDropdownValue(value) {
    return address_project.split("@");
}
