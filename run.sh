#!/bin/bash

# Simple script to run the app

echo "Building and starting the app..."
docker-compose up -d

echo "App should be running at: http://quick-schedule.tunapro.xyz:9092"
echo "To stop it, run: docker-compose down"
echo "To check logs, run: docker-compose logs -f" 