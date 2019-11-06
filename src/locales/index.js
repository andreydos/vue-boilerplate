import Vue from "vue";
import VueI18n from "vue-i18n";
import config from "@/config";

import messages from "./dictionary";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts
      .pop()
      .split(";")
      .shift();
  }
  return undefined;
}

const cookieLang = getCookie(`${config.APP_NAME}.lang`);

Vue.use(VueI18n);

Vue.config.lang = cookieLang || config.defaultLanguage;

const i18n = new VueI18n({
  locale: Vue.config.lang,
  fallbackLocale: config.defaultLanguage,
  silentTranslationWarn: false,
  messages
});

Object.defineProperty(Vue.prototype, "$locale", {
  get: () => i18n.locale,
  set: locale => {
    i18n.locale = locale;
  }
});

export default i18n;
