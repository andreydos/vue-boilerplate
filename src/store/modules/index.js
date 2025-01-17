// Register each file as a corresponding Vuex module. Module nesting
// will mirror [sub-]directory hierarchy and modules are namespaced
// as the camelCase equivalent of their file name.

import camelCase from 'lodash/camelCase';

// https://webpack.js.org/guides/dependency-management/#require-context
const requireModule = require.context(
  // Search for files in the current directory
  '.',
  // Search for files in subdirectories
  true,
  // Include any .js files that are not unit tests
  /^((?!\.unit\.).)*\.js$/,
);
const root = { modules: {} };

// Recursively get the namespace of the module, even if nested
// @ts-ignore
function getNamespace(subtree, path) {
  if (path.length === 1) { return subtree; }

  const namespace = path.shift();
  subtree.modules[namespace] = { modules: {}, ...subtree.modules[namespace] }; // eslint-disable-line
  return getNamespace(subtree.modules[namespace], path);
}

requireModule.keys().forEach((fileName) => {
  // Skip this file, as it's not a module
  if (fileName === './index.js') { return; }

  // Get the module path as an array
  const modulePath = fileName
    // Remove the "./" from the beginning
    .replace(/^\.\//, '')
    // Remove the file extension from the end
    .replace(/\.\w+$/, '')
    // Split nested modules into an array path
    .split(/\//)
    // camelCase all module namespaces and names
    .map(camelCase);

  // Get the modules object for the current path
  const { modules } = getNamespace(root, modulePath);

  // Add the module to our modules object
  // @ts-ignore
  modules[modulePath.pop()] = {
    // Modules are namespaced by default
    namespaced: true,
    ...requireModule(fileName),
  };
});

export default root.modules;
