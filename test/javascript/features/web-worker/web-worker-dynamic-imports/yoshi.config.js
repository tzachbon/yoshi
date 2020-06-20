module.exports = {
  projectType: 'app',
  webWorker: {
    entry: {
      worker: './worker',
    },
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
