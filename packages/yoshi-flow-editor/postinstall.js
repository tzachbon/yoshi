try {
  const generateBITypes = require('./build/scripts/generate-bi-types');
  generateBITypes();
} catch (e) {
  console.warn(e);
}
