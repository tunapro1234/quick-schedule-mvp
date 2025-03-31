# Deploying QuickSchedule to quick-schedule.tunapro.xyz

This guide explains how to deploy the QuickSchedule application to your domain using Docker and Nginx.

## Prerequisites

- Docker and Docker Compose installed on your laptop
- SSH access to your laptop
- Your domain (quick-schedule.tunapro.xyz) already configured to point to your static IP

## Architecture

This deployment uses:
- A Next.js application container running on port 3000 (internal only)
- Nginx as a reverse proxy on port 8050
- Docker Compose for orchestration

## Port Configuration

- **External Port**: 8050 (Nginx listens on this port)
- **Internal Port**: 3000 (Next.js application, not directly exposed)

We've chosen port 8050 to minimize potential conflicts with other services on your laptop.

## Setup Instructions

1. Clone this repository to your laptop:
   ```bash
   git clone <repository-url> quick-schedule
   cd quick-schedule
   ```

2. Make sure the deploy script is executable:
   ```bash
   chmod +x deploy.sh
   ```

3. Build the production images:
   ```bash
   ./deploy.sh build
   ```

4. Start the application:
   ```bash
   ./deploy.sh start
   ```

## Managing the Application

The deploy script provides several commands to manage the application:

- **Start**: `./deploy.sh start`
- **Stop**: `./deploy.sh stop`
- **Restart**: `./deploy.sh restart`
- **View Logs**: `./deploy.sh logs`
- **Rebuild**: `./deploy.sh build`

## DNS Configuration

Ensure your domain (quick-schedule.tunapro.xyz) is configured to point to your static IP address. Additionally, configure your router to forward port 8050 to your laptop's internal IP address.

## Configuring Nginx on Your Router (Optional)

If you have Nginx running on your router, you can add this configuration to route traffic to your laptop:

```nginx
server {
    listen 80;
    server_name quick-schedule.tunapro.xyz;

    location / {
        proxy_pass http://YOUR_LAPTOP_INTERNAL_IP:8050;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Troubleshooting

- **Application not accessible**: Check if the containers are running with `docker ps`
- **Port conflicts**: If port 8050 is already in use, edit the `docker-compose.prod.yml` file to use a different port
- **Nginx errors**: Check Nginx logs with `docker logs quick-schedule-nginx`
- **Application errors**: Check application logs with `docker logs quick-schedule-app` 