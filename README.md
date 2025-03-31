# QuickSchedule MVP

QuickSchedule is a simple, elegant tool to make scheduling between two people effortless — something smarter and more user-friendly than Calendly or When2Meet.

## Features

- Modern, clean UI built with Next.js and TailwindCSS
- Planner view for selecting available time slots
- Requests view for managing and responding to scheduling requests
- Responsive design that works on mobile and desktop

## Getting Started with Docker

This project includes Docker configuration for easy setup and deployment without requiring local Node.js installation.

### Prerequisites

- Docker
- Docker Compose

### Running the Application

1. Clone this repository
2. From the project root, run:

```bash
docker-compose up
```

3. Open your browser and navigate to `http://localhost:3000`

## Note About TypeScript Errors

The project currently shows TypeScript errors because the type definitions need to be installed. These errors will be resolved automatically when you first run the Docker container, as the npm install process will install all the required dependencies.

## Development Roadmap

### Current MVP Features
- UI for selecting and sharing availability
- UI for viewing and accepting/declining scheduling requests

### Next Steps
1. Add state management and persistence
2. Implement user authentication
3. Connect to Google Calendar API
4. Create API endpoints for saving and retrieving schedule data

### Future Features
- Google Calendar authentication and integration
- Automatic calendar syncing
- Email notifications
- Meeting details and agenda setting

## Project Structure

```
quick-schedule-mvp/
├── app/                    # Next.js App Router
│   ├── components/         # Reusable UI components
│   ├── dashboard/          # Dashboard page with planning and requests tabs
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page with hero section
├── public/                 # Static assets
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose configuration
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # TailwindCSS configuration
└── tsconfig.json           # TypeScript configuration
```
