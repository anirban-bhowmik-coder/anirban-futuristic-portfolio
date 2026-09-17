# Anirban Bhowmik — Futuristic 3D Portfolio

A single repository combining three layers:

### 1. UI UX Pro Max
Design intelligence for the visual system. Install its current Claude skill with:
```powershell
npm install -g uipro-cli
uipro init --ai claude
```

### 2. 21st.dev
Use 21st.dev as a component source. Copy selected components into:
`src/components/ui/`
Then customize them to the Anirban design system. It is not a required runtime dependency.

### 3. Motion
The project uses the current `motion` package:
```ts
import { motion } from "motion/react";
```

### 4. Three.js
React Three Fiber + Drei power the kinetic 3D mesh.

## Run

```powershell
npm install
npm run dev
```

Then open the Vite URL, normally `http://localhost:5173/`.

## Build

```powershell
npm run build
```

## Claude Code

Open this repository in VS Code and let Claude inspect:
- `.claude/CLAUDE.md`
- `design-system.md`
- `src/`
- `package.json`

Then give Claude the portfolio master prompt.

## Important

Do not add KIRO as a separate project. The current project name is KineticMesh.
Do not invent certification details or project features.
