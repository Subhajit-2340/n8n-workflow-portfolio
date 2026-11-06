# n8n Portfolio & Automation Showcase

A self-contained, offline-ready portfolio with an interactive n8n workflow management system and dedicated file database storage.

---

## 📁 Project Structure

```text
n8n/
├── automations.json        # Database file storing all automation posts & canvas graphs
├── index.html              # Public visitor page (portfolio & read-only automation posts)
├── n8n-node-library.js     # Dedicated Node Library module (icons, nodes, geometry helpers)
├── n8n-node-library.html   # (Optional) Standalone n8n Node Library explorer sandbox
├── admin.html              # (Optional / Authoring only) Workflow builder & post management
├── serve.py                # (Optional / Dev only) Python HTTP server & REST database sync
├── launch.command          # (Optional / Dev only) Double-clickable macOS launcher script
└── README.md               # Documentation & guide
```

---

## 📦 Deployment & Transfer Modes

### 1. Public / Production Transfer (admin.html omitted)
When transferring or publishing to GitHub Pages, Vercel, Netlify, or any static host, you only need to transfer:
* `index.html`
* `automations.json`
* `n8n-node-library.js`
* *(Optional)* `n8n-node-library.html`

> [!NOTE]
> `admin.html` is completely optional. If omitted during transfer, the public site and workflow showcase continue running smoothly in secure read-only mode with zero 404 errors or broken buttons.

### 2. Full Local Development (Authoring Mode)
Keep `admin.html` and `serve.py` locally on your machine to visually design, edit, and publish new n8n automation posts directly into `automations.json`.

---

## 💾 Database Architecture

Automations are saved in [`automations.json`](file:///Users/nightwraith/Documents/Websites/portfolio/n8n/automations.json). Each automation keeps **post details** and **canvas details** connected under the same record but structurally separated:

```json
{
  "id": "auto_1729676800000",
  "name": "Demo Workflow",
  "description": "Demonstration of automated lead processing.",
  "createdAt": "2026-10-23T09:20:00.000Z",
  "updatedAt": "2026-10-23T09:25:00.000Z",
  "canvas": {
    "nodes": [
      { "id": 0, "defIdx": 0, "name": "Webhook", "x": 180, "y": 60 },
      { "id": 1, "defIdx": 17, "name": "Gmail", "x": 180, "y": 200 }
    ],
    "edges": [
      { "from": 0, "to": 1, "fromPort": 0 }
    ]
  }
}
```

* **Backend Sync (`serve.py`):** Provides a `/api/automations` endpoint (`GET` / `POST`) to read and write changes directly to `automations.json` on disk.
* **Offline / Browser Fallback:** `admin.html` and `index.html` cache the database in `localStorage` so everything continues working seamlessly even if opened without a web server.
* **Export / Import:** The Admin Dashboard features **Export Database (JSON)** and **Import Database** buttons for one-click backups or sharing.

---

## 🚀 How to Run

### Method 1: Double-Click Launcher (macOS)
Double-click [`launch.command`](file:///Users/nightwraith/Documents/Websites/portfolio/n8n/launch.command).

### Method 2: Command Line
```bash
python3 serve.py
```

URLs:
* **Public Showcase:** [http://localhost:8000/index.html](http://localhost:8000/index.html)
* **Admin Dashboard:** [http://localhost:8000/admin.html](http://localhost:8000/admin.html)
* **Node Library (Standalone):** [http://localhost:8000/n8n-node-library.html](http://localhost:8000/n8n-node-library.html)
