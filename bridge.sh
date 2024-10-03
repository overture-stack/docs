#!/bin/bash

# Do not use absolute paths, they will not deploy on netlify correctly

ln -s ../../submodules/song/docs website/docs/01-Song
ln -s ../../submodules/score/docs website/docs/02-Score
ln -s ../../submodules/maestro/docs website/docs/03-Maestro
ln -s ../../submodules/arranger/docs website/docs/04-Arranger
ln -s ../../submodules/stage/docs website/docs/05-Stage
