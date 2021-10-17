#!/bin/bash

ng build --prod=true --outputPath=dist --baseHref=leonamtv.github.io/periodic-table; cd dist; npx angular-cli-ghpages --dir="/" 
