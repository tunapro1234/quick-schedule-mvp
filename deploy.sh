#!/bin/bash

# Colors for better output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}QuickSchedule Deployment Script${NC}"
echo "---------------------------------------"

case "$1" in
    start)
        echo -e "${GREEN}Starting QuickSchedule in production mode...${NC}"
        docker-compose -f docker-compose.prod.yml up -d
        echo -e "${GREEN}Service started on port 8050${NC}"
        echo -e "${GREEN}Access your application at: http://quick-schedule.tunapro.xyz${NC}"
        ;;
    stop)
        echo -e "${RED}Stopping QuickSchedule services...${NC}"
        docker-compose -f docker-compose.prod.yml down
        echo -e "${RED}Services stopped${NC}"
        ;;
    restart)
        echo -e "${BLUE}Restarting QuickSchedule services...${NC}"
        docker-compose -f docker-compose.prod.yml down
        docker-compose -f docker-compose.prod.yml up -d
        echo -e "${GREEN}Services restarted${NC}"
        ;;
    logs)
        echo -e "${BLUE}Showing logs...${NC}"
        docker-compose -f docker-compose.prod.yml logs -f
        ;;
    build)
        echo -e "${BLUE}Building production images...${NC}"
        docker-compose -f docker-compose.prod.yml build
        echo -e "${GREEN}Build completed${NC}"
        ;;
    *)
        echo -e "${RED}Usage: $0 {start|stop|restart|logs|build}${NC}"
        echo ""
        echo "start   - Start the services in production mode"
        echo "stop    - Stop all services"
        echo "restart - Restart all services"
        echo "logs    - View container logs"
        echo "build   - Build or rebuild container images"
        exit 1
esac

exit 0 