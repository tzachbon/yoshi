const result = Promise.all([
  import(/* webpackChunkName: "a" */ './a'),
  import(/* webpackChunkName: "b" */ './b'),
]);

result.then(([a, b]) => {
  postMessage(JSON.stringify([a, b]));
});
