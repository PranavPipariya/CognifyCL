async function summarise(text) {
  return text.split(/\s+/).slice(0, 60).join(" ") + "...";
}

async function syncToBridge(entry) {
  try {
    await fetch('http://localhost:3001/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    });
  } catch (err) {
    console.error('Sync Bridge not running:', err);
  }
}

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.type === "NEW_CONTENT") {
    const summary = await summarise(msg.payload.content);
    const entry = {
      url: msg.payload.url,
      title: msg.payload.title,
      summary,
      timestamp: Date.now()
    };
    chrome.storage.local.get({ entries: [] }, (data) => {
      const updated = [entry, ...data.entries];
      chrome.storage.local.set({ entries: updated.slice(0, 1000) });
    });
    await syncToBridge(entry);
  }
  return true;
});
