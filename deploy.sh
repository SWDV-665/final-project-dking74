#!/bin/sh
git subtree push --prefix client https://git.heroku.com/final-project-client-dk.git master || true
git subtree push --prefix server https://git.heroku.com/final-project-server-dk.git  master || true