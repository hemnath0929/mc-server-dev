# ⚔️ Devil Studio · Minecraft Server Engineering Studio

A Minecraft-native custom software engineering studio website built with **React 18 + TypeScript + Vite + TailwindCSS**.

---

## 🚀 Live Features
- **Authentic Minecraft Aesthetics**: Procedural floating 3D Minecraft Blocks (Grass, Obsidian, TNT, Diamond/Emerald ores), iconic Items (Diamond Sword, Ender Pearl, Golden Apple, Enchanted Book), and Mob Heads (Creeper, Enderman, Steve, Skeleton, Zombie) with glowing shadows and interactive torchlight.
- **Live Simulated Telemetry HUD**: 20.00 TPS real-time monitor and simulated Gradle build stream.
- **7-Step Quest Intake System**: Collects custom plugin specifications, player counts, budget tiers, and client details with zero captcha friction.
- **Anytime Free Bug Warranty**: Lifetime stability commitment.
- **Standalone Developer Admin Command Center**: Independent private portal in `/admin-app` with PIN protection (`devil2026`).

---

## 🛠️ Local Development

### 1. Run Public Client Website (Port 5173):
```bash
npm install
npm run dev
```

### 2. Run Standalone Admin Portal (Port 5174):
```bash
cd admin-app
npm install
npm run dev
```

---

## ☁️ Deployment on Vercel

1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import `hemnath0929/mc-server-dev`.
4. Leave framework preset as **Vite** (Build Command: `npm run build`, Output Directory: `dist`).
5. Click **Deploy**!
