# URBREATH e-participation mobile app— Plain Language Guide

> **URBREATH e-participation mobile app** — A proprietary prototype native app designed to enhance citizen participation in commons. Currently developed for URBREATH project, it hosts its pilot cities (9 European cities) aims to empower citizens, giving them the space to have a say in making their neighborhoods greener and more sustainable while also be informed and collaborate on city's activities and everyday life.

---

## What Is URBREATH e-participation mobile app?

URBREATH e-participation mobile app is a native app (works on iPhones and Android phones) that lets regular citizens participate in decisions about green spaces, urban nature, and environmental improvements in their city.

Think of it as a mix between a city suggestion box, a neighborhood forum, and a project tracker — all focused on nature and the environment.

Under URBREATH project, the prototype is created to serve **9 cities**: Madrid, Parma, Athens, Tallinn, Kajaani, Cluj-Napoca, Pilsen, Leuven, and Aarhus.

---

## What Can You Do With It?

The app has several main features:

**Participatory Processes & Assemblies** — The cities run official democratic programs where residents can weigh in on plans. These come from a separate system called e-participation web application based on Decidim (more on that below).

**Proposals** — You can submit your own ideas for improving the city. Things like "plant more trees on Oak Street" or "add recycling bins near the park." or "nice location for a pocket park." or else. Other people can vote (by "like") on and comment on your ideas.

**Reports** — Spotted an invasive plant species? A broken bench in the park? A more genereic issue like "Too much traffic in XXX street?" or even "XXX street and whole area is abandonded?" You can file a report with a photo and the location, and the city can track its progress.

**Surveys** — City administrators can create surveys to gather opinions. Citizens fill them out, and the results can be analyzed and exported as PDFs.

**NBS Project Registry** — A catalog of Nature-Based Solutions projects (like green roofs, rain gardens, urban forests) happening across the pilot cities. You can browse them on a map or as a list.

**News & Trending** — A feed showing the latest activity: new reports, proposals, and comments.

**Near Me** — Shows what's happening around your current location on a map.

**Calendar** — A calendar view of upcoming community meetings.

**Polls** — Vote on topics the city puts forward.

**Blogs, Debates, Meetings** — Read blog posts, join discussions, and see upcoming meetings — all pulled from the city's democratic platform.

---

## How Is It Built? (The Simple Version)

URBREATH is actually two apps working together:

### 1. The Mobile App
Built with React Native. It has about 22 screens and 20 reusable building blocks (components). It supports 12 languages including English, Spanish, Greek, Italian, Romanian, and more.

### 2. The Backend Server 
A server that stores and manages data like reports, surveys, proposals, user info, and uploaded photos. It uses a database called MongoDB to keep everything organized.

### URBREATH Other Tools & Services Dependencies

The app doesn't do everything on its own. It talks to three external services:

- **E-participation Web Application based on Decidim** — An open-source platform built for citizen participation. URBREATH pulls in democratic processes, proposals, debates, meetings, and blogs from Decidim. Think of Decidim as the "official city hall" side of things.

- **Keycloak** — Handles user login and accounts. It's a single sign-on system, meaning you log in once and get access to everything. It supports three different setups: one for most cities, one specifically for Athens, and one for Parma.

- **NBS Registry API** — An external database of Nature-Based Solutions projects, maintained by a separate organization.

So when you use the app, it's pulling information from all three of these places and showing it to you in one unified experience.

## System Architecture Overview

```
+------------------------------------------------------------------+
|        URBREATH e-participation mobile app PLATFORM              |
+------------------------------------------------------------------+
|                                                                    |
|  +---------------------+        +-----------------------------+   |
|  |   MOBILE APP        |        |   EXTERNAL SERVICES         |   |
|  |   (React Native)    |        |                             |   |
|  |                     |  HTTP  |  Decidim API (GraphQL)      |   |
|  |  22 Screens/Pages   +------->+  decidim-dev.urbreath.tech  |   |
|  |  20 Components      |        |                             |   |
|  |  6 MobX Stores      |  OIDC  |  Keycloak SSO (OAuth2)     |   |
|  |  12 Languages       +------->+  keycloak-dev.urbreath.tech |   |
|  |                     |        |                             |   |
|  |                     |  HTTP  |  NBS Registry API (ATC)     |   |
|  |                     +------->+  nbs.modapto.atc.gr/api/nbs |   |
|  +----------+----------+        +-----------------------------+   |
|             |                                                      |
|             | REST (Axios)                                         |
|             |                                                      |
|  +----------v----------+        +-----------------------------+   |
|  |   CUSTOM BACKEND    |        |   INFRASTRUCTURE            |   |
|  |   (Express.js)      |        |                             |   |
|  |                     |        |  Docker Compose             |   |
|  |  24+ API Endpoints  +------->+  MongoDB 7.0               |   |
|  |  7 Mongoose Models  |        |  Node.js 18                |   |
|  |  Multer (uploads)   |        |  Port 5000 (API)           |   |
|  |                     |        |  Port 27017 (DB)           |   |
|  +---------------------+        +-----------------------------+   |
|                                                                    |
+------------------------------------------------------------------+

---

## The Main Features in Detail

### Reports

Citizens can report things like invasive species, damaged infrastructure, or general environmental concerns.

**How it works:**
1. You tap "Create" on the Reports screen
2. Pick a topic (invasive species, general issue, or other)
3. Write a description
4. Optionally take or upload a photo
5. Your location is detected automatically
6. Submit — and your report shows up for your city

Each report goes through stages: **New → In Progress → Completed**. City admins update the status. Other users can comment on and "like" reports.

---

### Proposals

Similar to reports, but instead of flagging a problem, you're suggesting a solution. The proposal topics are organized into categories:

- **Environment & Greenery** — Tree planting, parks, pocket parks
- **Green Transportation** — Bike stations, carpooling, walking paths
- **Waste Management** — Recycling bins, composting programs
- **Energy Efficiency** — Solar panels, LED street lights
- **Water Conservation** — Rainwater harvesting, public fountains
- **Urban Planning** — Community gardens, bike lanes
- **Digital Infrastructure** — Public Wi-Fi, smart traffic lights
- **Public Safety** — Better street lighting, neighborhood watch

There are actually two kinds of proposals in the app: ones stored locally (in the URBREATH database) and ones that come from Decidim (the city's official participation platform). The app shows both.

---

### Surveys

City administrators can create surveys with multiple-choice questions and optional text answers. Citizens fill them out before a deadline.

**Creating a survey (admins only) has 4 steps:**
1. Add a title, description, and deadline
2. Add questions with answer choices
3. Write terms of service
4. Review and publish

Once citizens submit answers, admins can view analytics and export results as a PDF.

---

### NBS Project Registry

This is a browsable catalog of Nature-Based Solutions — real projects like green roofs, urban wetlands, and community gardens happening across the pilot cities.

You can:
- Search by name, keywords, location, or climate zone
- Switch between a list view and a map view
- Tap into any project for full details including photos, descriptions, challenges, and lessons learned
- Comment on and like projects

The project data comes from an external database, but the comments and likes are stored in the URBREATH system.

---

### News & Notifications

The app shows a feed of the **10 most recent items** (reports, proposals, projects, and comments) for your city. There's also a notification summary that highlights what's been posted in the **last 3 days**.

---

## How Logging In Works

When you first open the app, you pick your city and language. The app then sends you to a login page (powered by Keycloak). You can:

- **Sign up** for a new account
- **Log in** with your existing account
- **Browse as a guest** (limited — you can look but not post or interact)

Once you log in, the app remembers you and automatically refreshes your session so you stay logged in.

There are three types of users:
- **Regular users** — Can create reports, proposals, comment, like, and fill out surveys
- **Admins** — Can also create surveys, update report/proposal statuses, and delete items
- **Guests** — Can browse but can't interact

---

## Multi-City Setup

Each of the 9 cities gets its own filtered view. When you pick your city, the app:

- Shows only reports, surveys, and proposals for that city
- Filters NBS projects by location
- Centers the map on your city
- Connects to the right login system (most cities share one, but Athens and Parma each have their own)

All cities currently share the same Decidim instance behind the scenes — the separation happens within the platform itself, not at the server level.

---

## Language Support

The app supports 12 languages:

English, Spanish, French, German, Italian, Greek, Romanian, Danish, Chinese, Nepali, and Sundanese.

The app detects your phone's language and uses that as the default, falling back to English if your language isn't supported. Content from Decidim (processes, proposals, etc.) is also translated based on your selected language.

---

## Maps & Location

The app uses Google Maps extensively. You'll see maps when:

- Browsing what's near you
- Looking at NBS projects on a map
- Viewing where a report or proposal is located
- Creating a new report (your location is auto-detected)
- Viewing project details

---

## How Everything Connects (The Big Picture)

Here's a simplified view of how all the pieces talk to each other:

```
<img width="594" height="305" alt="image" src="https://github.com/user-attachments/assets/2678c13a-4a55-4d41-ba29-47e506f7014a" />

```
### Entity-Relationship Diagram

```
<img width="544" height="812" alt="image" src="https://github.com/user-attachments/assets/b940a3da-cedb-4c4a-9a16-866fb2bec16d" />


---

## Deployment & Distribution

**The backend server** runs in Docker containers (a way to package software so it runs the same everywhere). It sits on a dedicated server with MongoDB as its database.

**The mobile app** is built using Expo's cloud service and distributed through:
- The Apple App Store (for iPhones)
- The Google Play Store (for Android)
- A development version for testers

The app can also receive over-the-air updates, meaning small fixes can be pushed to users without them needing to download a new version from the store.

---

---

## Screen-by-Screen Summary

| Screen | What It Does |
|--------|-------------|
| **Welcome** | First screen you see — pick your language and get started |
| **Residency** | Pick your city and country |
| **Home** | Main dashboard with category buttons and latest activity |
| **Processes** | Browse official city participation programs |
| **Assemblies** | Browse community governance groups |
| **Proposals** | View and create ideas for city improvements |
| **Reports** | View and file reports about issues or invasive species |
| **Surveys** | Fill out city surveys |
| **New Survey** | (Admins) Create a new survey step by step |
| **Polls** | Vote on city topics |
| **Blogs** | Read blog posts from city programs |
| **Meetings** | See upcoming community meetings |
| **Debates** | Join discussion threads |
| **Calendar** | Calendar view of meetings |
| **News** | Latest activity feed |
| **Near Me** | Map showing content near your location |
| **Projects** | Browse the NBS project catalog |
| **Create New** | Form for creating a report or proposal |
| **Analytics** | (Admins) View survey results and export as PDF |
| **Signup** | Create a new account |

---

## Local Deployment

URBREATH e-participation mobile app is a proprietary digital tool. Upon commercial agreement it can be provided either as a complete service (SaaS) or in a hybrid model where its backend can be deployed locally using Docker. The setup requires configuring environment variables for the backend server, MongoDB, and connections to the external services (Web e-participation App based on Decidim, Keycloak, NBS Registry). For detailed deployment instructions and access to the required configuration, please contact the development team.

---

## Contact

For questions, deployment support, or collaboration inquiries, reach out to the development team:

- **Nektarios Mpoumpalos** — nmpoumpalos@telesto.gr
- **Maria Spanou** — mspanou@telesto.gr

---

*This guide was simplified from the technical documentation of the URBREATH codebase. Some details have been rephrased for accessibility while preserving the essential information.*
