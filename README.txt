<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:202224,100:FFB454&height=220&section=header&text=Ridgeline%20Rally&fontSize=52&fontColor=ffffff&desc=2D%20Hill%20Climb%20Racing&descAlignY=70" alt="Ridgeline Rally banner"/>

# Ridgeline Rally

### Browser-Based 2D Hill Climb Racing Game

![PixiJS](https://img.shields.io/badge/PixiJS-v8-E91E63?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Release](https://img.shields.io/github/v/release/9harshithp/ridgeline-rally?include_prereleases&style=for-the-badge)

</div>

---
## Application Showcase

<div align="center">

![Ridgeline Rally Gameplay](./ridgeline-homepage.png)

*Pixel-art racing, challenging terrain and real-time vehicle simulation.*

</div>

---

## Project Overview

Ridgeline Rally is a browser-based 2D hill-climb racing game
featuring retro pixel-art environments, interactive vehicle
controls, resource management and distance-based progression.

The project explores game engineering concepts including
real-time graphics rendering, vehicle simulation, procedural
artwork generation and gameplay state management.

---

## Game Features

| Feature | Description |
|---|---|
| Hill Climb Racing | Drive through challenging terrain |
| Vehicle Controls | Interactive gas and brake controls |
| Fuel Management | Monitor remaining fuel during gameplay |
| Coin Collection | Collect rewards along racing tracks |
| Garage | Explore and select vehicles |
| Track Selection | Choose different racing environments |
| Personal Best | Track distance records |
| Gameplay HUD | Real-time fuel, distance and coin information |
| Pixel Art | Generated retro-style game artwork |
| Pause and Restart | Control the active racing session |

---

## Technology Stack

<div align="center">

<img src="https://skillicons.dev/icons?i=js,html,css,git,github&theme=dark" alt="Technology stack"/>

</div>

| Layer | Technology |
|---|---|
| Graphics Rendering | PixiJS |
| Game Logic | JavaScript |
| User Interface | HTML5, CSS3 |
| Artwork | JavaScript-generated pixel art |
| Local Development | Python HTTP server or browser |
| Version Control | Git and GitHub |

---

## Game Architecture

```mermaid
flowchart TB
    U["Player"] --> I["Input Handling"]
    I --> G["Game Logic - game.js"]

    G --> P["Vehicle Simulation"]
    G --> T["Terrain Management"]
    G --> S["Game State"]

    P --> R["PixiJS Renderer"]
    T --> R
    S --> H["Gameplay HUD"]

    A["Artwork Generator - art.js"] --> R
    R --> C["Game Canvas"]
```

### Game Loop

```mermaid
flowchart TD
    A["Start Frame"] --> B["Read Player Input"]
    B --> C["Update Vehicle Movement"]
    C --> D["Evaluate Terrain Interaction"]
    D --> E["Update Fuel, Coins and Distance"]
    E --> F["Render Game Scene"]
    F --> G{"Race Finished?"}
    G -->|No| A
    G -->|Yes| H["Display Race Result"]
```

### Game State Transitions

```mermaid
stateDiagram-v2
    [*] --> TrackSelection
    TrackSelection --> Racing
    TrackSelection --> Garage
    Garage --> TrackSelection
    Racing --> Paused
    Paused --> Racing
    Racing --> RaceEnded
    RaceEnded --> Racing: Restart
    RaceEnded --> TrackSelection
```

These diagrams illustrate the game's high-level implementation.

---

## Engineering Highlights

| Engineering Area | Implementation |
|---|---|
| Real-time Rendering | PixiJS graphics |
| Vehicle Simulation | Acceleration, braking and movement |
| Game Loop | Continuous gameplay updates |
| Terrain Interaction | Hill-based racing mechanics |
| Resource Management | Fuel and coin tracking |
| State Management | Racing, pause and restart states |
| Artwork Generation | Pixel-art generation through JavaScript |
| Modular Design | Separate gameplay and artwork logic |
| Player Feedback | Real-time gameplay HUD |

---

## Core Project Files

| File | Responsibility |
|---|---|
| `index.html` | Game entry point |
| `game.js` | Simulation, controls and garage |
| `art.js` | Pixel artwork generation |

The project includes bundled artwork, fonts and PixiJS dependencies.

---

## Game Controls

| Input | Action |
|---|---|
| Right Arrow | Accelerate |
| Left Arrow | Brake |
| P | Pause |
| R | Restart |

On-screen gas and brake controls are also available.

---

## Run Locally

### Option 1 — Direct Browser Launch

Clone the repository:

```bash
git clone https://github.com/9harshithp/ridgeline-rally.git
cd ridgeline-rally
```

Open `index.html` in your browser.

### Option 2 — Local Web Server

From the repository directory, run:

```bash
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000
```

Artwork, fonts and PixiJS are bundled with the project.

---

## Development Roadmap

- [x] Core racing mechanics
- [x] Vehicle controls
- [x] Terrain-based gameplay
- [x] Fuel management
- [x] Coin collection
- [x] Track selection
- [x] Garage interface
- [x] Personal best tracking
- [x] Pixel-art graphics
- [x] Initial GitHub pre-release
- [ ] Automated regression testing
- [ ] GitHub Actions CI
- [ ] Public game deployment
- [ ] Additional tracks and vehicles

---

## Release Status

The project is currently in its initial development preview.

[View GitHub Releases](https://github.com/9harshithp/ridgeline-rally/releases)

---

## Contributing

Suggestions, bug reports and improvements are welcome through
GitHub issues and pull requests.

---

<div align="center">

## Developer

### Harshith P

Backend Engineer | Full Stack Developer | Game Development

[![GitHub](https://img.shields.io/badge/GitHub-9harshithp-181717?style=for-the-badge&logo=github)](https://github.com/9harshithp)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Harshith_P-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/harshithp914)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit_Website-B58A36?style=for-the-badge)](https://portfolio-bay-three-10.vercel.app/)
[![Email](https://img.shields.io/badge/Email-Contact_Me-EA4335?style=for-the-badge&logo=gmail)](mailto:harshithp914@gmail.com)

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:202224,100:FFB454&height=120&section=footer" alt="Ridgeline Rally footer"/>

</div>
