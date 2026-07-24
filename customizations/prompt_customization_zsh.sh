# Name                           Code Equivalent
# black                          %F{black}   %F{0}
# red                            %F{red}     %F{1}
# green                          %F{green}   %F{2}
# yellow                         %F{yellow}  %F{3}
# blue                           %F{blue}    %F{4}
# magenta / purple               %F{magenta} %F{5}
# cyan                           %F{cyan}    %F{6}
# white                          %F{white}   %F{7}
# gray / grey / light-black                  %F{8}
# light-red / bright-red                     %F{9}
# light-green / bright-green                 %F{10}
# light-yellow / bright-yellow               %F{11}
# light-blue / bright-blue                   %F{12}
# light-magenta / bright-magenta             %F{13}
# light-cyan / bright-cyan                   %F{14}
# bright-white                               %F{15}

autoload -Uz vcs_info

+vi-git-ahead-behind() {
    local ahead behind
    local -a gitstatus

    untracked=$(git ls-files --others --exclude-standard 2>/dev/null | wc -l | tr -d ' ')
    (( untracked > 0 )) && gitstatus+=("%F{magenta}?${untracked}%f")

    if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
        unstaged=$(git status --porcelain 2>/dev/null | grep -c '^.[MD]')
        staged=$(git status --porcelain 2>/dev/null | grep -c '^[MADRC]')

        (( unstaged > 0 )) && gitstatus+=("%F{red}*${unstaged}%f")
        (( staged > 0 ))   && gitstatus+=("%F{blue}+${staged}%f")
    fi

    if git rev-parse @{upstream} >/dev/null 2>&1; then
        ahead=$(git rev-list @{upstream}..HEAD 2>/dev/null | wc -l | tr -d ' ')
        behind=$(git rev-list HEAD..@{upstream} 2>/dev/null | wc -l | tr -d ' ')

        (( ahead > 0 ))  && gitstatus+=("%F{10}⇡${ahead}%f")
        (( behind > 0 )) && gitstatus+=("%F{9}⇣${behind}%f")

        hook_com[misc]="${(j: :)gitstatus}"
    fi
}

local PROMPT_START="%{\e]133;A\a%}"
local PROMPT_END="%{\e]133;B\a%}"

setopt PROMPT_SUBST

zstyle ':vcs_info:git:*' check-for-changes true
zstyle ':vcs_info:git*+set-message:*' hooks git-ahead-behind
zstyle ':vcs_info:*' max-exports 2
zstyle ':vcs_info:git:*' formats '%b' '%m'

precmd() {
	vcs_info

	local branch="${vcs_info_msg_0_}"
	local status_head="${vcs_info_msg_1_}"

	local PROMPT_STRING=""
	local ARROW_PROMPT="%F{15}➜ "

	if [[ -z $branch ]]; then
		PROMPT_STRING="%F{green}%n %F{cyan}%~ %f"
	else
		GIT_DISPLAY="%F{yellow}[$branch%f"
		if [[ -n $status_head ]]; then
			GIT_DISPLAY+=" $status_head"
		fi
		GIT_DISPLAY+="%F{yellow}]%f"
		PROMPT_STRING="%F{green}%n %F{cyan}%~ ${GIT_DISPLAY}%F{green}%f"
	fi

	PROMPT="${PROMPT_STRING}"$'\n'"${ARROW_PROMPT}"
	RPROMPT=$'%{\e[1A%}%F{gray}%D{%H:%M:%S %a %-d %b %Y}%f%{\e[1B%}'
}
