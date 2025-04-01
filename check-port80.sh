#!/bin/bash

# Check if port 80 is available
echo "Checking if port 80 is available..."

# On Linux, use netstat
if command -v netstat &> /dev/null; then
    PORT_IN_USE=$(netstat -tuln | grep -w ":80" | wc -l)
    
    if [ $PORT_IN_USE -gt 0 ]; then
        echo "WARNING: Port 80 appears to be in use already."
        echo "Process using port 80:"
        sudo lsof -i :80 || sudo netstat -tulnp | grep :80
        echo "You may need to stop this service before running our application."
    else
        echo "Port 80 is available."
    fi
# On Mac, use lsof
elif command -v lsof &> /dev/null; then
    PORT_IN_USE=$(lsof -i :80 | wc -l)
    
    if [ $PORT_IN_USE -gt 0 ]; then
        echo "WARNING: Port 80 appears to be in use already."
        echo "Process using port 80:"
        sudo lsof -i :80
        echo "You may need to stop this service before running our application."
    else
        echo "Port 80 is available."
    fi
else
    echo "Cannot determine if port 80 is in use. Please check manually."
fi 