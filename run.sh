#!/bin/bash

# Simple script to run the app with Nginx

echo "Building and starting the app with Nginx..."
docker-compose down
docker-compose build
docker-compose up -d

echo "App should be running at: http://quick-schedule.tunapro.xyz:8080"
echo "To stop it, run: docker-compose down"
echo "To check app logs, run: docker-compose logs -f app"
echo "To check Nginx logs, run: docker-compose logs -f nginx" 