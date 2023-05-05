#!/bin/bash
node_modules/.bin/tsc && cp .env dist/ && node dist/server.js
