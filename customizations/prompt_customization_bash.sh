#!/bin/bash

# ---------- Colors ----------
RESET="\[\e[0m\]"
BLACK="\[\e[30m\]"
RED="\[\e[31m\]"
GREEN="\[\e[32m\]"
BOLDGREEN="\[\e[1;32m\]"
YELLOW="\[\e[33m\]"
BOLDYELLOW="\[\e[1;33m\]"
BLUE="\[\e[34m\]"
BOLDBLUE="\[\e[1;34m\]"
MAGENTA="\[\e[35m\]"
CYAN="\[\e[36m\]"
WHITE="\[\e[97m\]"
BOLDWHITE="\[\e[1;97m\]"
GRAY="\[\e[90m\]"
BRIGHT_RED="\[\e[91m\]"
BRIGHT_GREEN="\[\e[92m\]"

OSC_START="\[\e]133;A\a\]"
OSC_END="\[\e]133;B\a\]"

git_prompt() {
	git rev-parse --is-inside-work-tree >/dev/null 2>&1 || return

	local status=""

	local branch=$(git symbolic-ref --short HEAD 2>/dev/null || git rev-parse --short HEAD 2>/dev/null)
	local untracked=$(git ls-files --others --exclude-standard 2>/dev/null | wc -l)
	local unstaged=$(git diff --name-only | wc -l)
	local staged=$(git diff --cached --name-only | wc -l)

	(( untracked > 0 )) && status+=" ${MAGENTA}?${untracked}${RESET}"
	(( unstaged > 0 )) && status+=" ${RED}*${unstaged}${RESET}"
	(( staged > 0 )) && status+=" ${BLUE}+${staged}${RESET}"

	if git rev-parse @{upstream} >/dev/null 2>&1; then
		local ahead=$(git rev-list --count @{upstream}..HEAD)
		local behind=$(git rev-list --count HEAD..@{upstream})

		(( ahead > 0 )) && status+=" ${BRIGHT_GREEN}⇡${ahead}${RESET}"
		(( behind > 0 )) && status+=" ${BRIGHT_RED}⇣${behind}${RESET}"
	fi

	printf "${YELLOW}[%s%s${YELLOW}]${RESET}" "$branch" "$status"
}

prompt_command() {
	local git_info
	git_info=$(git_prompt)

	local cols=$(tput cols)
	local right=$(date '+%H:%M:%S %a %-d %b %Y')

	local date_text=$(date '+%H:%M:%S %a %Y')

	local PROMPT1A="${BOLDGREEN}\u${RESET} ${CYAN}\w${RESET}"
	if [[ -n "$git_info" ]]; then
		PROMPT1A+=" ${git_info}"
	fi
	PROMPT1A+="${RESET}"

	local PROMPT1C="${BOLDWHITE}$date_text${RESET}"

	local PROMPT1=$(
		printf '%s' "$PROMPT1A"
		printf '\e[%dG%s\n' "$((cols - 17 + 1))" "$PROMPT1C"
	)

	local PROMPT2="${WHITE}➜ ${RESET}"
	PS1="${OSC_START}${PROMPT1}\n${PROMPT2}${OSC_END}"
}

PROMPT_COMMAND=prompt_command
