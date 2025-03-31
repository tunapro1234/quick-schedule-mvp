# QuickSchedule MVP

QuickSchedule is a simple, elegant tool to make scheduling between two people effortless — something smarter and more user-friendly than Calendly or When2Meet.

## Features

- Modern, clean UI built with Next.js and TailwindCSS
- Three-tab dashboard interface:
  - Overview: See your current schedule at a glance
  - Planning: Compare calendars and find overlapping availability
  - Requests: Manage and respond to scheduling requests
- Interactive scheduling workflow that compares two users' availability
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

## How It Works

1. **View Your Schedule**: The Overview tab shows your current meetings and appointments
2. **Plan a Meeting**: The Planning tab allows you to:
   - Enter the email of the person you want to meet with
   - Compare calendars to find overlapping availability
   - Select preferred time slots and send an invitation
3. **Manage Requests**: The Requests tab lets you accept or decline meeting requests from others

## Development Roadmap

### Current MVP Features
- UI for overview, planning, and requests management
- Interactive workflow for comparing availability between two users
- Dedicated "How It Works" page with detailed explanation

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
│   │   ├── Header.tsx      # Navigation header
│   │   ├── OverviewTab.tsx # Current schedule view
│   │   ├── PlanningTab.tsx # Scheduling workflow
│   │   ├── RequestsView.tsx# Meeting requests management
│   │   ├── Tabs.tsx        # Tab navigation component 
│   │   └── UserCalendar.tsx# Calendar selection for User B
│   ├── dashboard/          # Dashboard page with three tabs
│   ├── how-it-works/       # Detailed explanation page
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
