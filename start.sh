#!/bin/bash
docker-compose -f rest/docker-compose.yaml up -d
docker-compose -f graphql/docker-compose.yaml up -d