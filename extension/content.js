function isArticle() {
  return document.querySelector('article') || document.body.innerText.length > 2000;
}

function getPageText() {
  return document.title + "\n" + document.body.innerText;
}

function sendContent() {
  const payload = {
    url: location.href,
    title: document.title,
    content: getPageText()
  };
  chrome.runtime.sendMessage({ type: "NEW_CONTENT", payload });
}

window.addEventListener('load', () => {
  if (isArticle()) {
    sendContent();
  }
});
