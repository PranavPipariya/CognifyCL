# Sync Bridge

This is a tiny local HTTP server that syncs your Chrome Extension data to your Webapp automatically.

## Quick Start

1️⃣ Install dependencies:

```bash
npm install
```

2️⃣ Run the server:

```bash
npm start
```

The server will run at `http://localhost:3001` and store data in `entries.json`.

Your Chrome Extension will POST entries here.
Your Webapp will GET entries from here.
