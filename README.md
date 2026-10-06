# GAON OS — Ask Your Village

**GAON OS** is a simple digital platform designed to make essential village services, reporting, information, and assistance easier to access.

Instead of making people search through complicated government websites or applications, GAON OS provides a single place where a resident can **ask, report, find, and track**.

## What is GAON OS?

GAON OS is built around a simple idea:

> **“Ask Your Village.”**

A resident can type or speak what they need, find nearby local services, report problems on a map, view village information, and ask an AI assistant for help.

The platform is designed with accessibility and simplicity in mind, especially for users who may not be comfortable with complex digital interfaces.

## Key Features

### 🏠 Village Home

The home page provides an overview of the village and quick access to important functions.

- Find local workers and services
- Report village problems
- Open the village map
- View village notices
- View mandi rates
- View important government schemes
- Ask the AI assistant

### 🛠️ Local Services

Residents can search for nearby services such as:

- Plumbers
- Electricians
- Mechanics
- Tutors
- Shops
- Digital Seva Centres

Services can be filtered by category or searched by name/type.

Each service can include its availability, approximate distance, and directions through Google Maps.

### 📍 Problem Reporting

Residents can report common village problems such as:

- Streetlights
- Water problems
- Roads
- Garbage
- Other local issues

A report can include:

- Problem category
- Description
- Landmark
- Location
- GPS coordinates

Users can either select a location directly on the map or use their current location.

Submitted reports are saved locally and displayed on the village map.

### 🗺️ Village Map

The village map shows reported problems geographically.

Each report contains information such as:

- Report ID
- Problem type
- Description
- Location
- Current status

Reports can move through stages such as:

**Received → Seen by Panchayat → Work Started → Fixed**

### 🤖 GAON OS AI

GAON OS includes an AI assistant that can help residents ask questions about:

- Village services
- Government schemes
- Reports
- Notices
- Mandi information

The assistant supports Hindi and English conversations and can also be used through voice input.

The AI is connected using the OpenRouter API.

### 🎙️ Voice Input

Voice input is available for users who may find typing difficult.

The application uses the browser's Speech Recognition API and supports:

- Hindi
- English

Voice input can be used for asking the AI or entering a problem report.

### 📢 Community Information

The home page includes a community section containing information such as:

- Village notices
- Mandi rates
- Government schemes
- Important local updates

This keeps frequently needed information visible without requiring users to search for it.

### 🚨 Emergency Access

GAON OS also provides quick access to emergency numbers such as:

- 112 — Emergency
- 108 — Ambulance
- 101 — Fire
- 1091 — Women Helpline

## Technology Used

GAON OS is intentionally built as a lightweight web application.

### Frontend

- HTML
- CSS
- JavaScript
- SVG icons
- Responsive design

### Maps

- Leaflet.js
- OpenStreetMap

### AI

- OpenRouter API
- Free model routing through `openrouter/free`

### Browser APIs

- Geolocation API
- Speech Recognition API
- Local Storage
- HTML Popover API

## Data Storage

The current MVP uses **browser localStorage** for storing submitted reports.

This makes the prototype simple to run without requiring a backend database.

For a production version, the local storage layer can be replaced with a proper backend and database.

## Design Principles

GAON OS focuses on:

- **Simplicity** — fewer complicated menus
- **Accessibility** — voice, Hindi and English support
- **Local information** — services and village updates in one place
- **Location awareness** — map-based reporting
- **Transparency** — report status can be tracked
- **Mobile-first design** — usable on phones as well as desktops

## Future Scope

The current version is an MVP. Future versions could include:

- Panchayat/admin dashboard
- Real-time report synchronization
- Cloud database
- User accounts
- Photo and video attachments
- Automatic report categorization using AI
- SMS/WhatsApp notifications
- Verified local service providers
- Real-time government scheme information
- Mandi price APIs
- Complaint escalation
- Panchayat analytics
- Multi-village support
- Offline-first functionality
- Automatic translation between regional languages

## Project Vision

GAON OS aims to make digital governance feel less like filling out forms and more like **talking to your village**.

A resident should not need to understand how a government portal works.

They should simply be able to say:

> **“There is a pothole near the school.”**

or

> **“Mujhe ek plumber chahiye.”**

and the system should help them take the next step.

---

**GAON OS — Ask Your Village.**
