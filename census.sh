#!/bin/bash

cd src
echo "CSS:  $(find . -name '*.css' | xargs wc -l | tail -1)" | sed 's/total/lines/'
echo "JS:   $(find . -name '*.js*' | xargs wc -l | tail -1)" | sed 's/total/lines/'
echo "BOTH: $(find . -type f \( -name '*.css' -or -name '*.js*' \) | xargs wc -l | tail -1)" | sed 's/total/lines/'
cd ..
