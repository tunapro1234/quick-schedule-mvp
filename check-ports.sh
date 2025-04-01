#!/bin/bash

# Colors for better output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Port Usage Checker${NC}"
echo "------------------"

# Check port 9090
echo -e "${YELLOW}Checking port 9090:${NC}"
netstat -tuln | grep 9090 || echo -e "${GREEN}Port 9090 is not in use by any TCP service${NC}"
lsof -i :9090 || echo -e "${GREEN}Port 9090 is not in use by any process${NC}"

# Check port 9091
echo -e "\n${YELLOW}Checking port 9091:${NC}"
netstat -tuln | grep 9091 || echo -e "${GREEN}Port 9091 is not in use by any TCP service${NC}"
lsof -i :9091 || echo -e "${GREEN}Port 9091 is not in use by any process${NC}"

# List all Docker containers
echo -e "\n${YELLOW}Docker containers:${NC}"
docker ps -a

# List all ports in use
echo -e "\n${YELLOW}All listening ports:${NC}"
netstat -tuln | grep LISTEN 