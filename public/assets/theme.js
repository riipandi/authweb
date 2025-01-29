// Check system preference and localStorage
function syncThemeWithIframe(theme) {
  // Get all Umami iframes
  const iframes = document.querySelectorAll('iframe[umami-embed]');
  for (const iframe of iframes) {
    const currentSrc = new URL(iframe.src);
    currentSrc.searchParams.set('theme', theme);
    iframe.src = currentSrc.toString();
  }
}

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
  syncThemeWithIframe('dark')
} else {
  document.documentElement.classList.remove('dark')
  syncThemeWithIframe('light')
}

const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const themeToggleBtn = document.getElementById('theme-toggle');

// Change the icons inside the button based on previous settings
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  themeToggleLightIcon.classList.remove('hidden');
} else {
  themeToggleDarkIcon.classList.remove('hidden');
}

themeToggleBtn.addEventListener('click', function() {
  // Toggle icons
  themeToggleDarkIcon.classList.toggle('hidden');
  themeToggleLightIcon.classList.toggle('hidden');

  // If is set in localStorage
  if (localStorage.theme === 'dark') {
    localStorage.theme = 'light'
    document.documentElement.classList.remove('dark')
    syncThemeWithIframe('light')
  } else {
    localStorage.theme = 'dark'
    document.documentElement.classList.add('dark')
    syncThemeWithIframe('dark')
  }
});
