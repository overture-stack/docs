#!/bin/bash

# Do not use absolute paths, they will not deploy on netlify correctly
# Run this from the directory you want the link to be made in 
ln -s ../../../submodules/song/docs/ 01-song
ln -s ../../../submodules/score/docs/ 02-score
ln -s ../../../submodules/maestro/docs/ 03-maestro
ln -s ../../../submodules/arranger/docs/ 04-arranger
ln -s ../../../submodules/stage/docs/ 05-stage
