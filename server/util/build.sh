#! /bin/bash

rm -rf dist && mkdir -p dist && cp ./swagger.yaml ./dist && ./node_modules/.bin/tsc --project ./tsconfig.json