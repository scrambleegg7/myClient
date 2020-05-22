#!/bin/sh

aws s3 cp \
   s3://virginia-webtest-client s3://virginia-webtest-client \
   --exclude 'index.html' --exclude 'robots.txt' \ 
   --cache-control 'max-age=604800' \
   --metadata-directive REPLACE --acl public-read \
   --recursive

