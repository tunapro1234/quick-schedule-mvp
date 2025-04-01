#!/bin/bash

# Simple script to run the app with host Nginx

echo "Building and starting the app..."
docker-compose down
docker-compose build
docker-compose up -d

echo "App container is now running on port 3001"
echo ""
echo "IMPORTANT: You need to configure the host Nginx to route to this container."
echo "1. Copy the host-nginx.conf file to your server's Nginx configuration:"
echo "   sudo cp host-nginx.conf /etc/nginx/sites-available/quick-schedule"
echo ""
echo "2. Create a symbolic link to enable the site:"
echo "   sudo ln -s /etc/nginx/sites-available/quick-schedule /etc/nginx/sites-enabled/"
echo ""
echo "3. Test and reload Nginx:"
echo "   sudo nginx -t"
echo "   sudo systemctl reload nginx"
echo ""
echo "After completing these steps, your app should be available at:"
echo "http://quick-schedule.tunapro.xyz"
echo ""
echo "To stop the app container: docker-compose down"
echo "To check logs: docker-compose logs -f app" 