#!/bin/bash

ng build --prod=true --output-path dist --base-href /periodic-table/;
npx angular-cli-ghpages --dir="dist";

