#!/bin/bash

# If launcher is not found, clone it
if [ ! -d .lnc ]; then
    if ! git clone git@gitlab.com:niwee-productions/tools/launcher.git .lnc; then
        echo -e "[\e[32mLauncher\e[97m][\e[31mERROR\e[97m] Could not retrieve launcher."
        exit
    fi
fi

# Set container names
export SERVER=nginx
export APP=strapi
export DB=mariadb
export NODE=gulp
export TYPE=php

# Set filepaths
export LAUNCHER_PATH=.lnc
export SQL_FILE_PATH="sql"

# Set templates
unset LAUNCHER_TEMPLATES[@]
LAUNCHER_TEMPLATES=("git@github.com:me/myawesometemplate" "git@github.com:me/myawesometemplate2" "git@github.com:me/myawesometemplate3")

# Execute the launcher with all params
LAUNCHER_TEMPLATES="${LAUNCHER_TEMPLATES[@]}" ./.lnc/launcher.sh "$@"
