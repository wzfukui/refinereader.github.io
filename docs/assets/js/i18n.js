const i18n = {
  init() {
    this.bindLanguageSwitch();
    this.loadPreferredLanguage();
  },

  bindLanguageSwitch() {
    const switches = document.querySelectorAll('.language-switch button');
    switches.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        this.switchLanguage(lang);
      });
    });
  },

  loadPreferredLanguage() {
    const lang = localStorage.getItem('preferred_language');
    if (lang) {
      this.switchLanguage(lang, false);
    }
  },

  switchLanguage(lang, redirect = true) {
    localStorage.setItem('preferred_language', lang);
    if (redirect) {
      const currentPath = window.location.pathname;
      if (currentPath.includes('privacy')) {
        window.location.href = currentPath.includes('privacy-en.html') 
          ? './privacy.html' 
          : './privacy-en.html';
        return;
      }
      const newPath = currentPath.replace(/\/(zh|en)\//, `/${lang}/`);
      window.location.href = newPath;
    }
  }
};

document.addEventListener('DOMContentLoaded', () => i18n.init()); 