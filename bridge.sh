#!/bin/bash

# Do not use absolute paths, they will not deploy on netlify correctly
# Run this from the directory you want the link to be made in 
ln -s ../../../submodules/song/docs/ 01-song
ln -s ../../../submodules/score/docs/ 02-score
ln -s ../../../submodules/maestro/docs/ 03-maestro
ln -s ../../../submodules/arranger/docs/ 04-arranger
ln -s ../../../submodules/stage/docs/ 05-stage

# Linked into from bridge/website/docs/04-Standards
ln -s ../../submodules/.github/standards 04-standards

# Linked into from bridge/website/docs/03-under-development 
ln -s ../../../submodules/lectern/docs/ 01-lectern
ln -s ../../../submodules/lyric/docs/ 02-lyric
