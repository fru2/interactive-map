# Lookal - Interactive Location Marker App

Lookal is a web application that allows users to search, add, and manage location markers on an interactive map. It also uses AI to identify the top places to visit and foods to try at the location. Built with Next.js, React-Leaflet, and Tailwind CSS, this project focuses on delivering a smooth experience for both desktop and mobile users.

Live webpage: https://lookal-interactive-locations.vercel.app

https://github.com/user-attachments/assets/e7f68ee0-2908-45d2-b743-88c0117bbd2f


## Features
- Add & Manage Markers – Save locations and manage them efficiently.
- Interactive Map – Powered by OpenStreetMap and Leaflet.
- Details by AI: Fetch information about the place using AI.
- Persistent Storage – Save markers locally in localStorage.

## Tech Stack
- Frontend: Next.js, React, Tailwind CSS
- Mapping: React-Leaflet, OpenStreetMap
- Icons: Lucide-react
- LLM model: Gemini 1.5 flash
- Storage: LocalStorage

## Installation & Setup

1. Clone the Repository
```bash
git clone https://github.com/fru2/lookal-interactive-locations.git
cd lookal
```
2️. Install Dependencies
```bash
npm install  # or yarn install
```
3️. Run the Development Server
```bash
npm run dev  # or yarn dev
```
Open `http://localhost:3000` in your browser to view the app.

## Project Structure
```
lookal/
├── app/
│   ├── index.js            # Main application entry point
│   ├── app.js              # App configuration and routing
│   ├── globals.css         # Global CSS styles
├── components/
│   ├── ui/                 # Shadcn UI components
│   ├── SideNav.js          # Sidebar navigation for markers
│   ├── LocationDetails.js  # Marker details popup
│   ├── MapComponent.js     # Main interactive map component
├── data/
│   ├── markers.json        # Default marker data
├── utils/
│   ├── api.js              # Fetch latitude and longitude
```

!! If you find a bug or want to improve the UI, feel free to open an issue !!