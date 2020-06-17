module.exports = {
  projectType: 'app',
  webWorker: {
    entry: {
      worker: './worker',
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        combined: {
          test: /(a.ts|b.ts)/,
          enforce: true,
          name: 'combined',
        },
      },
    },
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
