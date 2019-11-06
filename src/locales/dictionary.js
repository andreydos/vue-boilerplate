import pages from "./lang/components/pages";
import common from "./lang/components/common";

const locales = {
  pages,
  common
};
const dictionary = {};

Object.keys(locales).forEach(prop => {
  Object.keys(locales[prop]).forEach(lang => {
    if (!dictionary[lang]) dictionary[lang] = {};

    dictionary[lang][prop] = locales[prop][lang];
  });
});

export default dictionary;
