import path from 'path';
import resolveFrom from 'resolve-from';
import parentModule from 'parent-module';

// Copied from  https://github.com/sindresorhus/import-fresh
export default (moduleId: any) => {
  if (typeof moduleId !== 'string') {
    throw new TypeError('Expected a string');
  }

  const parentPath = parentModule(__filename);

  const filePath = resolveFrom(path.dirname(parentPath), moduleId);

  const oldModule = __non_webpack_require__.cache[filePath];
  // Delete itself from module parent
  if (oldModule && oldModule.parent) {
    let i = oldModule.parent.children.length;

    while (i--) {
      if (oldModule.parent.children[i].id === filePath) {
        oldModule.parent.children.splice(i, 1);
      }
    }
  }

  // eslint-disable-next-line
  delete __non_webpack_require__.cache[filePath]; // Delete module from cache

  const parent = __non_webpack_require__.cache[parentPath]; // If `filePath` and `parentPath` are the same, cache will already be deleted so we won't get a memory leak in next step

  return parent === undefined
    ? __non_webpack_require__(filePath)
    : parent.require(filePath); // In case cache doesn't have parent, fall back to normal require
};
