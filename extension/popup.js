async function render() {
  const listEl = document.getElementById('list');
  chrome.storage.local.get({ entries: [] }, (data) => {
    const entries = data.entries;
    if (!entries.length) {
      listEl.innerHTML = '<p class="text-sm text-gray-500">No entries yet. Browse something!</p>';
      return;
    }
    listEl.innerHTML = entries.map(e => `
      <a href="${e.url}" target="_blank" class="block border p-3 rounded-lg hover:bg-gray-50 transition">
        <div class="font-semibold">${e.title}</div>
        <div class="text-xs text-gray-500">${new Date(e.timestamp).toLocaleString()}</div>
        <p class="text-sm mt-1">${e.summary}</p>
      </a>
    `).join('');
  });
}
document.addEventListener('DOMContentLoaded', render);
