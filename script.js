/* === JS Block 1 === */
const themeToggle = document.getElementById('themeToggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const themeStorage = {
  get() {
    try { return localStorage.getItem('contactsGuideTheme'); }
    catch { return null; }
  },
  set(value) {
    try { localStorage.setItem('contactsGuideTheme', value); }
    catch {}
  }
};

function setTheme(theme) {
  const isLight = theme === 'light';
  document.body.dataset.theme = isLight ? 'light' : 'dark';
  themeToggle.setAttribute('aria-pressed', String(isLight));
  themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  themeToggle.querySelector('.theme-toggle-icon').textContent = isLight ? '☀️' : '🌙';
  themeToggle.querySelector('.theme-toggle-text').textContent = isLight ? 'Light' : 'Dark';
  if (themeMeta) themeMeta.setAttribute('content', isLight ? '#f6f8fa' : '#0d1117');
}

setTheme(themeStorage.get() || 'dark');

themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
  themeStorage.set(nextTheme);
  setTheme(nextTheme);
});

function copyCode(btn, id) {
  const el = document.getElementById(id);
  const text = el.innerText;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✅ Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = '📋 Copy';
      btn.classList.remove('copied');
    }, 2000);
  });
}

function toggleCode(blockId, btn) {
  const block = document.getElementById(blockId);
  const isCollapsed = block.classList.contains('code-collapsed');
  if (isCollapsed) {
    block.classList.remove('code-collapsed');
    btn.textContent = '🔼 Show Less';
  } else {
    block.classList.add('code-collapsed');
    btn.textContent = '👁️ Show More';
  }
}