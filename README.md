# CognifyCL


**Seamlessly build your public knowledge graph—without compromising on privacy.**

---

## Overview

**CognifyCL** is a privacy-conscious, developer-friendly system for turning browser activity into a structured, queryable archive. It captures visited URLs via a Chrome extension, persists them through a local sync bridge, and surfaces them in a Next.js web interface that supports on-device summarization using `llama.cpp`.

Rather than routing your data through third-party APIs or cloud services, CognifyCL runs everything locally: data collection, storage, visualization, and LLM inference. A fixed category graph provides intuitive structure, while a split-pane layout enables seamless reading and summarization workflows. It's ideal for personal knowledge management, research traceability, or anyone looking to build a local-first toolchain for information curation.

---

## Key Capabilities

* **Local-Only Architecture**: No cloud services. All processing stays on your machine.
* **Automatic Link Capture**: Chrome extension records every page you visit.
* **Fixed Category Graph**: Links are displayed in a predefined graph of topics.
* **Split-View Interface**: Read content and view summaries side by side.
* **On-Demand LLM Summarization**: Summaries are generated using a local TinyLlama model.

---

## System Architecture

* **Chrome Extension**
  Captures visited URLs and sends them to a local sync server.

* **Sync Bridge (Node.js/Express)**
  Accepts and stores entries (`url`, `title`, `summary`, `category`) in `entries.json`.

* **Web Application (Next.js)**
  Displays links in a fixed graph layout with an interactive UI for summaries.

* **Summarization Engine**
  Uses [llama.cpp](https://github.com/ggerganov/llama.cpp) with TinyLlama to run local LLM inference.

---

## Demo Link :



---

## Prerequisites

* [Node.js](https://nodejs.org/)
* A compiled version of [llama.cpp](https://github.com/ggerganov/llama.cpp)
* Chrome browser (for the extension)

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/PranavPipariya/CognifyCL.git
cd CognifyCL
```

---

### 2. Install Dependencies

#### Web Application

```bash
cd webapp
npm install
```

#### Sync Bridge

```bash
cd ../sync-bridge
npm install
```

---

### 3. Configure the Summarization Engine


Inside CognifyCL run: 

```bash
mkdir llama-engine
cd llama-engine
```

```bash
git clone https://github.com/ggerganov/llama.cpp.git
cd llama.cpp
```

once you're in /CognifyCL/llama-engine/llama.cpp, then run:
```bash
mkdir build
cd build
cmake .. -DLLAMA_METAL=ON
cmake --build . --config Release
```

then again go to llama.cpp directory i.e   /CognifyCL/llama-engine/llama.cpp by doing:
```bash
cd ..
```

 then inside llama.cpp run:
```bash
mkdir -p models/gemma
cd models/gemma
```

place the model you downloaded in gemma. do not forget to rename it as tinyllama-chat.gguf !

thats it now your summarisation feature will work.


* Download the TinyLlama model:

  [TinyLlama 1.1B Q2\_K (GGUF) — Hugging Face](https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF/blob/main/tinyllama-1.1b-chat-v1.0.Q2_K.gguf)

* Move the downloaded file to:

  ```
  llama-engine/llama.cpp/models/gemma/tinyllama-chat.gguf
  ```

---

### 4. Start the Services

#### Sync Bridge

```bash
cd sync-bridge
npm run start
```

Runs at: `http://localhost:3001`

#### Web Application

```bash
cd ../webapp
npm run dev
```

Runs at: `http://localhost:3000`

---

### 5. Load the Chrome Extension

1. Open `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select the `extension/` directory

---

## Usage

1. As you browse, the extension captures each link.
2. Visit `http://localhost:3000/dashboard` to explore your history.
3. The dashboard presents a fixed category graph layout.
4. Click a category to view links under it.
5. Click a link to open a split view:

   * **Right**: the full web page
   * **Left**: a panel of category cards
6. Click a card to trigger a local LLM summary via TinyLlama.

---

## Common Issues

* **LLM not responding**:

  * Verify the model is named `tinyllama-chat.gguf` and located in:
    `llama-engine/llama.cpp/models/gemma/tinyllama-chat.gguf`

---

## Acknowledgements

* [llama.cpp](https://github.com/ggerganov/llama.cpp) — lightweight, high-performance local inference engine
* [Next.js](https://nextjs.org) — full-stack React framework for the frontend
* [TheBloke](https://huggingface.co/TheBloke) — provider of quantized TinyLlama GGUF models

---
